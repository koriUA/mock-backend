const express = require("express");
const dashboardsData = require("./dashboards-data");
const metricsData = require("./metrics-data");
const UtilsService = require("./utils");
const request = require("request");
const cors = require("cors");
const ReportOptions = require("./report-options-data");
const ReportData = require("./reports-data");
const axios = require('axios');
const _ = require('lodash');

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({ limit: "10mb", extended: true }));
const port = 3099;

const MAX_DELAY = 1000;
const ERROR_POSIBILITY_PERCENT = 0;
const NULL_DATA_POSSIBILITY = 0;

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, Math.random() * MAX_DELAY);
});

app.use(cors({ credentials: true, origin: "http://localhost:3090" }));

app.use((req, res, next) => {
  //res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3090');
  //res.setHeader("Access-Control-Allow-Headers", "*");
  //res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    next();
    return;
  }
  if (
    Math.random() < ERROR_POSIBILITY_PERCENT / 100 &&
    (req.originalUrl.includes("api/funnel") ||
      req.originalUrl.includes("api/kpi") ||
      req.originalUrl.includes("api/recent-items"))
  ) {
    return res.sendStatus(500);
  }
  if (
    Math.random() < NULL_DATA_POSSIBILITY / 100 &&
    (req.originalUrl.includes("api/funnel") ||
      req.originalUrl.includes("api/kpi") ||
      req.originalUrl.includes("api/recent-items"))
  ) {
    return res.status(200).send({
      data: null,
    });
  }

  next();
});

// app.post("/api/funnel/multisite", (req, res, next) => {
//   return res.status(200).send({
//     data: {
//       "30000001": {
//         steps: [
//           {
//             name: "TotalSessions",
//             value: 1944,
//           },
//           {
//             name: "TotalBrowsSes",
//             value: 503,
//           },
//           {
//             name: "TotalShopSes",
//             value: 353,
//           },
//           {
//             name: "TotalBuySes",
//             value: 252,
//           },
//         ],
//         channels: [
//           {
//             name: "TotalDirectLoadSessions",
//             value: 1544,
//           },
//           {
//             name: "MmcSessions",
//             value: 250,
//           },
//           {
//             name: "TotalNaturalSearchSessions",
//             value: 0,
//           },
//           {
//             name: "TotalReferralSessions",
//             value: 150,
//           },
//         ],
//       },
//       "30004001": {
//         steps: [
//           {
//             name: "TotalSessions",
//             value: 1895,
//           },
//           {
//             name: "TotalBrowsSes",
//             value: 505,
//           },
//           {
//             name: "TotalShopSes",
//             value: 355,
//           },
//           {
//             name: "TotalBuySes",
//             value: 255,
//           },
//         ],
//         channels: [
//           {
//             name: "TotalDirectLoadSessions",
//             value: 1495,
//           },
//           {
//             name: "MmcSessions",
//             value: 250,
//           },
//           {
//             name: "TotalNaturalSearchSessions",
//             value: 0,
//           },
//           {
//             name: "TotalReferralSessions",
//             value: 150,
//           },
//         ],
//       },
//       TOTAL_SELECTED: {
//         steps: [
//           {
//             name: "TotalSessions",
//             value: 3839,
//           },
//           {
//             name: "TotalBrowsSes",
//             value: 1008,
//           },
//           {
//             name: "TotalShopSes",
//             value: 708,
//           },
//           {
//             name: "TotalBuySes",
//             value: 507,
//           },
//         ],
//         channels: [
//           {
//             name: "TotalDirectLoadSessions",
//             value: 3039,
//           },
//           {
//             name: "MmcSessions",
//             value: 500,
//           },
//           {
//             name: "TotalNaturalSearchSessions",
//             value: 0,
//           },
//           {
//             name: "TotalReferralSessions",
//             value: 300,
//           },
//         ],
//       },
//       TOTAL_MASTER: {
//         steps: [
//           {
//             name: "TotalSessions",
//             value: 3839,
//           },
//           {
//             name: "TotalBrowsSes",
//             value: 1008,
//           },
//           {
//             name: "TotalShopSes",
//             value: 708,
//           },
//           {
//             name: "TotalBuySes",
//             value: 507,
//           },
//         ],
//         channels: [
//           {
//             name: "TotalDirectLoadSessions",
//             value: 3039,
//           },
//           {
//             name: "MmcSessions",
//             value: 500,
//           },
//           {
//             name: "TotalNaturalSearchSessions",
//             value: 0,
//           },
//           {
//             name: "TotalReferralSessions",
//             value: 300,
//           },
//         ],
//       },
//     },
//   });
// });

