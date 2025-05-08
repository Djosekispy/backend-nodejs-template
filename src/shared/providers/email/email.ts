import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

class EmailTemplateShared {
  static async compileTemplate(templateName: string, data: any) {
    try {
      const templatePath = path.join(process.cwd(),'templates', `${templateName}.hbs`);
      
      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template não encontrado: ${templatePath}`);
      }

      const source = fs.readFileSync(templatePath, 'utf-8');
      const template = handlebars.compile(source);
      return template(data);
    } catch (error) {
      throw new Error(`Erro ao compilar template: ${error}`);
    }
  }
}

export default EmailTemplateShared;