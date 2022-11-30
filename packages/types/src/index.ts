import { PlatformPath } from 'path';

// how can we use template types?
export interface Plugin {
  onConfigure: (options: ProjectOptions[]) => any;
  onProjectAverage: (projectReport: any, pathModule: PlatformPath, settings: any) => any;
  onProjectCalculate: (projectReport: any, pathModule: PlatformPath, settings: any) => any;
  onProjectEnd: (projectReport: any, pathModule: PlatformPath, settings: any) => any;
  onProjectPostAverage: (projectReport: any, pathModule: PlatformPath, settings: any) => any;
  onProjectStart: (projectReport: any, pathModule: PlatformPath, settings: any) => any;
}

export interface PluginOptions {
  loadDefaultPlugins: boolean;
  plugins: Plugin[];
}

export interface ProjectOptions {
  module: PluginOptions;
  project: PluginOptions;
}