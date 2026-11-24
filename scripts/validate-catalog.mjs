#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const categoryDir = path.join(root, 'src', 'data', 'categories');
const expectedCategories = ['bisnis', 'operasional', 'produktivitas', 'pendidikan', 'sdm', 'proyek', 'konten', 'dokumen', 'developer'];
const allowedFormats = new Set(['xlsx', 'md', 'txt']);
const allowedQualities = new Set(['standar', 'baik', 'unggulan']);
const ids = new Set();
const failures = [];
let templateCount = 0;

function fail(location, message) {
  failures.push(location + ': ' + message);
}

function decodeCell(address) {
  const match = /^([A-Z]{1,3})([1-9][0-9]*)$/.exec(address || '');
  if (!match) return null;
  let column = 0;
  for (const char of match[1]) column = column * 26 + char.charCodeAt(0) - 64;
  return { row: Number(match[2]), column: column - 1 };
}

for (const category of expectedCategories) {
  const file = path.join(categoryDir, category + '.json');
  if (!fs.existsSync(file)) {
    fail(category, 'berkas kategori tidak ditemukan');
    continue;
  }

  let templates;
  try {
    templates = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(category, 'JSON tidak valid: ' + error.message);
    continue;
  }

  if (!Array.isArray(templates)) {
    fail(category, 'isi kategori harus berupa array');
    continue;
  }

  for (const template of templates) {
    templateCount += 1;
    const location = category + '/' + (template?.id || 'unknown');

    if (!template || typeof template !== 'object') {
      fail(location, 'record harus berupa object');
      continue;
    }
    if (typeof template.id !== 'string' || !template.id.trim()) fail(location, 'id wajib diisi');
    else if (ids.has(template.id)) fail(location, 'id duplikat: ' + template.id);
    else ids.add(template.id);

    if (template.category !== category) fail(location, 'category tidak sesuai nama berkas');
    if (typeof template.name !== 'string' || !template.name.trim()) fail(location, 'name wajib diisi');
    if (typeof template.description !== 'string' || !template.description.trim()) fail(location, 'description wajib diisi');
    if (!allowedFormats.has(template.format)) fail(location, 'format tidak didukung');
    if (!allowedQualities.has(template.quality)) fail(location, 'quality tidak valid');
    if (!Array.isArray(template.questions) || template.questions.length !== 5) {
      fail(location, 'setiap template wajib memiliki tepat lima pertanyaan');
    } else {
      const questionIds = new Set();
      for (const question of template.questions) {
        if (!question.id || questionIds.has(question.id)) fail(location, 'ID pertanyaan kosong atau duplikat');
        questionIds.add(question.id);
        if (typeof question.label !== 'string' || !question.label.trim()) fail(location, 'label pertanyaan wajib diisi');
        if (!['text', 'textarea', 'select'].includes(question.type)) fail(location, 'tipe pertanyaan tidak valid: ' + question.type);
        if (typeof question.required !== 'boolean') fail(location, 'required pertanyaan harus boolean');
        if (question.type === 'select' && (!Array.isArray(question.options) || !question.options.length)) {
          fail(location, 'pertanyaan select wajib memiliki options');
        }
      }
    }

    if (template.format === 'xlsx') {
      if (!Array.isArray(template.sheets) || !template.sheets.length) {
        fail(location, 'format xlsx wajib memiliki sheets');
        continue;
      }
      const sheetNames = new Set();
      for (const sheet of template.sheets) {
        const sheetLocation = location + '/' + (sheet.name || 'sheet');
        const safeName = String(sheet.name || '').replace(/[\\/?*:[\]]/g, ' ').trim().slice(0, 31) || 'Template';
        if (sheetNames.has(safeName)) fail(sheetLocation, 'nama sheet duplikat setelah sanitasi');
        sheetNames.add(safeName);
        if (!Array.isArray(sheet.columns) || !sheet.columns.length) fail(sheetLocation, 'kolom wajib tersedia');
        for (const row of sheet.rows || []) {
          if (!Array.isArray(row) || row.length !== sheet.columns.length) fail(sheetLocation, 'lebar baris harus sama dengan jumlah kolom');
        }
        for (const formula of sheet.formulaCells || []) {
          const cell = decodeCell(formula.cell);
          if (!cell || cell.column >= sheet.columns.length) fail(sheetLocation, 'alamat formula tidak valid: ' + formula.cell);
          if (typeof formula.formula !== 'string' || !formula.formula.trim()) fail(sheetLocation, 'formula kosong: ' + formula.cell);
          if (formula.cachedValue !== undefined && typeof formula.cachedValue !== 'number') fail(sheetLocation, 'cachedValue harus numerik: ' + formula.cell);
          const dataEndRow = 5 + (sheet.rows || []).length;
          if (cell && cell.row > dataEndRow && (!formula.labelCell || !formula.label?.trim())) {
            fail(sheetLocation, 'formula ringkasan di luar data wajib memiliki label: ' + formula.cell);
          }
          if (formula.labelCell) {
            const labelCell = decodeCell(formula.labelCell);
            if (!labelCell || labelCell.column >= sheet.columns.length) fail(sheetLocation, 'alamat label tidak valid: ' + formula.labelCell);
            if (cell && labelCell && (labelCell.row !== cell.row || labelCell.column >= cell.column)) {
              fail(sheetLocation, 'label harus berada di kiri formula pada baris yang sama: ' + formula.labelCell);
            }
          }
        }
      }
    } else if (!Array.isArray(template.sections) || !template.sections.length) {
      fail(location, 'format dokumen wajib memiliki sections');
    }
  }
}

if (templateCount === 0) fail('catalog', 'tidak ada template yang ditemukan');

if (failures.length) {
  console.error('Validasi katalog gagal (' + failures.length + ' masalah):');
  for (const failure of failures) console.error('- ' + failure);
  process.exitCode = 1;
} else {
  console.log('Validasi berhasil: ' + templateCount + ' template pada ' + expectedCategories.length + ' kategori.');
}