// app.post("/api/kpi/multisite", (req, res, next) => {
//   console.log("handled");
//   return res.status(200).send({
//     data: {
//       "30000001": {
//         data: [
//           {
//             time: 1587738380692,
//             value: 1,
//           },
//           {
//             time: 1587824780692,
//             value: 2,
//           },
//         ],
//         comparisonData: [
//           {
//             time: 1587133630211,
//             value: 3,
//           },
//           {
//             time: 1587220030211,
//             value: 4,
//           },
//         ],
//       },
//       "30004001": {
//         data: [
//           {
//             time: 1587738380692,
//             value: 1,
//           },
//           {
//             time: 1587824780692,
//             value: 2,
//           },
//         ],
//         comparisonData: [
//           {
//             time: 1587133630211,
//             value: 3,
//           },
//           {
//             time: 1587220030211,
//             value: 4,
//           },
//         ],
//       },
//       TOTAL_MASTER: {
//         data: [
//           {
//             time: 1587738380692,
//             value: 1,
//           },
//           {
//             time: 1587924780692,
//             value: 2,
//           },
//           {
//             time: 1588025780692,
//             value: 5,
//           },
//           {
//             time: 1589026780692,
//             value: 3,
//           },
//         ],
//         comparisonData: [
//           {
//             time: 1587133630211,
//             value: 3,
//           },
//           {
//             time: 1587220030211,
//             value: 4,
//           },
//         ],
//       },
//       TOTAL_SELECTED: {
//         data: [
//           {
//             time: 1587738380692,
//             value: 1,
//           },
//           {
//             time: 1587824780692,
//             value: 2,
//           },
//         ],
//         comparisonData: [
//           {
//             time: 1587133630211,
//             value: 3,
//           },
//           {
//             time: 1587220030211,
//             value: 4,
//           },
//         ],
//       },
//     },
//   });
// });
/*
app.post("/api/report-data", (req, res, next) => {
  res.send({
    data: ReportData[req.body.reportType]
  });
});
*/

/*
app.get("/api/dashboards/last-updated-time/:dashboardType", (req, res, next) => {
  res.send(`${Math.random()}`);
});
*/

// app.get("/api/widget-item-config/ED_KPI", (req, res, next) => {
//   return res.redirect("api/widget-item-config/RT_KPI");
// });

// app.post("/api/report-data", (req, res, next) => {
//   res.send({
//     data: ReportData[req.body.reportType]
//   });
// });
/*
app.get("/api/dashboards/subclients", (req, res, next) => {
  res.send([
    {
      id: 300000001,
      name: "bikehut.com",
      isMaster: true,
    },
    {
      id: 3000455064,
      name: "halfords.com",
      isMaster: false,
    },
    {
      id: 3000455064,
      name: "google.com",
      isMaster: false,
    },
    {
      id: 3000455532,
      name: "facebook.com",
      isMaster: false,
    },
    {
      id: 3000445675,
      name: "youtube.com",
      isMaster: false,
    },
  ]);
});
*/
/*
app.get("/api/dashboards/1", (req, res, next) => {
  console.log("GET /api/dashboard/:id");
  res.send(dashboardsData.data[1]);
});
*/

/*
app.get("/api/widget-item-config/ED_REPORT", (req, res, next) => {
  res.send(ReportOptions.data);
});*/

/*
app.post("/api/login", (req, res, next) => {
  res.send({ok: true});
})

app.get("/api/dashboards", (req, res, next) => {
  console.log('GET /api/dashboards');
  const data = Object.keys(dashboardsData.data).map(key => {
    return {
      id: dashboardsData.data[key].id,
      title: dashboardsData.data[key].title
    };
  });
  res.send(data);
});
*/

