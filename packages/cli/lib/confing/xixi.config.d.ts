import { type VIConfig } from '@varlet/icon-builder';
import { type CopyOptions } from '@varlet/vite-plugins';
import { ProxyOptions } from 'vite';
export interface VarletConfigIcons extends VIConfig {
    /**
     * @default true
     * Whether to generate png
     */
    genPng?: boolean;
}
export interface VarletConfigEsbuild {
    target?: string | string[];
}
export interface VarletConfigHtmlInjectPoint {
    position?: 'start' | 'end' | 'script-start';
    content?: string;
}
export interface VarletConfigHtmlInject {
    head?: VarletConfigHtmlInjectPoint[];
    body?: VarletConfigHtmlInjectPoint[];
}
export interface VarletConfigPcMenu {
    text: Record<string, string>;
    type: number;
    doc?: string;
}
export interface VarletConfigPcHeader {
    i18n?: Record<string, string>;
    currentVersion?: string;
    github?: string;
    changelog?: string;
    playground?: string;
    ai?: string;
    themes?: Record<string, string>[];
    versions?: {
        name: string;
        items?: {
            label?: string;
            link?: string;
        }[];
    }[];
}
export interface VarletConfigPcAd {
    id?: string;
    logo?: string;
    logoHeight?: string;
    description?: Record<string, string>;
    descriptionBackground?: string;
    descriptionTextColor?: string;
    link?: Record<string, string>;
    background?: string;
    textColor?: string;
}
export interface VarletConfigMobileHeader {
    i18n?: Record<string, string>;
    github?: string;
    themes?: Record<string, string>[];
}
export interface VarletConfigSeo {
    title?: string;
    description?: string;
    keywords?: string;
}
export interface VarletConfigPcIndexPage {
    description?: Record<string, string>;
    started?: Record<string, string>;
    viewOnGithub?: Record<string, string>;
    features?: {
        name: Record<string, string>;
        description: Record<string, string>;
    }[];
    teamMembers?: {
        label: Record<string, string>;
        members: {
            name?: Record<string, string>;
            title?: Record<string, string>;
            description?: Record<string, string>;
            avatar?: string;
            github?: string;
            twitter?: string;
        }[];
    };
    contributors?: {
        label?: Record<string, string>;
        link?: string;
        image?: string;
    };
    sponsors?: {
        label?: Record<string, string>;
        link?: string;
        image?: string;
    };
    license?: Record<string, string>;
    copyright?: Record<string, string>;
}
export interface VarletConfigPc {
    title?: Record<string, string>;
    redirect?: string;
    clipboard?: Record<string, string>;
    indexPage?: VarletConfigPcIndexPage;
    ad?: VarletConfigPcAd;
    header?: VarletConfigPcHeader;
    menu?: VarletConfigPcMenu[];
    htmlInject?: VarletConfigHtmlInject;
    fold?: {
        defaultFold?: boolean;
        foldHeight?: number;
    };
}
export interface VarletConfigMobile {
    title?: Record<string, string>;
    redirect?: string;
    header?: VarletConfigMobileHeader;
    htmlInject?: VarletConfigHtmlInject;
}
export interface VarletConfig {
    /**
     * @default `Varlet`
     * UI library name.
     */
    name?: string;
    /**
     * @default `var`
     * Component name prefix
     */
    namespace?: string;
    /**
     * @default `localhost`
     * Local dev server host
     */
    host?: string;
    /**
     * @default `8080`
     * Local dev server port
     */
    port?: number;
    proxy?: Record<string, string | ProxyOptions>;
    title?: string;
    logo?: string;
    themeKey?: string;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
    defaultLanguage?: 'zh-CN' | 'en-US';
    alias?: Record<string, string>;
    /**
     * @default `false`
     * Show mobile component on the right.
     */
    useMobile?: boolean;
    lightTheme?: Record<string, string>;
    darkTheme?: Record<string, string>;
    md3LightTheme?: Record<string, string>;
    md3DarkTheme?: Record<string, string>;
    defaultLightTheme?: 'lightTheme' | 'md3LightTheme';
    defaultDarkTheme?: 'darkTheme' | 'md3DarkTheme';
    highlight?: {
        style: string;
    };
    analysis?: {
        baidu: string;
    };
    pc?: VarletConfigPc;
    mobile?: VarletConfigMobile;
    copy?: CopyOptions['paths'];
    icons?: VarletConfigIcons;
    esbuild?: VarletConfigEsbuild;
    bundle?: {
        external?: string[];
        globals?: Record<string, string>;
    };
    /**
     * @default `[]`
     * Directive folder name for component library.
     */
    directives?: string[];
    _cf?: string[];
}
export declare function defineConfig(config: VarletConfig): VarletConfig;
export declare function mergeStrategy(_: any, srcValue: any, key: any): any[] | undefined;
export declare function getXixiConfig(emit?: boolean): Promise<Required<VarletConfig>>;
