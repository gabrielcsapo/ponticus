# ponticus

Visualize JavaScript source complexity with plato.
Based on the older es5 plato, this is a port to `es6` and `eslint`

#The Report
![dank-es6-nugs](https://cloud.githubusercontent.com/assets/954596/18904556/3a81efea-8524-11e6-8588-ad8f5a51b001.PNG)

## Start in 3 steps.

1. Install.
   `npm install --save-dev @ponticus/plato`

2. Add.

```
"scripts" : {
    "complexity-report": "./node_modules/.bin/ponticus -r -d ./report src",
}
```

3. Run.
   `npm run complexity-report`

## Installation

Install the module with: `npm install --save-dev @ponticus/plato`

## Usage

### From scripts

```js
//be sure and set your src, output, and any options.
let src = "./scripts/**/*.js";
let outputDir = "./artifacts/plato";

let platoArgs = {
  title: "example",
  eslint: {},
};

//you can use the reports in the callback.
function callback(reports) {
  let overview = plato.getOverviewReport(reports);

  let { total, average } = overview.summary;

  let output = `total
    ----------------------
    eslint: ${total.eslint}
    sloc: ${total.sloc}
    maintainability: ${total.maintainability}
    average
    ----------------------
    eslint: ${average.eslint}
    sloc: ${average.sloc}
    maintainability: ${average.maintainability}`;

  console.log(output);
}

//usage is plato.inspect
plato.inspect(src, outputDir, platoArgs, callback);
```

### From the commandline

```sh
Usage : ponticus [options] -d <output_dir> <input files>
  -h, --help
      Display this help text.
  -q, --quiet
      Reduce output to errors only
  -v, --version
      Print the version.
  -x, --exclude : String
      File exclusion regex
  -d, --dir : String *required*
      The output directory
  -r, --recurse
      Recursively search directories
  -t, --title : String
      Title of the report
  -D, --date : String
      Time to use as the report date (seconds, > 9999999999 assumed to be ms)
  -n, --noempty
      Skips empty lines from line count
  -e, --eslint : String
      Specify a eslintrc file for ESLint linting
```

**Example**

```shell
ponticus -r -d report src
```

> Note for Windows Users:
> If you are on Windows, you might want to put your glob in quotes if you use a tool such as cygwin, conemu or some other emulator, and you are also targeting files in directories, otherwise the emulator might incorrectly expand the glob before it is handled internally by ponticus. For instance, if you want to use `/src/**/*.js` and the results are ignoring the root try `'./src/**/*.js'` instead.

![class functions, ya'll](https://cloud.githubusercontent.com/assets/954596/18904476/d1a57302-8523-11e6-85df-b474be8c59a8.PNG)

## Data sources

- Complexity from [@ponticus/escomplex](../escomplex/README.md)
- Lint data from [eslint](http://eslint.org/)
