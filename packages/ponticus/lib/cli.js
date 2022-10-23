"use strict";

import fs from "fs-extra";

import getopt from "posix-getopt";

import plato from "./plato.js";
import info from "./info.js";
import util from "./util.js";

const options = {
  h: {
    long: "help",
    desc: "Display this help text.",
    type: "Boolean",
    modal: true,
  },
  q: {
    long: "quiet",
    desc: "Reduce output to errors only",
    type: "Boolean",
  },
  v: {
    long: "version",
    desc: "Print the version.",
    type: "Boolean",
    modal: true,
  },
  x: {
    long: "exclude",
    desc: "File exclusion regex",
    type: "String",
  },
  d: {
    long: "dir",
    desc: "The output directory",
    type: "String",
    required: true,
  },
  r: {
    long: "recurse",
    desc: "Recursively search directories",
    type: "Boolean",
  },
  l: {
    long: "jshint",
    desc: "Specify a jshintrc file for JSHint linting",
    type: "String",
  },
  t: {
    long: "title",
    desc: "Title of the report",
    type: "String",
  },
  D: {
    long: "date",
    desc: "Time to use as the report date (seconds, > 9999999999 assumed to be ms)",
    type: "String",
  },
  n: {
    long: "noempty",
    desc: "Skips empty lines from line count",
    type: "Boolean",
  },
  e: {
    long: "eslint",
    desc: "Specify a eslintrc file for ESLint linting",
    type: "String",
  },
};

async function exec(options, done) {
  if (typeof options === "function") {
    done = options;
    options = undefined;
  }

  if (options) {
    Object.keys(options).forEach(function decorateArgs(key) {
      if (!(key in this.args)) {
        this.args[key] = options[key];
      }
    });
  }

  console.log(this.args);
  var files = this.args.files;
  var outputDir = this.args.d.value;
  var platoOptions = {
    recurse: !!this.args.r,
    q: !!this.args.q,
    title: this.args.t && this.args.t.value,
    exclude: this.args.x && new RegExp(this.args.x.value),
    date: this.args.D && this.args.D.value,
    eslintrc: this.args.e && this.args.e.value,
  };

  if (this.args.l) {
    var jshintrc = {};
    if (typeof this.args.l.value === "string") {
      var json = await fs.readFile(this.args.l.value).toString();

      jshintrc = JSON.parse(util.stripComments(json));
    }
    platoOptions.jshint = {
      globals: jshintrc.globals || {},
    };
    delete jshintrc.globals;
    platoOptions.jshint.options = jshintrc;
  }
  return plato.inspect(files, outputDir, platoOptions, done);
}

function parseArgs(options) {
  //  \/\\*(?:(?!\\*\/)|.|\\n)*?\\*\/
  var optionString = "",
    required = [],
    modal = false;

  function parseArg(option) {
    var def = options[option];
    optionString += option;
    if (def.type === "String") {
      optionString += ":";
    }
    if (def.long) {
      optionString += "(" + def.long + ")";
    }
    if (def.required) {
      required.push(option);
    }
  }

  Object.keys(options).forEach(parseArg);

  var parser = new getopt.BasicParser(optionString, process.argv);
  var args = {},
    option;

  while ((option = parser.getopt())) {
    var arg = args[option.option] || {
      count: 0,
    };
    arg.count++;
    arg.value = option.optarg || true;

    args[option.option] = arg;

    if (options[option.option].modal) {
      modal = true;
    }
  }

  if (!modal) {
    required.forEach(function handleNonModal(option) {
      if (!args[option] || !args[option].value) {
        // eslint-disable-next-line no-console
        console.log(
          "Must specify a value for option %s (%s : %s)",
          option,
          options[option].long,
          options[option].desc
        );
        info.help();
        process.exit(1);
      }
    });
  }
  // what's left in argv
  args.files = process.argv.slice(parser.optind());

  return args;
}

export default {
  exec,
  options,
  args: parseArgs(options),
};
