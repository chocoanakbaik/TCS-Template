export type CategoryId = 'bisnis' | 'operasional' | 'produktivitas' | 'pendidikan' | 'sdm' | 'proyek' | 'konten' | 'dokumen' | 'developer';
export type Quality = 'standar' | 'baik' | 'unggulan';
export type TemplateFormat = 'xlsx' | 'md' | 'txt';
export interface TemplateQuestion { id:string; label:string; type:'text'|'textarea'|'select'; required:boolean; placeholder?:string; options?:string[]; hint?:string; }
export interface FormulaCell { cell:string; formula:string; cachedValue?:number; }
export interface TemplateSheet { name:string; title:string; columns:string[]; rows:Array<Array<string|number|null>>; formulaCells?:FormulaCell[]; columnWidths?:number[]; }
export interface TemplateSection { heading:string; body?:string; bullets?:string[]; }
export interface TemplateDefinition {
  id:string; name:string; category:CategoryId; categoryLabel:string; symbol:string;
  format:TemplateFormat; quality:Quality; description:string; tags:string[];
  questions:TemplateQuestion[]; sheets?:TemplateSheet[]; sections?:TemplateSection[];
}
export type TemplateAnswers = Record<string,string>;
