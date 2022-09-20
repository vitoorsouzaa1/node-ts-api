import fs from 'fs';
import handlebars from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IMailTemplateParse {
  file: string;
  variables: ITemplateVariables;
}

export default class mailHandlebar {
  async parse({ file, variables }: IMailTemplateParse): Promise<string> {
    const templateContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateContent);

    return parseTemplate(variables);
  }
}