/*
app.get("/api/conversion-funnel", (req, res, next) => {
  const channels = ["Direct", "MMC", "Search", "Referral"];
  res.send({
    data: channels.map(channel => ({
      channel,
      channelData: UtilsService.getChannelData()
    }))
  });
});

app.get("/api/widget-item-config/MARKETING_PROGRAMS", (req, res, next) => {
  res.send(ReportOptions.data);
});
app.get("/api/widget-item-config/PRODUCTS", (req, res, next) => {
  res.send(ReportOptions.data);
});
app.get("/api/widget-item-config/SEARCH_ENGINES", (req, res, next) => {
  res.send(ReportOptions.data);
});
app.get("/api/widget-item-config/MARKETING_VENDORS", (req, res, next) => {
  res.send(ReportOptions.data);
});
app.get("/api/widget-item-config/RECENT_ITEMS", (req, res, next) => {
  res.send(ReportOptions.data);
});



app.put("/api/dashboards/:id", (req, res, next) => {
  console.log("PUT dashboard........................................");
  const data = req.body;
  data.widgets = data.widgets.map((el) => {
    if (!el.id) {
      el.id = Math.floor(Math.random() * 10000000);
    }
    el.widgetItems.map((el1) => {
      if (!el1.id) {
        el1.id = Math.floor(Math.random() * 10000000);
      }
      return el1;
    });
    return el;
  });
  dashboardsData.data[req.params.id] = req.body;
  res.send(req.body);
});
*/
// app.post("/api/dashboards", (req, res, next) => {
//   console.log("POST dashboard........................................");
//   const data = req.body;
//   data.widgets = data.widgets.map(el => {
//     if (!el.id) {
//       el.id = Math.floor(Math.random() * 10000000);
//     }
//     el.widgetItems.map(el1 => {
//       if (!el1.id) {
//         el1.id = Math.floor(Math.random() * 10000000);
//       }
//       return el1;
//     });
//     return el;
//   });
//   const randDashboardId = Math.floor(Math.random() * 10000000);
//   data.id = randDashboardId;
//   dashboardsData.data[randDashboardId] = data;
//   res.send(req.body);
// });
/*
app.post("/api/report-data", (req, res, next) => {
  res.send({
    data: ReportData[req.body.type],
  });
});
*/
/*app.get("/report-details/:reportType", (req, res, next) => {
  res.send(metricsData.data[req.params.reportType]);
});

/*app.get("/report-line/:id", (req, res, next) => {
  const arr = new Array(10).fill(1);
  res.send({
    cols: ["item", "value"],
    values: arr.map((_, index) => [
      `item-${index + 1}`,
      Math.ceil(Math.random() * 100)
    ])
  });
});*/

/*
app.post("/api/kpi", (req, res, next) => {
  const { visualization, last24Hours, projected, metrics } = req.body;

  const data = metrics.map(metric => ({
    metricId: metric,
    actualData: UtilsService.getActualDateArray(visualization, last24Hours),
    projectedData: projected ? UtilsService.getProjectedDateArray(visualization) : null
  }));
  res.send({ data });
});
 */

/*
app.get("/bar-chart/:id", (req, res, next) => {
  const arr = new Array(10).fill(1);
  res.send({
    cols: ["item", "value"],
    values: arr.map((_, index) => [
      `item-${index + 1}`,
      Math.ceil(Math.random() * 100)
    ])
  });
});
*/

