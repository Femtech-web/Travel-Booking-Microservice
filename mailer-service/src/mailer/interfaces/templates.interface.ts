import { TemplateDelegate } from 'handlebars';
import { ITemplatedData } from './template-data.interface';

export interface ITemplates {
  confirmation: TemplateDelegate<ITemplatedData>;
  resetPassword: TemplateDelegate<ITemplatedData>;
}
