"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = exports.analyse = void 0;
const lodash_1 = require("lodash");
// @ts-ignore
const escomplex_1 = __importDefault(require("@ponticus/escomplex"));
function analyse(js) {
    return escomplex_1.default.analyzeModule(js);
}
exports.analyse = analyse;
function process(analyses) {
    const summary = escomplex_1.default.processProject(analyses);
    summary.totalLOC = (0, lodash_1.sum)(summary.reports.map((report) => report.aggregate.sloc.logical));
    return summary;
}
exports.process = process;
//# sourceMappingURL=complexity-analyzer.js.map