'use client';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import type { TemplateAnswers, TemplateDefinition, TemplateSheet } from '@/data/schema';

const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function cleanField(value: string | undefined, fallback = 'Belum diisi'): string {
  const normalized = (value ?? '').replace(/\r/g, '').trim();
  return normalized || fallback;
}

function fileSegment(value: string): string {
  const normalized = value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
  return normalized || 'tanpa-nama';
}

function tokenContext(answers: TemplateAnswers): Record<string,string> {
  return {
    entityName: cleanField(answers.entityName, 'Tanpa Nama'),
    ownerName: cleanField(answers.ownerName),
    period: cleanField(answers.period),
    scope: cleanField(answers.scope),
    notes: cleanField(answers.notes),
  };
}

function replaceTokens(value: string, context: Record<string,string>): string {
  return value.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_match, key: string) => context[key] ?? '');
}

function safeSheetName(name: string): string {
  return name.replace(/[\\/?*:[\]]/g, ' ').trim().slice(0,31) || 'Template';
}

function createWorksheet(sheet: TemplateSheet, context: Record<string,string>): XLSX.WorkSheet {
  const columnCount=sheet.columns.length;
  if(!columnCount) throw new Error('Setiap sheet harus memiliki setidaknya satu kolom.');

  const metadata='Instansi/Proyek: '+context.entityName+' | Penanggung jawab: '+context.ownerName;
  const periodLine='Periode: '+context.period+' | Ruang lingkup: '+context.scope;
  const rows:Array<Array<string|number|null>>=[
    [replaceTokens(sheet.title,context)],
    [metadata],
    [periodLine],
    [],
    sheet.columns.map((column)=>replaceTokens(column,context)),
    ...sheet.rows.map((row)=>row.map((cell)=>typeof cell==='string'?replaceTokens(cell,context):cell)),
  ];

  const worksheet=XLSX.utils.aoa_to_sheet(rows);
  const finalColumn=XLSX.utils.encode_col(columnCount-1);
  const finalRow=rows.length;
  worksheet['!merges']=[
    {s:{r:0,c:0},e:{r:0,c:columnCount-1}},
    {s:{r:1,c:0},e:{r:1,c:columnCount-1}},
    {s:{r:2,c:0},e:{r:2,c:columnCount-1}},
  ];
  worksheet['!autofilter']={ref:'A5:'+finalColumn+finalRow};
  if(sheet.columnWidths?.length) worksheet['!cols']=sheet.columnWidths.map((wch)=>({wch}));

  for(const formula of sheet.formulaCells ?? []) {
    if(!/^[A-Z]{1,3}[1-9][0-9]*$/.test(formula.cell)) throw new Error('Referensi formula tidak valid: '+formula.cell);
    const existing=worksheet[formula.cell] ?? {};
    worksheet[formula.cell]={...existing,t:'n',f:formula.formula.replace(/^=/,''),v:formula.cachedValue ?? 0};
  }
  return worksheet;
}

function createSpreadsheet(template:TemplateDefinition,context:Record<string,string>):string {
  if(!template.sheets?.length) throw new Error('Struktur spreadsheet belum tersedia.');
  const workbook=XLSX.utils.book_new();
  for(const sheet of template.sheets) XLSX.utils.book_append_sheet(workbook,createWorksheet(sheet,context),safeSheetName(sheet.name));
  workbook.Props={
    Title:template.name+' - '+context.entityName,
    Subject:'Template yang disesuaikan melalui TCS Template',
    Author:'The Choco Studios',
    Company:'The Choco Studios',
    Comments:'Dibuat langsung di browser. Tidak dikirim ke server.',
  };
  (workbook as unknown as {Workbook:Record<string,unknown>}).Workbook={
    CalcPr:{calcMode:'auto',fullCalcOnLoad:true,forceFullCalc:true},
  };
  const bytes=XLSX.write(workbook,{bookType:'xlsx',type:'array',compression:true}) as ArrayBuffer;
  const blob=new Blob([bytes],{type:XLSX_MIME});
  const filename='TCS-'+fileSegment(template.id)+'-'+fileSegment(context.entityName)+'.xlsx';
  saveAs(blob,filename);
  return filename;
}

function createDocument(template:TemplateDefinition,context:Record<string,string>):string {
  if(!template.sections?.length) throw new Error('Struktur dokumen belum tersedia.');
  const lines=[
    '# '+template.name,'',
    '> **Instansi/Proyek:** '+context.entityName,
    '> **Penanggung jawab:** '+context.ownerName,
    '> **Periode:** '+context.period,
    '> **Ruang lingkup:** '+context.scope,'',
    'Dibuat menggunakan TCS Template — The Choco Studios.','',
  ];
  for(const section of template.sections) {
    lines.push('## '+replaceTokens(section.heading,context),'');
    if(section.body) lines.push(replaceTokens(section.body,context),'');
    for(const bullet of section.bullets ?? []) lines.push('- '+replaceTokens(bullet,context));
    if(section.bullets?.length) lines.push('');
  }
  lines.push('---','','Catatan tambahan:','',context.notes,'');
  return lines.join('\n');
}

export function generateTemplateFile(template:TemplateDefinition,answers:TemplateAnswers):string {
  if(typeof window==='undefined') throw new Error('Generator hanya dapat dijalankan dari browser.');
  if(template.questions.length!==5) throw new Error('Template harus memiliki tepat lima pertanyaan penyesuaian.');
  const context=tokenContext(answers);
  if(!answers.entityName?.trim()) throw new Error('Nama instansi atau proyek wajib diisi.');
  if(template.format==='xlsx') return createSpreadsheet(template,context);
  const document=createDocument(template,context);
  const extension=template.format==='txt'?'txt':'md';
  const mime=extension==='txt'?'text/plain;charset=utf-8':'text/markdown;charset=utf-8';
  const blob=new Blob([document],{type:mime});
  const filename='TCS-'+fileSegment(template.id)+'-'+fileSegment(context.entityName)+'.'+extension;
  saveAs(blob,filename,{autoBom:true});
  return filename;
}
