"use strict";

import { sum } from "lodash";

import ESComplex from "@ponticus/escomplex";

export function analyse(js: string) {
  return ESComplex.analyzeModule(js);
}

export function process(analyses: any) {
  const summary = ESComplex.processProject(analyses);

  summary.totalLOC = sum(
    summary.reports.map((report: any) => report.aggregate.sloc.logical)
  );

  return summary;
}
