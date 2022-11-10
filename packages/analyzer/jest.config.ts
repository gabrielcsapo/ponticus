import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  rootDir: process.cwd(),
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: [],
  transform: {
    ".*\\.(tsx?|jsx?)$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};
export default config;