/*
app.get("/conversion-funnel/:id", (req, res, next) => {
  const arr = new Array(4).fill(1);
  const initialMin = Math.ceil(Math.random() * 50) + 10;
  const initialMax = Math.ceil(Math.random() * 100) + 200;
  const data = arr.map((_, index, arr) => {
    let val = 1;
    switch (index) {
      case 0:
        val = initialMin;
        break;
      case arr.length - 1:
        val = initialMax;
        break;
      case 1:
        val = Math.ceil(Math.random() * 50) + 50;
        break;
      case 2:
        val = Math.ceil(Math.random() * 100) + 100;
        break;
    }
    return {
      name: `Step-${arr.length - index}`,
      label: `${val}k/${UtilsService.getPercents(val, initialMax)}%`,
      value: val
    };
  });

  res.send(data.reverse());
});
*/
/*
app.get("/api/widget-item-config/:type", (req, res, next) => {
  res.send({"metrics":{"LINE":[{"metricId":"AverageOrderValue","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"AverageSessionLength","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"AvgItemsInShoppingCart","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"BuyingSessionsCompleted","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"BuyingSessionsPerSession","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"ItemsPerOrder","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"MmcSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"NumberOfAbandonedShoppingCarts","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"OnsiteSearchesPerSession","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"PageViewsPerSession","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"ProductViewsPerSession","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"ShippingPerOrder","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"TotalConversionPoints","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionsCompleted","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionsInitiated","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalDirectLoadSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalElementViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalItemsOrdered","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalNaturalSearchSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalNewSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOnSiteSearch","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOnePageSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOrders","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalPageViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalProductViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalReferralSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalRepeatedSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalSales","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalShipping","cumulative":false,"last24Hours":true,"projected":true}],"PROGRESS":[{"metricId":"BuyingSessionsCompleted","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"MmcSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionPoints","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionsCompleted","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionsInitiated","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalDirectLoadSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalElementViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalItemsOrdered","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalNaturalSearchSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalNewSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOnSiteSearch","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOnePageSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOrders","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalPageViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalProductViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalReferralSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalRepeatedSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalSales","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalShipping","cumulative":false,"last24Hours":false,"projected":false}],"BAR":[{"metricId":"BuyingSessionsCompleted","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"MmcSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionPoints","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionsCompleted","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionsInitiated","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalDirectLoadSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalElementViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalItemsOrdered","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalNaturalSearchSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalNewSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOnSiteSearch","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOnePageSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOrders","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalPageViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalProductViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalReferralSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalRepeatedSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalSales","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalShipping","cumulative":true,"last24Hours":true,"projected":true}],"NUMBER":[{"metricId":"AverageOrderValue","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"AverageSessionLength","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"AvgItemsInShoppingCart","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"BuyingSessionsCompleted","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"BuyingSessionsPerSession","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"ItemsPerOrder","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"MmcSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"NumberOfAbandonedShoppingCarts","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"OnsiteSearchesPerSession","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"PageViewsPerSession","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"ProductViewsPerSession","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"ShippingPerOrder","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionPoints","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionsCompleted","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionsInitiated","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalDirectLoadSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalElementViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalItemsOrdered","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalNaturalSearchSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalNewSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOnSiteSearch","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOnePageSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOrders","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalPageViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalProductViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalReferralSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalRepeatedSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalSales","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalShipping","cumulative":false,"last24Hours":false,"projected":false}]}});
});
*/
/*
app.get("/api/recent-items", (req, res, next) => {
  res.send({
    data: [
      `data ${(Math.random() * 100000).toFixed(2)}`,
      `data ${(Math.random() * 100000).toFixed(2)}`,
      `data ${(Math.random() * 100000).toFixed(2)}`,
      `data ${(Math.random() * 100000).toFixed(2)}`,
      `data ${(Math.random() * 100000).toFixed(2)}`,
      `data ${(Math.random() * 100000).toFixed(2)}`,
    ]
  });
});
*/
/*
app.post("/api/reports/ed", (req, res, next) => {
  res.send({
    columnsOrder: [
      "ConversionEventCategoryId",
      "ConversionEventId",
      "TotalConversionPoints",
      "TotalConversionsInitiated",
      "TotalConversionsCompleted",
    ],
    data: [
      {
        TotalConversionPoints: 13900.0,
        ConversionEventId: "set email alerts",
        TotalConversionsCompleted: 24.0,
        TotalConversionsInitiated: 24.0,
        ConversionEventCategoryId: "category9",
      },
      {
        TotalConversionPoints: 12800.0,
        ConversionEventId: "sign up for webinar",
        TotalConversionsCompleted: 23.0,
        TotalConversionsInitiated: 23.0,
        ConversionEventCategoryId: "category1",
      },
      {
        TotalConversionPoints: 12100.0,
        ConversionEventId: "special registration",
        TotalConversionsCompleted: 21.0,
        TotalConversionsInitiated: 21.0,
        ConversionEventCategoryId: "category9",
      },
      {
        TotalConversionPoints: 10900.0,
        ConversionEventId: "newsletter signup",
        TotalConversionsCompleted: 20.0,
        TotalConversionsInitiated: 20.0,
        ConversionEventCategoryId: "category6",
      },
      {
        TotalConversionPoints: 10900.0,
        ConversionEventId: "set email alerts",
        TotalConversionsCompleted: 20.0,
        TotalConversionsInitiated: 20.0,
        ConversionEventCategoryId: "category4",
      },
    ],
  });
});
*/

