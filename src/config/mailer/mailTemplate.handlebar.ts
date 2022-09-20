import handlebars from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IMailTemplateParse {
  template: string;
  variables: ITemplateVariables;
}

export default class mailHandlebar {
  async parse({ template, variables }: IMailTemplateParse): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
