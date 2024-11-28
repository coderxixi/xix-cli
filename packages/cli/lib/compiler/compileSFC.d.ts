export declare function declareEmptySFC(): string;
export declare function replaceExportToDeclare(script: string): string;
export declare function injectExport(script: string): string;
export declare function injectScopeId(script: string, scopeId: string): string;
export declare function injectRender(script: string, render: string): string;
export declare function compileSFC(sfc: string): Promise<void>;