app.get("/api/widget-item-config/ED_REPORT", (req, res, next) => {
  res.send(
    {"metrics":{"ED_TOPLINE_SUMMARY":[{"metricId":"NumberOfAbandonedShoppingCarts","preSelected":false},{"metricId":"AvgItemsInShoppingCart","preSelected":false},{"metricId":"AverageNewSessionLength","preSelected":false},{"metricId":"AverageOrderValue","preSelected":true},{"metricId":"AverageRepeatSessionLength","preSelected":false},{"metricId":"AverageSessionLength","preSelected":false},{"metricId":"ShippingPerOrder","preSelected":false},{"metricId":"AverageTimePerPage","preSelected":false},{"metricId":"BounceRate","preSelected":true},{"metricId":"BuyingSessionsCompleted","preSelected":true},{"metricId":"TotalConversionPoints","preSelected":false},{"metricId":"EventsPointsPerSession","preSelected":false},{"metricId":"EventsPerSession","preSelected":false},{"metricId":"TotalConversionsCompleted","preSelected":false},{"metricId":"ItemAbandonmentRate","preSelected":false},{"metricId":"TotalItemsInShoppingCart","preSelected":false},{"metricId":"TotalItemsOrdered","preSelected":false},{"metricId":"TotalOnSiteSearch","preSelected":true},{"metricId":"TotalOrders","preSelected":false},{"metricId":"OrdersPerSession","preSelected":false},{"metricId":"TotalPageViews","preSelected":false},{"metricId":"PageViewsPerSession","preSelected":false},{"metricId":"TotalProductViews","preSelected":false},{"metricId":"TotalSales","preSelected":true},{"metricId":"TotalSessions","preSelected":true},{"metricId":"TotalShipping","preSelected":false},{"metricId":"ShoppingCartAbandonmentRate","preSelected":false},{"metricId":"TotalTrackedItemsOrdered","preSelected":false},{"metricId":"TotalTrackedOrders","preSelected":false},{"metricId":"TotalTrackedPageViews","preSelected":false},{"metricId":"TotalTrackedProductViews","preSelected":false},{"metricId":"TotalTrackedSales","preSelected":false},{"metricId":"TotalTrackedShipping","preSelected":false},{"metricId":"TotalBuyers","preSelected":false},{"metricId":"TotalVisitors","preSelected":false}],"ED_CHANNELS_SUMMARY":[{"metricId":"TotalSales","attribution":true,"preSelected":true},{"metricId":"TotalShipping","attribution":true,"preSelected":false},{"metricId":"AverageShipping","attribution":true,"preSelected":false},{"metricId":"TotalSessions","attribution":true,"preSelected":true},{"metricId":"BuyingSessionsCompleted","attribution":true,"preSelected":true},{"metricId":"TotalOrders","attribution":true,"preSelected":false},{"metricId":"AverageOrderValue","attribution":true,"preSelected":true},{"metricId":"AverageSessionLength","attribution":true,"preSelected":false},{"metricId":"TotalPageViews","attribution":true,"preSelected":false},{"metricId":"PageViewsPerSession","attribution":false,"preSelected":false},{"metricId":"TotalOnePageSessions","attribution":true,"preSelected":false},{"metricId":"BounceRate","attribution":true,"preSelected":true},{"metricId":"Events","attribution":true,"preSelected":false},{"metricId":"EventSessions","attribution":true,"preSelected":false},{"metricId":"TotalConversionPoints","attribution":true,"preSelected":false},{"metricId":"EventsPointsPerSession","attribution":false,"preSelected":false},{"metricId":"TargetSales","attribution":true,"preSelected":false},{"metricId":"TotalBuyers","attribution":true,"preSelected":false},{"metricId":"NewBuyers","attribution":true,"preSelected":false},{"metricId":"NewBuyerSales","attribution":true,"preSelected":false},{"metricId":"TotalVisitors","attribution":true,"preSelected":false},{"metricId":"NewVisitors","attribution":true,"preSelected":false}]},"attributions":[
        { id: 108, direction: "BACKWARD", duration: -1, method: "LAST_CLICK" },
        { id: 109, direction: "BACKWARD", duration: 1, method: "LAST_CLICK" },
        { id: 130, direction: "FORWARD", duration: 11, method: "AVERAGE_CLICK" },
        { id: 134, direction: "BACKWARD", duration: 16, method: "LAST_CLICK" },
        { id: 173, direction: "BACKWARD", duration: 9, method: "FIRST_CLICK" },
        { id: 174, direction: "BACKWARD", duration: 12, method: "FIRST_CLICK" },
        { id: 175, direction: "FORWARD", duration: 13, method: "FIRST_CLICK" },
        { id: 176, direction: "FORWARD", duration: 7, method: "LAST_CLICK" },
      ]}
  )
});

