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
      widgets: [
        {
          id: 2,
          widgetItems: [
            {
              id: 77,
              metrics: ["TOTAL_ITEMS_ORDERED"],
              type: KPI,
              title: 'Abandoned shopping carts (filtered report)',
              visualization: "LINE",
              last24Hours: false,
              projected: false,
              cumulative: true,
            }
          ]
        },
        {
          id: 3,
          widgetItems: [
            {
              id: 88,
              metrics: ["METRIC_001", "METRIC_002"],
              type: RECENT_ITEMS,
              title: 'Recent items 001',
            },
            {
              id: 98,
              metrics: ["METRIC_002"],
              type: RECENT_ITEMS,
              title: 'Recent items 002',
            },
            {
              id: 1298,
              metrics: ["METRIC_001"],
              type: RECENT_ITEMS,
              title: 'Recent items 003',
            }
          ]
        },
        {
          id: 6,
          widgetItems: [
            {
              id: 388,
              metrics: ["METRIC_001", "METRIC_002"],
              type: RECENT_ITEMS,
              title: 'Recent items 007',
            }
          ]
        }
      ]
    }
  }
};
