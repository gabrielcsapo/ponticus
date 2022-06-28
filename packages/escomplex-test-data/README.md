# typhonjs-escomplex-test-data
Provides shared test data resources for all typhonjs-escomplex repos.

This repo is included in devDependencies linked directly to GitHub such as:
```
  "devDependencies": {
    "typhonjs-escomplex-test-data": "git+https://git@github.com/typhonjs-node-escomplex/typhonjs-escomplex-test-data.git"
  },
```

The following files are available:

`./files/large-project/results/results.json`: A serialized ProjectResult of typhonjs-escomplex-project and dependencies. 

`./files/large-project/results/results-no-reports.json`: A serialized ProjectResult of typhonjs-escomplex-project and dependencies without ModuleReports serialized. 

`./files/large-module/report/report.json`: A serialized ModuleReport of `backbone-es6`-> `Collection.js`. 

`./files/large-module/src/Collection.js`: The JS source that generated large-module `report.json`. 

An examples follows on how to load and parse files for use:
```
import ProjectResult    from 'typhonjs-escomplex-commons/src/project/result/ProjectResult';

// You can either use `fs`.
// const largeProjectJSON = 
//  JSON.parse(fs.readFileSync('./node_modules/typhonjs-escomplex-test-data/files/large-project/results/results.json', 'utf8'));

// Or for JSON files simply `require` it.
const largeProjectJSON = require('typhonjs-escomplex-test-data/files/large-project/results/results');

const projectResult = ProjectResult.parse(largeProjectJSON);

console.log(projectResult.toFormat('markdown'));
```
