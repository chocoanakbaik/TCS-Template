import business from './categories/bisnis.json';
import operations from './categories/operasional.json';
import productivity from './categories/produktivitas.json';
import education from './categories/pendidikan.json';
import people from './categories/sdm.json';
import projects from './categories/proyek.json';
import content from './categories/konten.json';
import documents from './categories/dokumen.json';
import developer from './categories/developer.json';
import type { TemplateDefinition } from './schema';

export const templates: TemplateDefinition[] = [
  ...business, ...operations, ...productivity, ...education, ...people,
  ...projects, ...content, ...documents, ...developer,
] as TemplateDefinition[];

export type { CategoryId, Difficulty, TemplateAnswers, TemplateDefinition, TemplateFormat, TemplateQuestion } from './schema';