/*
app.post("/api/reports/multisite/channel-summary", (req, res, next) => {
  console.log('------------------------------');
  res.send(
    {"singleAttributionMetrics":[{"metricId":"TotalSales","attributionModelId":108},{"metricId":"TotalSessions","attributionModelId":108},{"metricId":"BuyingSessionsCompleted","attributionModelId":108},{"metricId":"AverageOrderValue","attributionModelId":108},{"metricId":"BounceRate","attributionModelId":108}],"values":{"All Other MMC Vendors":{"30000001":[324,55,885,32,8],"30004001":[55222,55,84585,32,4448],"TOTAL_SELECTED":[66,442,null,null,445],"30000003":[null,null,null,null,null],"TOTAL_MASTER":[null,null,null,null,null]},"Direct Load Activity":{"30000001":[null,null,null,null,null],"30004001":[null,null,null,null,null],"TOTAL_SELECTED":[null,null,null,null,null],"30000003":[null,null,null,null,null],"TOTAL_MASTER":[null,null,null,null,null]},"Referring Sites Activity":{"30000001":[null,null,null,null,null],"30004001":[null,null,null,null,null],"TOTAL_SELECTED":[null,null,null,null,null],"30000003":[null,null,null,null,null],"TOTAL_MASTER":[null,null,null,null,null]},"Natural Search Activity":{"30000001":[null,null,null,null,null],"30004001":[null,null,null,null,null],"TOTAL_SELECTED":[null,null,null,null,null],"30000003":[null,null,null,null,null],"TOTAL_MASTER":[null,null,null,null,null]}}}
  )
});
*/

// app.get("/api/config/view/dashboard/:dashboardId", (req, res, next) => {
//   res.send(
//     [
//       {
//         "id": 1,
//         "selected": true,
//         "dashboardId": 20,
//         "name": "view 001"
//       },
//       {
//         "id": 2,
//         "selected": false,
//         "dashboardId": 20,
//         "name": "view 002"
//       },
//       {
//         "id": 3,
//         "selected": true,
//         "dashboardId": 20,
//         "name": "view 003"
//       },
//     ]
//   )
// })

