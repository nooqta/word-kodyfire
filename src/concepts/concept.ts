import { IConcept, ITechnology } from 'kodyfire-core';
import { join, relative } from 'path';

import {  Concept as BaseConcept } from 'basic-kodyfire';
import { Engine } from './engine';

export class Concept extends BaseConcept {
  constructor(concept: Partial<IConcept>, technology: ITechnology) {
    super(concept, technology);
    this.engine = new Engine();
  }

  async generate(_data: any) {
    // @ts-ignore
    const template = await this.engine.readSync(
      join(this.getTemplatesPath(), this.template.path),
      _data.template
    );

    const compiled = this.engine.compile(template, _data);

    await this.engine.createOrOverwrite(
      this.technology.rootDir,
      this.outputDir,
      this.getFilename(_data),
      compiled
    );
  }

  getFilename(data: any) {
    if (data.filename) return data.filename;
    return join(
      data.outputDir,
      `${data.name}.${data.extension || this.getExtension(data.template)}`
    );
  }

  getExtension(templateName: string) {
    return templateName.replace('.template', '').split('.').pop();
  }

  getTemplatesPath(): string {
    return this.technology.params.templatesPath
      ? this.technology.params.templatesPath
      : relative(process.cwd(), __dirname);
  }
}
