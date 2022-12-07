/// <reference types="node" />
import { PlatformPath } from "path";
export interface Rules {
    quotes: any[];
    semi: any[];
    curly: string[];
    "no-dupe-keys": number;
    "func-names": any[];
}
export interface Env {
    es6: boolean;
    browser: boolean;
}
export interface ParserOptions {
    sourceType: string;
    ecmaFeatures: EcmaFeatures;
    babelOptions?: object;
}
export interface ESLintBase {
    rules: Rules;
    env: Env;
    globals: string[];
    parserOptions: ParserOptions;
}
export interface EcmaFeatures {
    arrowFunctions?: boolean;
    blockBindings?: boolean;
    destructuring?: boolean;
    regexYFlag?: boolean;
    regexUFlag?: boolean;
    templateStrings?: boolean;
    binaryLiterals?: boolean;
    octalLiterals?: boolean;
    unicodeCodePointEscapes?: boolean;
    defaultParams?: boolean;
    restParams?: boolean;
    forOf?: boolean;
    objectLiteralComputedProperties?: boolean;
    objectLiteralShorthandMethods?: boolean;
    objectLiteralShorthandProperties?: boolean;
    objectLiteralDuplicateProperties?: boolean;
    generators?: boolean;
    spread?: boolean;
    classes?: boolean;
    modules?: boolean;
    jsx?: boolean;
    globalReturn?: boolean;
    typescript?: boolean;
    experimentalObjectRestSpread?: boolean;
}
export interface Plugin {
    onConfigure(options: ComplexityReporterOptions[]): any;
    onProjectAverage(projectReport: any, pathModule: PlatformPath, settings: any): any;
    onProjectCalculate(projectReport: any, pathModule: PlatformPath, settings: any): any;
    onProjectEnd(projectReport: any, pathModule: PlatformPath, settings: any): any;
    onProjectPostAverage(projectReport: any, pathModule: PlatformPath, settings: any): any;
    onProjectStart(projectReport: any, pathModule: PlatformPath, settings: any): any;
}
export interface PluginOptions {
    loadDefaultPlugins: boolean;
    plugins: Plugin[];
}
export interface ProjectOptions {
    module: PluginOptions;
    project: PluginOptions;
}
export declare type InspectOptions = {
    recurse?: boolean;
    q?: boolean;
    title?: string;
    exclude?: string[];
    date?: number;
    eslintrc?: string;
};
export declare type ReportFlags = {
    complexity: ComplexityReporterOptions;
    eslint: string | ESLintBase;
};
export interface ComplexityReporterOptions {
    ecmaFeatures?: EcmaFeatures;
    parserOptions?: ParserOptions;
    sourceType: string;
    ecmaVersion: number;
    loc: boolean;
    newmi: boolean;
    range: boolean;
}
export declare const DefaultComplexityReporterOptions: ComplexityReporterOptions;
//# sourceMappingURL=index.d.ts.map