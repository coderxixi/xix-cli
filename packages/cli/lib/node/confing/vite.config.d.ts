import { InlineConfig } from 'vite';
import { VarletConfig, type VarletConfigHtmlInject } from './varlet.config.js';
export declare function getHtmlInject(inject: VarletConfigHtmlInject): {
    head: {
        start: any[];
        end: any[];
        scriptStart: any[];
    };
    body: {
        start: any[];
        end: any[];
        scriptStart: any[];
    };
};
export declare function getDevConfig(varletConfig: Required<VarletConfig>): InlineConfig;
export declare function getBuildConfig(varletConfig: Required<VarletConfig>): InlineConfig;
export interface BundleBuildOptions {
    fileName: string;
    output: string;
    format: 'es' | 'cjs' | 'umd';
    removeEnv: boolean;
    emptyOutDir: boolean;
}
export declare function getBundleConfig(varletConfig: Required<VarletConfig>, buildOptions: BundleBuildOptions): InlineConfig;
export type ExtensionMode = 'dev' | 'build';
export declare function getExtensionConfig(mode: ExtensionMode): InlineConfig;