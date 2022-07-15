import { join, relative, dirname } from "path";
import { Engine as BaseEngine } from "basic-kodyfire";
const fs = require("fs");
const fsPromises = fs.promises;
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
export class Engine extends BaseEngine {
  builder: any;
  constructor() {
    super();
  }

  
  async readSync(path: string, templateName: any) {
    if (fs.existsSync(join(path, templateName))) {
      const template = await fs.readFileSync(join(path, templateName), 'binary');
      return template;
    }
    const template = await fs.readFileSync(
      join(relative(process.cwd(), __dirname), path, templateName), 'binary');

    return template;
  }

  async read(path: string, templateName: any) {
    if (fs.existsSync(join(path, templateName))) {
      const template = await fsPromises.readFile(join(path, templateName));
      return template?.toString();
    }
    const template = await fsPromises.readFile(
      join(relative(process.cwd(), __dirname), path, templateName)
    );
    return template?.toString();
  }

  async getPartial(path: string, template: string, data: any) {
    const tpl = await this.read(path, template);

    const compiled = await this.compile(tpl, data);
    return compiled;
  }

  compile(template: any, data: any) {
    const zip = new PizZip(template);

    this.builder = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document
    this.builder.render(data);

    return this.builder.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });
  }

  async create(
    rootDir: string,
    outputDir: string,
    filename: any,
    content: string | Buffer
  ) {
    await fsPromises.writeFile(join(rootDir, outputDir, filename), content);
  }
  async overwrite(
    rootDir: string,
    outputDir: string,
    filename: any,
    content: string | Buffer
  ) {
    await fsPromises.writeFile(join(rootDir, outputDir, filename), content);
  }

  async createOrOverwrite(
    rootDir: string,
    outputDir: string,
    filename: any,
    content: string | Buffer,
    // @todo allow to overwrite
    overwrite = false
  ) {
    filename = join(rootDir, outputDir, filename);
    // @todo allow to overwrite
    if (!overwrite) {
      content = this.setContent(filename, content);
    }
    // We need to create the directory if it doesn't exist
    await fsPromises.mkdir(dirname(filename), { recursive: true });
    await fsPromises.writeFile(filename, content);
  }
  setContent(filename: any, content: string | Buffer): string | Buffer {
    try {
      if (fs.existsSync(filename)) {
        // @todo: use AST to check if the content is the same
        // and update accordingly
      }
    } catch (error) {
      // contine silently
      // @todo: elaborate error handling
      console.log(filename, error.message);
    }
    return content;
  }

  async getFiles(rootDir: string, outputDir: string) {
    const files = await fsPromises.readdir(join(rootDir, outputDir));
    return files;
  }
}
