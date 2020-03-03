const CONVERSION_FUNNEL = "CONVERSION_FUNNEL";
const LABEL = "LABEL";
const REAL_TIME_MEDIA_REPORT = "REAL_TIME_MEDIA_REPORT";
const RECENT_ITEMS = "RECENT_ITEMS";
const KPI = "KPI";
const FILTERED_REPORTS = "FILTERED_REPORTS";

module.exports = {
  data: {
    1: {
      id: 1,
      title: "Demo Dashboard",
      reports: [
        {
          id: 2,
          metrics: ["TOTAL_ITEMS_ORDERED", "TOTAL_SALES", "TOTAL_SHIPPING"],
          type: KPI,
          title: 'Abandoned shopping carts (filtered report)',
          visualization: "LINE",
          last24Hours: false,
          projected: false,
          cumulative: true,
        }
      ]
    }
  }
};
