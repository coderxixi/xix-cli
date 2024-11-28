import { type VarletConfig } from '../confing/xixi.config.js';
export interface TemplateHighlightCompilerOptions {
    md: string;
    json: string;
    titleAttributes: RegExp;
    titleEvents: RegExp;
    titleSlots: RegExp;
}
export declare const replaceDot: (s: string) => string;
export declare const replaceVersion: (s: string) => string;
export declare const replaceUnderline: (s: string) => string;
export declare function parseTable(table: string): string[][];
export declare function compileTable(md: string, titleRe: RegExp): string;
export declare function compileWebTypes(table: Record<string, any>, webTypes: Record<string, any>, componentName: string, varletConfig: Required<VarletConfig>): void;
export declare function compileMD(path: string, webTypes: Record<string, any>, varletConfig: Required<VarletConfig>, options: TemplateHighlightCompilerOptions): void;
export declare function compileDir(path: string, webTypes: Record<string, any>, varletConfig: Required<VarletConfig>, options: TemplateHighlightCompilerOptions): void;
export declare function compileLanguageMD(varletConfig: Required<VarletConfig>, options: TemplateHighlightCompilerOptions): void;
export declare function compileTemplateHighlight(): Promise<void>;
