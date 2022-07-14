"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const path_1 = require("path");
const basic_kodyfire_1 = require("basic-kodyfire");
const fs = require("fs");
const fsPromises = fs.promises;
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
class Engine extends basic_kodyfire_1.Engine {
    constructor() {
        super();
    }
    readSync(path, templateName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fs.existsSync((0, path_1.join)(path, templateName))) {
                const template = yield fs.readFileSync((0, path_1.join)(path, templateName), 'binary');
                return template;
            }
            const template = yield fs.readFileSync((0, path_1.join)((0, path_1.relative)(process.cwd(), __dirname), path, templateName), 'binary');
            return template;
        });
    }
    read(path, templateName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fs.existsSync((0, path_1.join)(path, templateName))) {
                const template = yield fsPromises.readFile((0, path_1.join)(path, templateName));
                return template === null || template === void 0 ? void 0 : template.toString();
            }
            const template = yield fsPromises.readFile((0, path_1.join)((0, path_1.relative)(process.cwd(), __dirname), path, templateName));
            return template === null || template === void 0 ? void 0 : template.toString();
        });
    }
    getPartial(path, template, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tpl = yield this.read(path, template);
            const compiled = yield this.compile(tpl, data);
            return compiled;
        });
    }
    compile(template, data) {
        const zip = new PizZip(template);
        this.builder = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
        this.builder.render(Object.assign(Object.assign({}, data), { first_name: "John", last_name: "Doe", phone: "0652455478", description: "New Website" }));
        return this.builder.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });
    }
    create(rootDir, outputDir, filename, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fsPromises.writeFile((0, path_1.join)(rootDir, outputDir, filename), content);
        });
    }
    overwrite(rootDir, outputDir, filename, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fsPromises.writeFile((0, path_1.join)(rootDir, outputDir, filename), content);
        });
    }
    createOrOverwrite(rootDir, outputDir, filename, content, 
    // @todo allow to overwrite
    overwrite = false) {
        return __awaiter(this, void 0, void 0, function* () {
            filename = (0, path_1.join)(rootDir, outputDir, filename);
            // @todo allow to overwrite
            if (!overwrite) {
                content = this.setContent(filename, content);
            }
            // We need to create the directory if it doesn't exist
            yield fsPromises.mkdir((0, path_1.dirname)(filename), { recursive: true });
            yield fsPromises.writeFile(filename, content);
        });
    }
    setContent(filename, content) {
        try {
            if (fs.existsSync(filename)) {
                // @todo: use AST to check if the content is the same
                // and update accordingly
            }
        }
        catch (error) {
            // contine silently
            // @todo: elaborate error handling
            console.log(filename, error.message);
        }
        return content;
    }
    getFiles(rootDir, outputDir) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fsPromises.readdir((0, path_1.join)(rootDir, outputDir));
            return files;
        });
    }
}
exports.Engine = Engine;
//# sourceMappingURL=engine.js.map