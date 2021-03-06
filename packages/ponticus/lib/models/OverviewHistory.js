"use strict";

import History from "./History.js";

class OverviewHistory extends History {
  addReport(report, date) {
    date = date || report.date || new Date().toUTCString();
    this.push({
      date: date,
      total: {
        sloc: report.summary.total.sloc,
        maintainability: report.summary.total.maintainability,
      },
      average: {
        sloc: report.summary.average.sloc,
        maintainability: report.summary.average.maintainability,
      },
    });
    return this;
  }
}

export default OverviewHistory;