const fiscalData = {"code":0,"CalendarDefinition":{"calendarData":{"weeks":{"data":[20120101,20120108,20120115,20120122,20120129,20120205,20120212,20120219,20120226,20120304,20120311,20120318,20120325,20120401,20120408,20120415,20120422,20120429,20120506,20120513,20120520,20120527,20120603,20120610,20120617,20120624,20120701,20120708,20120715,20120722,20120729,20120805,20120812,20120819,20120826,20120902,20120909,20120916,20120923,20120930,20121007,20121014,20121021,20121028,20121104,20121111,20121118,20121125,20121202,20121209,20121216,20121223,20121230,20130101,20130106,20130113,20130120,20130127,20130203,20130210,20130217,20130224,20130303,20130310,20130317,20130324,20130331,20130407,20130414,20130421,20130428,20130505,20130512,20130519,20130526,20130602,20130609,20130616,20130623,20130630,20130707,20130714,20130721,20130728,20130804,20130811,20130818,20130825,20130901,20130908,20130915,20130922,20130929,20131006,20131013,20131020,20131027,20131103,20131110,20131117,20131124,20131201,20131208,20131215,20131222,20131229,20140101,20140105,20140112,20140119,20140126,20140202,20140209,20140216,20140223,20140302,20140309,20140316,20140323,20140330,20140406,20140413,20140420,20140427,20140504,20140511,20140518,20140525,20140601,20140608,20140615,20140622,20140629,20140706,20140713,20140720,20140727,20140803,20140810,20140817,20140824,20140831,20140907,20140914,20140921,20140928,20141005,20141012,20141019,20141026,20141102,20141109,20141116,20141123,20141130,20141207,20141214,20141221,20141228,20150101,20150104,20150111,20150118,20150125,20150201,20150208,20150215,20150222,20150301,20150308,20150315,20150322,20150329,20150405,20150412,20150419,20150426,20150503,20150510,20150517,20150524,20150531,20150607,20150614,20150621,20150628,20150705,20150712,20150719,20150726,20150802,20150809,20150816,20150823,20150830,20150906,20150913,20150920,20150927,20151004,20151011,20151018,20151025,20151101,20151108,20151115,20151122,20151129,20151206,20151213,20151220,20151227,20160101,20160103,20160110,20160117,20160124,20160131,20160207,20160214,20160221,20160228,20160306,20160313,20160320,20160327,20160403,20160410,20160417,20160424,20160501,20160508,20160515,20160522,20160529,20160605,20160612,20160619,20160626,20160703,20160710,20160717,20160724,20160731,20160807,20160814,20160821,20160828,20160904,20160911,20160918,20160925,20161002,20161009,20161016,20161023,20161030,20161106,20161113,20161120,20161127,20161204,20161211,20161218,20161225,20170101,20170108,20170115,20170122,20170129,20170205,20170212,20170219,20170226,20170305,20170312,20170319,20170326,20170402,20170409,20170416,20170423,20170430,20170507,20170514,20170521,20170528,20170604,20170611,20170618,20170625,20170702,20170709,20170716,20170723,20170730,20170806,20170813,20170820,20170827,20170903,20170910,20170917,20170924,20171001,20171008,20171015,20171022,20171029,20171105,20171112,20171119,20171126,20171203,20171210,20171217,20171224,20171231,20180101,20180107,20180114,20180121,20180128,20180204,20180211,20180218,20180225,20180304,20180311,20180318,20180325,20180401,20180408,20180415,20180422,20180429,20180506,20180513,20180520,20180527,20180603,20180610,20180617,20180624,20180701,20180708,20180715,20180722,20180729,20180805,20180812,20180819,20180826,20180902,20180909,20180916,20180923,20180930,20181007,20181014,20181021,20181028,20181104,20181111,20181118,20181125,20181202,20181209,20181216,20181223,20181230,20190101,20190106,20190113,20190120,20190127,20190203,20190210,20190217,20190224,20190303,20190310,20190317,20190324,20190331,20190407,20190414,20190421,20190428,20190505,20190512,20190519,20190526,20190602,20190609,20190616,20190623,20190630,20190707,20190714,20190721,20190728,20190804,20190811,20190818,20190825,20190901,20190908,20190915,20190922,20190929,20191006,20191013,20191020,20191027,20191103,20191110,20191117,20191124,20191201,20191208,20191215,20191222,20191229,20200101,20200105,20200112,20200119,20200126,20200202,20200209,20200216,20200223,20200301,20200308,20200315,20200322,20200329,20200405,20200412,20200419,20200426,20200503,20200510,20200517,20200524,20200531,20200607,20200614,20200621,20200628,20200705,20200712,20200719,20200726,20200802,20200809,20200816,20200823,20200830,20200906,20200913,20200920,20200927,20201004,20201011,20201018,20201025,20201101,20201108,20201115,20201122,20201129,20201206,20201213,20201220,20201227,20210101,20210103,20210110,20210117,20210124,20210131,20210207,20210214,20210221,20210228,20210307,20210314,20210321,20210328,20210404,20210411,20210418,20210425,20210502,20210509,20210516,20210523,20210530,20210606,20210613,20210620,20210627,20210704,20210711,20210718,20210725,20210801,20210808,20210815,20210822,20210829,20210905,20210912,20210919,20210926,20211003,20211010,20211017,20211024,20211031,20211107,20211114,20211121,20211128,20211205,20211212,20211219,20211226,20220101,20220102,20220109,20220116,20220123,20220130,20220206,20220213,20220220,20220227,20220306,20220313,20220320,20220327,20220403,20220410,20220417,20220424,20220501,20220508,20220515,20220522,20220529,20220605,20220612,20220619,20220626,20220703,20220710,20220717,20220724,20220731,20220807,20220814,20220821,20220828,20220904,20220911,20220918,20220925,20221002,20221009,20221016,20221023,20221030,20221106,20221113,20221120,20221127,20221204,20221211,20221218,20221225,20230101]},"months":{"data":[20120101,20120201,20120301,20120401,20120501,20120601,20120701,20120801,20120901,20121001,20121101,20121201,20130101,20130201,20130301,20130401,20130501,20130601,20130701,20130801,20130901,20131001,20131101,20131201,20140101,20140201,20140301,20140401,20140501,20140601,20140701,20140801,20140901,20141001,20141101,20141201,20150101,20150201,20150301,20150401,20150501,20150601,20150701,20150801,20150901,20151001,20151101,20151201,20160101,20160201,20160301,20160401,20160501,20160601,20160701,20160801,20160901,20161001,20161101,20161201,20170101,20170201,20170301,20170401,20170501,20170601,20170701,20170801,20170901,20171001,20171101,20171201,20180101,20180201,20180301,20180401,20180501,20180601,20180701,20180801,20180901,20181001,20181101,20181201,20190101,20190201,20190301,20190401,20190501,20190601,20190701,20190801,20190901,20191001,20191101,20191201,20200101,20200201,20200301,20200401,20200501,20200601,20200701,20200801,20200901,20201001,20201101,20201201,20210101,20210201,20210301,20210401,20210501,20210601,20210701,20210801,20210901,20211001,20211101,20211201,20220101,20220201,20220301,20220401,20220501,20220601,20220701,20220801,20220901,20221001,20221101,20221201,20230101],"startId":201201},"quarters":{"data":[20120101,20120401,20120701,20121001,20130101,20130401,20130701,20131001,20140101,20140401,20140701,20141001,20150101,20150401,20150701,20151001,20160101,20160401,20160701,20161001,20170101,20170401,20170701,20171001,20180101,20180401,20180701,20181001,20190101,20190401,20190701,20191001,20200101,20200401,20200701,20201001,20210101,20210401,20210701,20211001,20220101,20220401,20220701,20221001,20230101],"startId":20121},"years":{"yearStartMonths":[1,1,1,1,1,1,1,1,1,1,1],"firstDayOfWeeks":[1,1,1,1,1,1,1,1,1,1,1],"data":[20120101,20130101,20140101,20150101,20160101,20170101,20180101,20190101,20200101,20210101,20220101,20230101],"yearIds":[2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],"yearStartDates":[20120101,20130101,20140101,20150101,20160101,20170101,20180101,20190101,20200101,20210101,20220101],"yearCountMonths":[12,12,12,12,12,12,12,12,12,12,12],"nonStandard":[false,false,false,false,false,false,false,false,false,false,false],"startId":2012}},"guid":"cme-calendardefinition-30000009-STANDARD-2012-12","type":"STANDARD"}}
app.get("/api/calendar", (req, res, next) => res.send(fiscalData));


