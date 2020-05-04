const CONVERSION_FUNNEL = "CONVERSION_FUNNEL";
const LABEL = "LABEL";
const REAL_TIME_MEDIA_REPORT = "REAL_TIME_MEDIA_REPORT";
const RECENT_ITEMS = "RECENT_ITEMS";
const KPI = "KPI";
const FILTERED_REPORTS = "FILTERED_REPORTS";

module.exports = {
  data: {
    1: {
      "subClients": [3000455064, 3000455532],
      "id": 1,
      "dashboardType": "ENTERPRISE_DASHBOARD",
      "title": "Dashboard with all widgets",
      "widgets": [{
        "id": 57,
        "widgetItems": [{
          "type": "ED_REPORT",
          "id": 77,
          "title": "default title2ff",
          "reportType": "ED_TOPLINE_SUMMARY",
          "metrics": [],
          "displayTop": 5
        }, {
          "type": "ED_REPORT",
          "id": 81,
          "title": "default title",
          "reportType": "ED_MARKETING_VENDORS",
          "metrics": ["TotalConversionPoints"],
          "displayTop": 5
        }, {
          "type": "ED_REPORT",
          "id": 82,
          "title": "default title",
          "reportType": "ED_CHANNELS_SUMMARY",
          "metrics": ["TotalOrders", "TotalConversionPoints"],
          "displayTop": 5
        }]
      }, {
        "id": 59,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 64,
          "title": "MmcSessions",
          "metrics": ["AverageSessionLength", "AvgItemsInShoppingCart"],
          "visualization": "NUMBER",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }]
      }, {
        "id": 64,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 69,
          "title": "gddg",
          "metrics": ["MmcSessions"],
          "visualization": "BAR",
          "cumulative": true,
          "last24Hours": true,
          "projected": true
        }]
      }, {
        "id": 62,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 67,
          "title": "fdsfs",
          "metrics": ["AvgItemsInShoppingCart"],
          "visualization": "LINE",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }]
      }, {
        "id": 65,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 70,
          "title": "TotalConversionPoints",
          "metrics": ["TotalConversionPoints"],
          "visualization": "BAR",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }]
      }, {
        "id": 66,
        "widgetItems": [{
          "type": "RT_CONVERSION_FUNNEL",
          "id": 71,
          "title": "Conversion Funnel by Marketing Channel",
          "metrics": ["funnelMMC", "funnelNatural", "funnelReferral", "funnelDirect"]
        }]
      }, {
        "id": 54,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 56,
          "title": "MMC Sessions",
          "metrics": ["MmcSessions"],
          "visualization": "BAR",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }]
      }, {
        "id": 55,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 57,
          "title": "TotalOnePageSessions",
          "metrics": ["TotalOnePageSessions"],
          "visualization": "BAR",
          "cumulative": false,
          "last24Hours": true,
          "projected": true
        }]
      }, {
        "id": 84,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 99,
          "title": null,
          "metrics": ["AvgItemsInShoppingCart", "AverageSessionLength"],
          "visualization": "NUMBER",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }]
      }]
    },
  }
};
