const CONVERSION_FUNNEL = "CONVERSION_FUNNEL";
const LABEL = "LABEL";
const REAL_TIME_MEDIA_REPORT = "REAL_TIME_MEDIA_REPORT";
const RECENT_ITEMS = "RECENT_ITEMS";
const KPI = "KPI";
const FILTERED_REPORTS = "FILTERED_REPORTS";

module.exports = {
  data: {
    1: {
      "id": 18,
      "title": "ED dashboard 001",
      "dashboardType": "ENTERPRISE_DASHBOARD",
      "subClients": [
        30000009,
        30004001,
        30000001
      ],
      "widgets": [
        {
          "id": 121,
          "widgetItems": [
            {
              "type": "ED_REPORT",
              "id": 146,
              "title": "ED test report",
              "reportType": "ED_CHANNELS_SUMMARY",
              "metrics": [],
              "attributionMetrics": [
                {
                  "metricId": "TotalSessions",
                  "attributionModels": [
                    {
                      "id": 108
                    },
                    {
                      "id": 173
                    },
                    {
                      "id": 174
                    }
                  ]
                },{
                  "metricId": "BounceRate",
                  "attributionModels": [
                    {
                      "id": 175
                    },
                    {
                      "id": 176
                    }
                  ]
                },
                {
                  "metricId": "PageViewsPerSession"
                }
              ]
            }
          ]
        }
      ]
    },
  }
};
