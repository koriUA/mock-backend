const CONVERSION_FUNNEL = "CONVERSION_FUNNEL";
const LABEL = "LABEL";
const REAL_TIME_MEDIA_REPORT = "REAL_TIME_MEDIA_REPORT";
const RECENT_ITEMS = "RECENT_ITEMS";
const KPI = "KPI";
const FILTERED_REPORTS = "FILTERED_REPORTS";

module.exports = {
  data: {
    1: {
      type: 'REAL_TIME_DASHBOARD',
      "id": 1, "title": "Demo dashboard RTM", "widgets": [
        {
          "id": 41, "widgetItems": [
            {
              "id": 49, "title": "Report 0032", "description": null, "metrics": ["Last10OnsiteSearches"],
              type: 'REPORT',
              "reportType": "RECENT_ITEMS",
              "visualization": null, "cumulative": false, "last24Hours": false, "projected": false, "displayTop": 5
            },
            {
              "id": 51,
              "title": "Report 003",
              "description": null,
              "metrics": ["Last10PagesBrowsed"],
              type: 'REPORT',
              "reportType": "RECENT_ITEMS",
              "visualization": null,
              "cumulative": false,
              "last24Hours": false,
              "projected": false,
              "displayTop": 5
            }]
        }, {
          "id": 39,
          "widgetItems": [{
            "id": 43,
            "title": null,
            "description": null,
            "metrics": ["BuyingSessionsPerSession", "BuyingSessionsPerSession", "TotalConversionsInitiated", "TotalNewSessions"],
            "type": "KPI",
            "visualization": "NUMBER",
            "cumulative": false,
            "last24Hours": false,
            "projected": false,
            "displayTop": null
          }]
        }, {
          "id": 40,
          "widgetItems": [{
            "id": 44,
            "title": null,
            "description": null,
            "metrics": ["TotalConversionsInitiated", "TotalOrders", "TotalShipping", "TotalRepeatedSessions", "MmcSessions", "TotalDirectLoadSessions", "TotalSales", "TotalPageViews"],
            "type": "KPI",
            "visualization": "PROGRESS",
            "cumulative": false,
            "last24Hours": false,
            "projected": false,
            "displayTop": null
          }]
        }, {
          "id": 43,
          "widgetItems": [{
            "id": 48,
            "title": "KPI line",
            "description": null,
            "metrics": ["TotalShipping"],
            "type": "KPI",
            "visualization": "LINE",
            "cumulative": false,
            "last24Hours": true,
            "projected": true,
            "displayTop": null
          }]
        }, {
          "id": 45,
          "widgetItems": [{
            "id": 53,
            "title": "KPI bar",
            "description": null,
            "metrics": ["TotalConversionsCompleted"],
            "type": "KPI",
            "visualization": "BAR",
            "cumulative": false,
            "last24Hours": true,
            "projected": true,
            "displayTop": null
          }]
        }]
    },
    2: {
      type: 'ENTERPRISE_DASHBOARD',
      "id": 2,
      "title": "Demo dashboard Enterprise",
      "widgets": [{
        "id": 42,
        "widgetItems": [{
          "id": 349,
          "title": "Report 0032",
          "description": null,
          "metrics": ["Last10OnsiteSearches"],
          "type": "RECENT_ITEMS",
          "visualization": null,
          "cumulative": false,
          "last24Hours": false,
          "projected": false,
          "displayTop": 5
        }, {
          "id": 551,
          "title": "Report 003",
          "description": null,
          "metrics": ["Last10PagesBrowsed"],
          "type": "RECENT_ITEMS",
          "visualization": null,
          "cumulative": false,
          "last24Hours": false,
          "projected": false,
          "displayTop": 5
        }]
      }, {
        "id": 439,
        "widgetItems": [{
          "id": 743,
          "title": null,
          "description": null,
          "metrics": ["BuyingSessionsPerSession", "BuyingSessionsPerSession", "TotalConversionsInitiated", "TotalNewSessions"],
          "type": "KPI",
          "visualization": "NUMBER",
          "cumulative": false,
          "last24Hours": false,
          "projected": false,
          "displayTop": null
        }]
      }, {
        "id": 4560,
        "widgetItems": [{
          "id": 443,
          "title": null,
          "description": null,
          "metrics": ["TotalConversionsInitiated", "TotalOrders", "TotalShipping", "TotalRepeatedSessions", "MmcSessions", "TotalDirectLoadSessions", "TotalSales", "TotalPageViews"],
          "type": "KPI",
          "visualization": "PROGRESS",
          "cumulative": false,
          "last24Hours": false,
          "projected": false,
          "displayTop": null
        }]
      }, {
        "id": 443,
        "widgetItems": [{
          "id": 648,
          "title": "KPI line",
          "description": null,
          "metrics": ["TotalShipping"],
          "type": "KPI",
          "visualization": "LINE",
          "cumulative": false,
          "last24Hours": true,
          "projected": true,
          "displayTop": null
        }]
      }, {
        "id": 4455,
        "widgetItems": [{
          "id": 53,
          "title": "KPI bar",
          "description": null,
          "metrics": ["TotalConversionsCompleted"],
          "type": "KPI",
          "visualization": "BAR",
          "cumulative": false,
          "last24Hours": true,
          "projected": true,
          "displayTop": null
        }]
      }]
    }
  }
};
