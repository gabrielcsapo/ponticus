// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require("path");
const fs = require("fs");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// TODO: remaining packages to turn on
[
  // "packages/ast-walker",
  // "packages/babel-parser",
  // "packages/backbone-esnext-events",
  // "packages/escomplex-commons",
  // "packages/escomplex-module",
  // "packages/escomplex-plugin-metrics-module",
  // "packages/escomplex-plugin-metrics-project",
  // "packages/escomplex-plugin-syntax-babylon",
  // "packages/escomplex-plugin-syntax-estree",
  // "packages/escomplex-project",
  // "packages/escomplex-test-data",
  // "packages/plato",
  // "packages/plugin-manager",
  // "packages/ponticus",
];

console.log("used for debugging, ", fs.readdirSync(path.join(__dirname, "..")));

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ponticus",
  tagline: "Visualize JavaScript source complexity",
  url: "https://gabrielcsapo.github.io",
  baseUrl: "ponticus/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "gabrielcsapo",
  projectName: "ponticus",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "docusaurus-plugin-typedoc-api",
      {
        projectRoot: path.join(__dirname, ".."),
        packages: [
          "packages/analyzer",
          "packages/escomplex",
          "packages/escomplex-module",
          "packages/plugin-manager",
        ],
        debug: true,
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Ponticus",
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Documentation",
          },
          {
            to: "api",
            label: "API",
            position: "left",
          },
          {
            href: "https://gabrielcsapo.github.io/ponticus/report/",
            label: "Example Report",
            position: "right",
          },
          {
            href: "https://github.com/gabrielcsapo/ponticus",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Ponticus. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
