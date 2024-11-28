import { VarletConfig } from '../confing/xixi.config.js';
export declare const IMPORT_FROM_DEPENDENCE_RE: RegExp;
export declare const EXPORT_FROM_DEPENDENCE_RE: RegExp;
export declare const IMPORT_DEPENDENCE_RE: RegExp;
export declare const scriptExtNames: string[];
export declare const styleExtNames: string[];
export declare const scriptIndexes: string[];
export declare const styleIndexes: string[];
export declare const tryMatchExtname: (file: string, extname: string[]) => string | undefined;
export declare const resolveAlias: (dependence: string, file: string, alias?: VarletConfig["alias"]) => string;
export declare const resolveDependence: (file: string, script: string, alias?: VarletConfig["alias"]) => string;
export declare function compileScriptByBabel(script: string, file: string): Promise<string>;
export declare function compileScriptByEsbuild(script: string): Promise<string>;
export declare function compileScript(script: string, file: string): Promise<void>;
export declare function compileScriptFile(file: string): Promise<void>;
export declare function getScriptExtname(): string;
export interface GenerateEsEntryTemplateOptions {
    publicDirs: string[];
    scriptExtname?: string;
    root?: string;
}
export declare function generateEsEntryTemplate(options: GenerateEsEntryTemplateOptions): {
    indexTemplate: string;
    styleTemplate: string;
    bundleTemplate: string;
};
export declare function compileESEntry(dir: string, publicDirs: string[]): Promise<void>;
