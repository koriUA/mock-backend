const CONVERSION_FUNNEL = "CONVERSION_FUNNEL";
const LABEL = "LABEL";
const REAL_TIME_MEDIA_REPORT = "REAL_TIME_MEDIA_REPORT";
const RECENT_ITEMS = "RECENT_ITEMS";
const KPI = "KPI";
const FILTERED_REPORTS = "FILTERED_REPORTS";

module.exports = {
  data: {
    1: {
      "id": 1541,
      "title": "Copy Sessions Analysis",
      "dashboardType": "REALTIME_DASHBOARD",
      "categoryId": null,
      "subClients": [],
      "dateRange": null,
      "comparisonParams": {
        "comparisonDateRange": null,
        "comparisonData": false,
        "differenceData": false,
        "percentDifferenceData": false
      },
      "widgets": [{
        "id": 4823,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 5021,
          "title": "${TotalSessions}",
          "metrics": ["TotalSessions"],
          "visualization": "BAR",
          "cumulative": false,
          "last24Hours": true,
          "projected": true
        }],
        "gridOptions": {"x": 0, "y": 0, "width": 6, "height": 4}
      }, {
        "id": 4824,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 5022,
          "title": null,
          "metrics": ["TotalSessions"],
          "visualization": "NUMBER",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }],
        "gridOptions": {"x": 6, "y": 0, "width": 6, "height": 2}
      }, {
        "id": 4825,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 5023,
          "title": "${TotalNewSessions}",
          "metrics": ["TotalNewSessions"],
          "visualization": "LINE",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }],
        "gridOptions": {"x": 0, "y": 4, "width": 6, "height": 4}
      }, {
        "id": 4826,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 5024,
          "title": "${TotalRepeatedSessions}",
          "metrics": ["TotalRepeatedSessions"],
          "visualization": "LINE",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }],
        "gridOptions": {"x": 6, "y": 4, "width": 6, "height": 4}
      }, {
        "id": 4827,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 5025,
          "title": "${MmcSessions}",
          "metrics": ["MmcSessions"],
          "visualization": "LINE",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }],
        "gridOptions": {"x": 0, "y": 8, "width": 6, "height": 4}
      }, {
        "id": 4828,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 5026,
          "title": "${TotalNaturalSearchSessions}",
          "metrics": ["TotalNaturalSearchSessions"],
          "visualization": "LINE",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }],
        "gridOptions": {"x": 6, "y": 8, "width": 6, "height": 4}
      }, {
        "id": 4829,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 5027,
          "title": "${TotalReferralSessions}",
          "metrics": ["TotalReferralSessions"],
          "visualization": "LINE",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }],
        "gridOptions": {"x": 0, "y": 12, "width": 6, "height": 4}
      }, {
        "id": 4830,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 5028,
          "title": "${TotalDirectLoadSessions}",
          "metrics": ["TotalDirectLoadSessions"],
          "visualization": "LINE",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }],
        "gridOptions": {"x": 6, "y": 12, "width": 6, "height": 4}
      }, {
        "id": 4831,
        "widgetItems": [{
          "type": "RT_KPI",
          "id": 5029,
          "title": "${AverageSessionLength}",
          "metrics": ["AverageSessionLength"],
          "visualization": "LINE",
          "cumulative": false,
          "last24Hours": false,
          "projected": false
        }],
        "gridOptions": {"x": 0, "y": 16, "width": 6, "height": 4}
      }],
      "viewDashboard": false,
      "shareMode": "SHARED",
      "securityGroupIds": ["55682"]
    },
  }
};