const test = {"data":[{"metricId":"TotalConversionPoints","actualData":[{"time":1594270800000,"value":42340.0},{"time":1594274400000,"value":69530.0},{"time":1594278000000,"value":40890.0},{"time":1594281600000,"value":70540.0},{"time":1594285200000,"value":40580.0},{"time":1594288800000,"value":71470.0},{"time":1594292400000,"value":41800.0},{"time":1594296000000,"value":69160.0},{"time":1594299600000,"value":42810.0},{"time":1594303200000,"value":70710.0},{"time":1594306800000,"value":39110.0},{"time":1594310400000,"value":68340.0},{"time":1594314000000,"value":24550.0}],"projectedData":[]}]};
app.post("/rtm/api/kpi/realtime", (req, res, next) => res.send(test));

const defaultRoute = (req, res, next) => {
  //const newUrl = "rtmctl1.dev02.ue1.da.dev-digitalanalytics.awsnp:8080";
  const newUrl = "http://10.239.169.188:8080";
  //const newUrl = 'https://da-dev-dev02-app-alb-1234159438.us-east-1.elb.amazonaws.com';
  console.log(`proxy to ${newUrl}${req.originalUrl}...`);
  request({
    method: req.method,
    uri: `${newUrl}${req.originalUrl}`,
    json: req.body,
    headers: req.headers,
  }).pipe(res);
};
app.get("*", defaultRoute);
app.post("*", defaultRoute);
app.put("*", defaultRoute);
app.delete("*", defaultRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
