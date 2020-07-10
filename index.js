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

app.get("/api/logout", (req, res, next) => {
  return res.status(200).json({ 'code':200, 'message':'success' });
});

app.get("/api/loggedinuser", (req, res, next) => {
  return res.status(200).json(
    { 
      "code":200,
      "LoggedInUser": {
        "email": "stubuser@us.ibm.com",
        "name": "Stub User",
        "locale": "en_US",
        "clientId": 59000000,
        "masterSubClientIds": {
          "59000000": "Stub client",
          "30000001": "Some obnoxiously long site alias that should never have been allowed to exist",
          "30004001": "QA Content Commerce"
        }
      }
    }
  );
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

/*
app.get('/api/dashboards/config/tree-simplified', async (req, res, next) => {
  console.log('invoked tree config request');

  try {
    const dashboards = await axios.get('http://10.239.169.188:8080/api/dashboards', {
      headers: req.headers
    }).then((response) => response.data);
    const applications = ['REALTIME_DASHBOARD', 'ENTERPRISE_DASHBOARD', 'NO_APPLICATION'];
    const categories = ["STANDARD",
      "SHARED",
      "PERSONAL",
      "PUBLIC",
      "ADMIN"];
  
    const result = applications.map(application => ({
      applicationType: application,
      categories: categories.map(category => ({
        id: category,
        name: category,
        type: category,
        applicationType: application,
        dashboards: dashboards.filter(({dashboardType, id, title}) =>{
          const isApp = dashboardType === application;
          const isStandard = title.includes('STANDARD');
          const isShared = title.includes('SHARED');
          const isPublic = title.includes('PUBLIC');
          const isAdmin = title.includes('ADMIN');
          // TODO... SELF_CREATED;
          const isPersonal = !isStandard && !isShared && !isPublic && !isAdmin;
          if (title.includes(category) && isApp) {
            return true;
          }
          if (isApp && category === 'PERSONAL' && !isStandard && !isShared && !isPublic && !isAdmin) {
            return true;
          }
          return false;
        }).map(({id, title, type}) => ({id, name: title, type, applicationType: application }))
      }))
    }));

    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

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
/*
app.get("/api/config/view/dashboard/:dashboardId", (req, res, next) => {
  res.send(
    [
      {
        "id": 1,
        "selected": false,
        "dashboardId": 74,
        "name": "view 001"
      },
      {
        "id": 2,
        "selected": true,
        "dashboardId": 79,
        "name": "view 002"
      },
      {
        "id": 3,
        "selected": false,
        "dashboardId": 76,
        "name": "view 003"
      },
    ]
  )
})
*/

const metricConfigs = [{"metricId":"AverageEventPoints","metricType":"DECIMAL"},{"metricId":"AverageEventPoints_media","metricType":"DECIMAL"},{"metricId":"AverageItemPrice","metricType":"CURRENCY"},{"metricId":"AverageNewSessionLength","metricType":"DURATION"},{"metricId":"AverageOrderValue","metricType":"CURRENCY"},{"metricId":"AverageRepeatSessionLength","metricType":"DURATION"},{"metricId":"AverageSessionLength","metricType":"DURATION"},{"metricId":"AverageShipping","metricType":"CURRENCY"},{"metricId":"AverageTimePerPage","metricType":"DURATION"},{"metricId":"AvgItemsInShoppingCart","metricType":"DECIMAL"},{"metricId":"BROWSER_AOL","metricType":"INTEGER"},{"metricId":"BROWSER_AOL_Percent","metricType":"PERCENT"},{"metricId":"BROWSER_Chrome","metricType":"INTEGER"},{"metricId":"BROWSER_Chrome_Percent","metricType":"PERCENT"},{"metricId":"BROWSER_Firefox","metricType":"INTEGER"},{"metricId":"BROWSER_Firefox_Percent","metricType":"PERCENT"},{"metricId":"BROWSER_IE","metricType":"INTEGER"},{"metricId":"BROWSER_IE_Percent","metricType":"PERCENT"},{"metricId":"BROWSER_Konqueror","metricType":"INTEGER"},{"metricId":"BROWSER_Konqueror_Percent","metricType":"PERCENT"},{"metricId":"BROWSER_Mozilla","metricType":"INTEGER"},{"metricId":"BROWSER_Mozilla_Percent","metricType":"PERCENT"},{"metricId":"BROWSER_Netscape","metricType":"INTEGER"},{"metricId":"BROWSER_Netscape_Percent","metricType":"PERCENT"},{"metricId":"BROWSER_Netsurf","metricType":"INTEGER"},{"metricId":"BROWSER_Netsurf_Percent","metricType":"PERCENT"},{"metricId":"BROWSER_Opera","metricType":"INTEGER"},{"metricId":"BROWSER_Opera_Percent","metricType":"PERCENT"},{"metricId":"BROWSER_Safari","metricType":"INTEGER"},{"metricId":"BROWSER_Safari_Percent","metricType":"PERCENT"},{"metricId":"Bottom10ProductsToday","metricType":"STRING"},{"metricId":"Bottom10ProductsYesterday","metricType":"STRING"},{"metricId":"Bottom10SearchEnginesToday","metricType":"STRING"},{"metricId":"Bottom10SearchEnginesYesterday","metricType":"STRING"},{"metricId":"Bottom10VendorsToday","metricType":"STRING"},{"metricId":"Bottom10VendorsYesterday","metricType":"STRING"},{"metricId":"BounceRate","metricType":"PERCENT"},{"metricId":"BrowsingSessionsPercent","metricType":"PERCENT"},{"metricId":"BuyingSessionsCompleted","metricType":"INTEGER"},{"metricId":"BuyingSessionsPerSession","metricType":"PERCENT"},{"metricId":"BuyingSessionsPercent","metricType":"PERCENT"},{"metricId":"CategoryId","metricType":"STRING"},{"metricId":"ChannelSummaryToday","metricType":"STRING"},{"metricId":"ChannelSummaryYesterday","metricType":"STRING"},{"metricId":"ConversionEventCategoryId","metricType":"STRING"},{"metricId":"ConversionEventCategoryId_media","metricType":"STRING"},{"metricId":"ConversionEventId","metricType":"STRING"},{"metricId":"ConversionEventIdAndCategory_media","metricType":"STRING"},{"metricId":"ConversionEventId_media","metricType":"STRING"},{"metricId":"ConversionRate","metricType":"PERCENT"},{"metricId":"DirectChannelOrdersCompleted","metricType":"INTEGER"},{"metricId":"DirectChannelSalesCompleted","metricType":"CURRENCY"},{"metricId":"DirectChannelShipingsCompleted","metricType":"CURRENCY"},{"metricId":"DirectChannelsCompleted","metricType":"INTEGER"},{"metricId":"DirectConvComplSes","metricType":"PERCENT"},{"metricId":"DirectLoadSessionsPercentOfTotal","metricType":"PERCENT"},{"metricId":"DirectSessionsPercentOfSales","metricType":"PERCENT"},{"metricId":"EventPointsPercentOfTotal","metricType":"PERCENT"},{"metricId":"EventSessions","metricType":"INTEGER"},{"metricId":"Events","metricType":"INTEGER"},{"metricId":"EventsCategory","metricType":"STRING"},{"metricId":"EventsCategory_media","metricType":"STRING"},{"metricId":"EventsName","metricType":"STRING"},{"metricId":"EventsName_media","metricType":"STRING"},{"metricId":"EventsPerSession","metricType":"PERCENT"},{"metricId":"EventsPointsPerSession","metricType":"DECIMAL"},{"metricId":"ItemAbandonmentRate","metricType":"PERCENT"},{"metricId":"ItemId","metricType":"STRING"},{"metricId":"ItemsPerOrder","metricType":"DECIMAL"},{"metricId":"ItemsSold","metricType":"INTEGER"},{"metricId":"Last10NaturalSearchItems","metricType":"STRING"},{"metricId":"Last10OnSiteSearchTerms","metricType":"STRING"},{"metricId":"Last10OnsiteSearches","metricType":"STRING"},{"metricId":"Last10PagesBrowsed","metricType":"STRING"},{"metricId":"Last10ProductsBrowsed","metricType":"STRING"},{"metricId":"Last10ProductsSold","metricType":"STRING"},{"metricId":"Last10ReferralSources","metricType":"STRING"},{"metricId":"MmcChannelCompleted","metricType":"INTEGER"},{"metricId":"MmcChannelOrdersCompleted","metricType":"INTEGER"},{"metricId":"MmcChannelSalesCompleted","metricType":"CURRENCY"},{"metricId":"MmcChannelShipingsCompleted","metricType":"CURRENCY"},{"metricId":"MmcClicks","metricType":"INTEGER"},{"metricId":"MmcClicksCompleted","metricType":"INTEGER"},{"metricId":"MmcConvComplSes","metricType":"PERCENT"},{"metricId":"MmcOrders","metricType":"INTEGER"},{"metricId":"MmcOrdersCompleted","metricType":"INTEGER"},{"metricId":"MmcRevenue","metricType":"CURRENCY"},{"metricId":"MmcRevenueCompleted","metricType":"INTEGER"},{"metricId":"MmcSessions","metricType":"INTEGER"},{"metricId":"MmcSessionsCompleted","metricType":"INTEGER"},{"metricId":"MmcSessionsPercentOfSales","metricType":"PERCENT"},{"metricId":"MmcSessionsPercentOfTotal","metricType":"PERCENT"},{"metricId":"MmcShipping","metricType":"CURRENCY"},{"metricId":"MmcShippingHandlingCompleted","metricType":"INTEGER"},{"metricId":"MmcVendors","metricType":"INTEGER"},{"metricId":"MobileAverageSessionLength","metricType":"DURATION"},{"metricId":"MobileBounceRate","metricType":"PERCENT"},{"metricId":"MobileConvComplSes","metricType":"PERCENT"},{"metricId":"MobilePageViewsPerSession","metricType":"DECIMAL"},{"metricId":"MobileSessionsPercentOfSales","metricType":"PERCENT"},{"metricId":"MobileSessionsPercentOfTotal","metricType":"PERCENT"},{"metricId":"NaturalSearchSessionsPercentOfTotal","metricType":"PERCENT"},{"metricId":"NewBuyerSales","metricType":"CURRENCY"},{"metricId":"NewBuyers","metricType":"INTEGER"},{"metricId":"NewSessionsPercent","metricType":"PERCENT"},{"metricId":"NewVisitorConvPct","metricType":"PERCENT"},{"metricId":"NewVisitors","metricType":"INTEGER"},{"metricId":"NumberOfAbandonedShoppingCarts","metricType":"INTEGER"},{"metricId":"NumberOfShoppingCarts","metricType":"INTEGER"},{"metricId":"OnsiteSearchAvgOrderValue","metricType":"CURRENCY"},{"metricId":"OnsiteSearchConvPct","metricType":"PERCENT"},{"metricId":"OnsiteSearchesPerSession","metricType":"PERCENT"},{"metricId":"OnsiteSearchesSessionPercent","metricType":"PERCENT"},{"metricId":"OrderedShoppingCartItems","metricType":"INTEGER"},{"metricId":"OrdersPerSession","metricType":"PERCENT"},{"metricId":"PageViewsPerSession","metricType":"DECIMAL"},{"metricId":"PaidSearchSessionsPercentOfSales","metricType":"PERCENT"},{"metricId":"PaidSearchSessionsPercentOfTotal","metricType":"PERCENT"},{"metricId":"PaidSrchConvComplSes","metricType":"PERCENT"},{"metricId":"PercentTotalConversionPoints_media","metricType":"PERCENT"},{"metricId":"PercentTotalConversionsCompleted_media","metricType":"PERCENT"},{"metricId":"PercentTotalConversionsInitiated_media","metricType":"PERCENT"},{"metricId":"PlacementId","metricType":"STRING"},{"metricId":"ProductId","metricType":"STRING"},{"metricId":"ProductViewsPerSession","metricType":"DECIMAL"},{"metricId":"RefConvComplSes","metricType":"PERCENT"},{"metricId":"ReferralChannelOrdersCompleted","metricType":"INTEGER"},{"metricId":"ReferralChannelSalesCompleted","metricType":"CURRENCY"},{"metricId":"ReferralChannelShipingsCompleted","metricType":"CURRENCY"},{"metricId":"ReferralChannelsCompleted","metricType":"INTEGER"},{"metricId":"ReferralSessionsPercentOfSales","metricType":"PERCENT"},{"metricId":"RefferalSessionsPercentOfTotal","metricType":"PERCENT"},{"metricId":"RepeatesSessionsPercent","metricType":"PERCENT"},{"metricId":"SearchChannelCompleted","metricType":"INTEGER"},{"metricId":"SearchChannelOrdersCompleted","metricType":"INTEGER"},{"metricId":"SearchChannelSalesCompleted","metricType":"CURRENCY"},{"metricId":"SearchChannelShipingsCompleted","metricType":"CURRENCY"},{"metricId":"SearchEngines","metricType":"STRING"},{"metricId":"SearchOrdersCompleted","metricType":"INTEGER"},{"metricId":"SearchRevenueCompleted","metricType":"INTEGER"},{"metricId":"SearchSessionsCompleted","metricType":"INTEGER"},{"metricId":"SearchSessionsPercentOfSales","metricType":"PERCENT"},{"metricId":"SearchShippingHandlingCompleted","metricType":"INTEGER"},{"metricId":"ShippingPerOrder","metricType":"CURRENCY"},{"metricId":"ShopCartConvPct","metricType":"PERCENT"},{"metricId":"ShoppingCartAbandonmentRate","metricType":"PERCENT"},{"metricId":"ShoppingCartConversionRate","metricType":"PERCENT"},{"metricId":"ShoppingSessionsPercent","metricType":"PERCENT"},{"metricId":"SocialAverageSessionLength","metricType":"DURATION"},{"metricId":"SocialBounceRate","metricType":"PERCENT"},{"metricId":"SocialConvComplSes","metricType":"PERCENT"},{"metricId":"SocialPageViewsPerSession","metricType":"DECIMAL"},{"metricId":"SocialSessionsPercentOfSales","metricType":"PERCENT"},{"metricId":"SocialSessionsPercentOfTotal","metricType":"PERCENT"},{"metricId":"SoldItems","metricType":"INTEGER"},{"metricId":"SoldItemsNumber","metricType":"INTEGER"},{"metricId":"SoldItemsRevenue","metricType":"CURRENCY"},{"metricId":"SoldItemsSessions","metricType":"INTEGER"},{"metricId":"SrchConvComplSes","metricType":"PERCENT"},{"metricId":"TargetSales","metricType":"CURRENCY"},{"metricId":"Top10ProductsToday","metricType":"STRING"},{"metricId":"Top10ProductsYesterday","metricType":"STRING"},{"metricId":"Top10SearchEnginesToday","metricType":"STRING"},{"metricId":"Top10SearchEnginesYesterday","metricType":"STRING"},{"metricId":"Top10VendorsToday","metricType":"STRING"},{"metricId":"Top10VendorsYesterday","metricType":"STRING"},{"metricId":"TotalAnonymousItemsOrdered","metricType":"INTEGER"},{"metricId":"TotalAnonymousOrders","metricType":"INTEGER"},{"metricId":"TotalAnonymousPageViews","metricType":"INTEGER"},{"metricId":"TotalAnonymousProductViews","metricType":"INTEGER"},{"metricId":"TotalAnonymousSales","metricType":"CURRENCY"},{"metricId":"TotalAnonymousShipping","metricType":"CURRENCY"},{"metricId":"TotalBrowsSes","metricType":"INTEGER"},{"metricId":"TotalBuySes","metricType":"INTEGER"},{"metricId":"TotalBuyers","metricType":"INTEGER"},{"metricId":"TotalConversionPoints","metricType":"INTEGER"},{"metricId":"TotalConversionPoints_media","metricType":"INTEGER"},{"metricId":"TotalConversionsCompleted","metricType":"INTEGER"},{"metricId":"TotalConversionsCompleted_media","metricType":"INTEGER"},{"metricId":"TotalConversionsInitiated","metricType":"INTEGER"},{"metricId":"TotalConversionsInitiated_media","metricType":"INTEGER"},{"metricId":"TotalDirectLoadSessions","metricType":"INTEGER"},{"metricId":"TotalElementViews","metricType":"INTEGER"},{"metricId":"TotalItemsInShoppingCart","metricType":"INTEGER"},{"metricId":"TotalItemsOrdered","metricType":"INTEGER"},{"metricId":"TotalNaturalSearchSessions","metricType":"INTEGER"},{"metricId":"TotalNewDirectLoadSessions","metricType":"INTEGER"},{"metricId":"TotalNewMMCSessions","metricType":"INTEGER"},{"metricId":"TotalNewNaturalSearchSessions","metricType":"INTEGER"},{"metricId":"TotalNewReferralSessions","metricType":"INTEGER"},{"metricId":"TotalNewSessions","metricType":"INTEGER"},{"metricId":"TotalOnSiteSearch","metricType":"INTEGER"},{"metricId":"TotalOnePageSessions","metricType":"INTEGER"},{"metricId":"TotalOrders","metricType":"INTEGER"},{"metricId":"TotalPageViews","metricType":"INTEGER"},{"metricId":"TotalPaidSearchSessions","metricType":"INTEGER"},{"metricId":"TotalProductViews","metricType":"INTEGER"},{"metricId":"TotalReferralSessions","metricType":"INTEGER"},{"metricId":"TotalRepeatedDirectLoadSessions","metricType":"INTEGER"},{"metricId":"TotalRepeatedMMCSessions","metricType":"INTEGER"},{"metricId":"TotalRepeatedNaturalSearchSessions","metricType":"INTEGER"},{"metricId":"TotalRepeatedReferralSessions","metricType":"INTEGER"},{"metricId":"TotalRepeatedSessions","metricType":"INTEGER"},{"metricId":"TotalSales","metricType":"CURRENCY"},{"metricId":"TotalSessions","metricType":"INTEGER"},{"metricId":"TotalSessionsPercent","metricType":"PERCENT"},{"metricId":"TotalShipping","metricType":"CURRENCY"},{"metricId":"TotalShopSes","metricType":"INTEGER"},{"metricId":"TotalTrackedItemsOrdered","metricType":"INTEGER"},{"metricId":"TotalTrackedOnSiteSearch","metricType":"INTEGER"},{"metricId":"TotalTrackedOrders","metricType":"INTEGER"},{"metricId":"TotalTrackedPageViews","metricType":"INTEGER"},{"metricId":"TotalTrackedProductViews","metricType":"INTEGER"},{"metricId":"TotalTrackedSales","metricType":"CURRENCY"},{"metricId":"TotalTrackedShipping","metricType":"CURRENCY"},{"metricId":"TotalVisitors","metricType":"INTEGER"},{"metricId":"VendorId","metricType":"STRING"},{"metricId":"cumulativeBuyingSessionsCompleted","metricType":"INTEGER"},{"metricId":"cumulativeMmcSessions","metricType":"INTEGER"},{"metricId":"cumulativeTotalConversionPoints","metricType":"INTEGER"},{"metricId":"cumulativeTotalConversionsCompleted","metricType":"INTEGER"},{"metricId":"cumulativeTotalConversionsInitiated","metricType":"INTEGER"},{"metricId":"cumulativeTotalDirectLoadSessions","metricType":"INTEGER"},{"metricId":"cumulativeTotalElementViews","metricType":"INTEGER"},{"metricId":"cumulativeTotalItemsOrdered","metricType":"INTEGER"},{"metricId":"cumulativeTotalNaturalSearchSessions","metricType":"INTEGER"},{"metricId":"cumulativeTotalNewSessions","metricType":"INTEGER"},{"metricId":"cumulativeTotalOnSiteSearch","metricType":"INTEGER"},{"metricId":"cumulativeTotalOnePageSessions","metricType":"INTEGER"},{"metricId":"cumulativeTotalOrders","metricType":"INTEGER"},{"metricId":"cumulativeTotalPageViews","metricType":"INTEGER"},{"metricId":"cumulativeTotalProductViews","metricType":"INTEGER"},{"metricId":"cumulativeTotalReferralSessions","metricType":"INTEGER"},{"metricId":"cumulativeTotalRepeatedSessions","metricType":"INTEGER"},{"metricId":"cumulativeTotalSales","metricType":"CURRENCY"},{"metricId":"cumulativeTotalSessions","metricType":"INTEGER"},{"metricId":"currentBuyingSessionsCompleted","metricType":"INTEGER"},{"metricId":"currentMmcSessions","metricType":"INTEGER"},{"metricId":"currentNumberOfShoppingCarts","metricType":"INTEGER"},{"metricId":"currentTotalDirectLoadSessions","metricType":"INTEGER"},{"metricId":"currentTotalItemsInShoppingCart","metricType":"INTEGER"},{"metricId":"currentTotalItemsOrdered","metricType":"INTEGER"},{"metricId":"currentTotalNaturalSearchSessions","metricType":"INTEGER"},{"metricId":"currentTotalNewSessions","metricType":"INTEGER"},{"metricId":"currentTotalOnSiteSearch","metricType":"INTEGER"},{"metricId":"currentTotalOrders","metricType":"INTEGER"},{"metricId":"currentTotalPageViews","metricType":"INTEGER"},{"metricId":"currentTotalProductViews","metricType":"INTEGER"},{"metricId":"currentTotalReferralSessions","metricType":"INTEGER"},{"metricId":"currentTotalRepeatedSessions","metricType":"INTEGER"},{"metricId":"currentTotalSales","metricType":"CURRENCY"},{"metricId":"currentTotalSessions","metricType":"INTEGER"},{"metricId":"hourlyBuyingSessionsCompleted","metricType":"INTEGER"},{"metricId":"hourlyMmcSessions","metricType":"INTEGER"},{"metricId":"hourlyTotalArticalPoints","metricType":"INTEGER"},{"metricId":"hourlyTotalArticalsCompleted","metricType":"INTEGER"},{"metricId":"hourlyTotalArticalsInitiated","metricType":"INTEGER"},{"metricId":"hourlyTotalConversionPoints","metricType":"INTEGER"},{"metricId":"hourlyTotalConversionsCompleted","metricType":"INTEGER"},{"metricId":"hourlyTotalConversionsInitiated","metricType":"INTEGER"},{"metricId":"hourlyTotalDirectLoadSessions","metricType":"INTEGER"},{"metricId":"hourlyTotalElementViews","metricType":"INTEGER"},{"metricId":"hourlyTotalItemsOrdered","metricType":"INTEGER"},{"metricId":"hourlyTotalNaturalSearchSessions","metricType":"INTEGER"},{"metricId":"hourlyTotalNewSessions","metricType":"INTEGER"},{"metricId":"hourlyTotalOnSiteSearch","metricType":"INTEGER"},{"metricId":"hourlyTotalOnePageSessions","metricType":"INTEGER"},{"metricId":"hourlyTotalOrders","metricType":"INTEGER"},{"metricId":"hourlyTotalPageViews","metricType":"INTEGER"},{"metricId":"hourlyTotalProductViews","metricType":"INTEGER"},{"metricId":"hourlyTotalReferralSessions","metricType":"INTEGER"},{"metricId":"hourlyTotalRepeatedSessions","metricType":"INTEGER"},{"metricId":"hourlyTotalSales","metricType":"CURRENCY"},{"metricId":"hourlyTotalSessions","metricType":"INTEGER"},{"metricId":"multiPageSessionPct","metricType":"PERCENT"}];
app.get("/rtm/api/widget-item-config/metric-configs", (req, res, next) => res.send(metricConfigs));

const translations = {"translations":{"InstagramSales":"Instagram","FaceConvComplSes":"Facebook","edSiteSelectionAll":"All sites","welcomeLabel":"Welcome","FourSqureSessionsPercentOfSales":"Foursquare","OrktPageViewsPerSession":"Orkut","EREADERAverageOrderValue":"Ereader","tl_default_lm2":"Visitor Conversion by Source","tl_default_lm3":"Conversion Trending by Source","tl_default_lm4":"Popular Social Sites","tl_default_lm5":"Popular Mobile Devices","TVAverageSessionLength":"TVs","tl_default_lm1":"Visitor Sources Date Compare","AM":"AM","MmcSessionsPercentOfSales":"Marketing  % of Sales","lmVerticalId_5":"General Merchandiser","lmVerticalId_6":"Home","BrowsingSessionsPercent":"Browser Session %","lmVerticalId_7":"Specialty Retail","BROWSER_Netsurf":"Netsurf","lmVerticalId_8":"Sports; Outdoors","lmVerticalId_9":"Books/Music/Video","lastUpdate":"last processed","TotalTrackedSales":"Tracked Sales","metrics":"Metrics","lmVerticalId_1":"US:Retail","TVPageViewsPerSession":"TVs","lmVerticalId_2":"Financial","hourlyTotalOrders":"Orders / Hour","lmVerticalId_3":"Apparel","OnsiteSearchConvPct":"On-site Search Conversion %","lmVerticalId_4":"Garden","hourlyTotalSales":"Sales / Hour","TotalConversionsCompleted_media":"Article Completed","help_recently":"<font face='Verdana' size='11'>The <b>Recently Clicked</b> option remembers the graphics that you recently added to the display. Select the one that you want displayed again.</font>","ItemsSold":"Items Sold","IpadSessionsPercentOfTotal":"iPad","homeOption":"Home","DiggAverageOrderValue":"Digg","hourAbbreviation":"hr","YTubConvComplSes":"Youtube","TotalSales":"Sales","ConversionEventCategoryId":"Event Category","Top10VendorsToday":"Top 10 Vendors Today","Bottom10VendorsToday":"Bottom 10 Vendors Today","BlogPageViewsPerSession":"Blogspot","logon_reset_password":"Reset Password","GooglePlusBounceRate":"Google Plus","TumblrSessionsPercentOfSales":"Tumblr","WordSessionsPercentOfSales":"Wordpress","BROWSER_Konqueror":"Konqueror","TVConvComplSes":"TVs","TotalBrowsSes":"Browse Sessions","ConversionRate":"Conversion Rate","compareVertLM":"Benchmark Compare Module","etDialogMetric3":"Metric 3:","etDialogMetric4":"Metric 4:","TVSessionsPercentOfTotal":"TVs","BlogBounceRate":"Blogspot","currentTotalNaturalSearchSessions":"Natural Search Sessions","etDialogMetric1":"Metric 1:","YTubBounceRate":"Youtube","etDialogMetric2":"Metric 2:","thr":"Thr","november":"November","lmTypeLabeltrend2":"","SearchSessionsPercentOfSales":"Natural Search % of Sales","BROWSER_Konqueror_Percent":"Konqueror %","SETTOPBOXSessionsPercentOfSales":"SetTopBoxes","quarterAbriviation":"Q","MmcClicks":"Vendors Clicks","cumulativeTotalRepeatedSessions":"Repeat Sessions","SETTOPBOXConvComplSes":"SetTopBoxes","ConversionEventId_media":"Article","pieChart":"Enterprise Dashboard Compare Module","lmByVendor":"By Vendor","help_rss":"<font face='Verdana' size='11'>The <b>RSS</b> option provides a simple RSS (Really Simple Syndication) feed, enabling you to place non-IBM Digital Analytics content on your palette.<br/><br/>Enter the URL of the RSS, the number of headlines you want to display and click <b>Apply</b>.</font>","FourSqureAverageOrderValue":"Foursquare","DirectLoad":"Direct Load Activity","MOBILEPHONESessionsPercentOfSales":"Mobile phones","edAdminDelete":"Delete","FourSqureAverageSessionLength":"Foursquare","help_label":"<font face='Verdana' size='11'>Enables you to create a label for the display. Type text and set the width of the text box.</font>","TotalRepeatedSessions":"Repeat Sessions","FaceAverageOrderValue":"Facebook","EREADERConvComplSes":"Ereaders","durationSeparator":":","InstagramSessionsPercentOfTotal":"Instagram","LGSessionsPercentOfTotal":"LG","loginInvalid":"That Client ID, Username, and Password combination is not valid.","OrktAverageSessionLength":"Orkut","cancelButton":"Cancel","ReferralChannelShipingsCompleted":"Referral Channel Shippings Completed","errorNoData":"No Data Available","hideTheComparison":"Hide Comparison Period","login_title":"Login","edAdminAllSites":"All sites","LinkBounceRate":"LinkedIn","ConversionEventCategoryId_media":"Article Category","layoutDialogName":"Save as (rename)","lmByDevice":"By Device","MOBILEPHONEBounceRate":"Mobile phones","hourlyMmcSessions":"MMC Sessions / Hour","PintrestPageViewsPerSession":"Pintrest","tl_Google":"Google Chrome","SETTOPBOXPageViewsPerSession":"SetTopBoxes","versus":"versus","MySpSessionsPercentOfSales":"MySpace","OrderedShoppingCartItems":"Ordered Shopping Cart Items","edTypeLabelTrend2":"","hourlyTotalItemsOrdered":"Items Ordered / Hour","LinkSales":"LinkedIn","edAdminEditInfo":"The site group has been saved:","edMarketingSummaryTitle":"Marketing Vendors","Values":"Values","Top10ProductsYesterday":"Top 10 Products Yesterday","passwordResetComplete":"Your password has been successfully reset and the new password has been sent to you by email.","shortLoadingWord":"Loading...","reportRealtime":"Realtime Dashboard Report Module","GAMESCONSOLESessionsPercentOfTotal":"Games consoles","Bottom10SearchEnginesYesterday":"Bottom 10 Search Engines Yesterday","DirectConvComplSes":"Direct Load Conversion Rate","BROWSER_Opera_Percent":"Opera %","cumulativeTotalConversionsInitiated":"Events Initiated","SocialBounceRate":"Social Sites Bounce Rate","edAdminAddInfo":"The site group has been created:","BROWSER_Netscape":"Netscape","hourlyTotalDirectLoadSessions":"Direct Load Sessions / Hour","edAdminAvailSites":"Available Sites","edTreeBtSelectSites":"Select Sites","TumblrConvComplSes":"Tumblr","lmSparkModAvgPer5Min":"Avg/5min","tabModulesMediaTable1":"Real Time\nMedia Report","BROWSER_Opera":"Opera","edCompareTitle":"Compare","tabModulesMediaTable2":"","GooglePlusSessionsPercentOfTotal":"Google Plus","hourlyTotalArticalPoints":"Event Points / Hour","Events":"Events","edComparisonValue":"B","lmTypeLabelcompareVert2":"","monday":"Monday","MEDIAPLAYERAverageSessionLength":"Mediaplayers","tabModulesRecently2":"","PercentTotalConversionsInitiated_media":"Article Initiated % of Total","PaidSearchSessionsPercentOfSales":"Paid Search % of Sales","DiggSales":"Digg","tabModulesRecently1":"Recently\nClicked","cumulative":"Cumulative","GAMESCONSOLEPageViewsPerSession":"Games consoles","ProductViewsPerSession":"Product Views / Session","errorImageNotFound":"The image is not found","multiPageSessionPct":"Multi Page Session %","edAdminLoadMsg3":"One or more site groups have no client ids.","lmTypeLabelcompareDate2":"","loginNoSwitch":"You have not been granted access to Analytics. Please contact your administrator.","hourlyTotalSessions":"Sessions / Hour","TotalAnonymousItemsOrdered":"Anonymous Items Ordered","edAdminLoadMsg2":"You have no user groups to assign to a site group.","edAdminLoadMsg1":"Error occurred loading the dialog.","lmByDeviceFamily":"By Device Family","MmcConvComplSes":"Marketing Conversion Rate","tl_report10ps":"Products","MmcSessionsCompleted":"MMC Sessions Completed","edTopLineTrendTitle":"Top Line Trend","PintrestSessionsPercentOfSales":"Pintrest","MEDIAPLAYERPageViewsPerSession":"Mediaplayers","badRSSEcoding":"Unsupported Character Set:","notepadTitle":"Notepad","FourSqurePageViewsPerSession":"Foursquare","tl_default2":"Merchandise","help_cumulative":"<font face='Verdana' size='11'>These line graphs show real time activity by plotting the selected quantity against time.<br/>The <b>Cumulative Trend</b> graphs show the accumulated quantities since midnight, plotted at five minute intervals. The name of the quantity is displayed in the top left corner. Move the cursor along the time axis to show the exact cumulative quantity and time.</font>","tl_default3":"Sessions Analysis","UponAverageOrderValue":"StumbleUpon","cumulativeTotalOrders":"Orders","currentTotalNewSessions":"New Sessions","verticalWords":"Vertical","InstagramBounceRate":"Instagram","lmYourSiteLabel":"Your Site","tl_spark":"Spark Graph","GooglePlusConvComplSes":"Google Plus","SrchConvComplSes":"Natural Search Conversion Rate","EventsCategory_media":"Article Category","tl_default1":"KPI Trends","FaceSales":"Facebook","TotalTrackedItemsOrdered":"Tracked Items Ordered","edAdminCancelConfirm":"A change is still pending. Confirm cancel by clicking Cancel again.","edCalendarFiscalMonthHeader":"Fiscal ($$1)","october":"October","marketingDialogHelp":"Enter a set of filters","cumulativeTotalReferralSessions":"Referral Sessions","PageViewsPerSession":"Page Views / Session","dialogHelp":"Help","cumulativeTotalConversionPoints":"Event Points","MySpSales":"MySpace","UponSessionsPercentOfTotal":"StumbleUpon","tl_Image":"Image","TABLETSessionsPercentOfSales":"Tablets","PlacementId":"Placement","TumblrPageViewsPerSession":"Tumblr","edTypeLabelChannels":"Channel\nSummary","tabModulesHourly2":"","TotalNewDirectLoadSessions":"New Session from Direct Load","tabModulesHourly1":"Hourly\nBar Chart","today":"Today","friday":"Friday","MOBILEPHONEAverageOrderValue":"Mobile phones ","saveButton":"Save","tl_bar":"Hourly Bar Chart","YTubSessionsPercentOfSales":"Youtube","funnelTotal":"Total","YTubSales":"Youtube","etDialogMarketingProgramsFilter":"Marketing Programs ","lmVerticalId_16":"UK:Retail","lmVerticalId_17":"Jewelry","lmVerticalId_14":"Office Supplies","lmVerticalId_15":"Eckler's - All Sites","topLineDialogHelp":"Select up to 10 Items. Items selected after10 will not be included.","Vendor":"Vendor","edTypeLabelLabel":"Label","EventPointsPercentOfTotal":"Event Points Percent of Total","lmVerticalId_18":"Department Store","lmVerticalId_19":"Health and Beauty","EREADERSessionsPercentOfSales":"Ereaders","loginLocked":"This account has been locked. To have a new password sent to your registered email address click <a href=\"#\" onclick=\"navToResetPasswordPage()\">here</a>. Otherwise, contact your system administrator to reactivate this account.","TotalTrackedOrders":"Tracked Orders","lmVerticalId_13":"Pets","lmVerticalId_10":"Gifts","lmVerticalId_11":"Office Supply/Electronics","tabModules":"Modules","cumulativeTotalNewSessions":"New Sessions","PM":"PM","cumulativeTotalOnSiteSearch":"On-site Searches","AvgItemsInShoppingCart":"Average Items in Cart","last24hours":"Before 12 AM","DirectChannelShipingsCompleted":"Direct Channel Shippings Completed","AverageEventPoints_media":"Average Page Views","hourlyTotalElementViews":"Element Views / Hour","tue":"Tue","lmVerticalId_27":"Teen Apparel","lmVerticalId_28":"Euro:Content","lmVerticalId_25":"UK Apparel","okButton":"Apply","lmVerticalId_26":"B2B","BuyingSessionsPerSession":"Session Conversion Rate","lmVerticalId_29":"Euro:Content Comm","MmcClicksCompleted":"MMC Clicks Completed","PintrestSales":"Pintrest","lmVerticalId_20":"Outdoor Apparel and Gear","BROWSER_AOL":"AOL","lmVerticalId_23":"DVD, Music, & Games","lmVerticalId_24":"Niche Retail","jan":"Jan","lmVerticalId_21":"Sports Apparel & Gear","TABLETAverageOrderValue":"Tablets ","lmVerticalId_22":"Intimate Apparel","ChannelSummaryToday":"Channel Summary Today","edAdminProcessing":"Processing your request, please wait.","logoutOption":"Logout","apr":"Apr","edTopLineTitle":"Top Line Summary","TVSessionsPercentOfSales":"TVs","lmVerticalId_38":"US:Fin Serv","lmVerticalId_39":"US:Travel","lmVerticalId_36":"US:Content","lmVerticalId_37":"US:Content Comm","PintrestAverageSessionLength":"Pintrest","lmVerticalId_31":"Euro:Travel","DirectChannelOrdersCompleted":"Direct Channel Orders Completed","siteHeader":"Site","lmVerticalId_35":"UK:Travel","lmVerticalId_32":"UK:Content","lmVerticalId_33":"UK:Content Comm","Last10ReferralSources":"Recent Referring Sites","OrdersPerSession":"Orders / Session","EventsCategory":"Event Category","help_text":"<font face='Verdana' size='11'>The Notepad option enables you to add a textbox at any point on the screen. This box remains editable after creation. Text can be pasted into this box from any Windows application.</font>","lmShowQuartile":"Show Percentile","MmcSessions":"MMC Sessions","tabModulesLabel2":"","errorTimeout":"timeout error","lmVerticalId_49":"CN:Travel","tl_compair":"Compare","etDialogType":"Report Type:","lmVerticalId_47":"CN:Retail","lmVerticalId_48":"CN:Fin Serve","SocialSessionsPercentOfTotal":"Social Sites % of Site Traffic","itIsNotANumber":"That field must be an integer without commas. ($$1) is not an integer. Please try again.","MySpPageViewsPerSession":"MySpace","lmVerticalId_41":"AU:Content Comm","lmVerticalId_42":"AU:Retail","errorNoURL":"The URL is entered incorrectly","lmVerticalId_40":"AU:Content","lmVerticalId_45":"Demo Vertical","edCalendarFsQuarter":"Fiscal Quarters","lmVerticalId_46":"Demo Sub-Vertical","FourSqureSessionsPercentOfTotal":"Foursquare","lmVerticalId_43":"AU:Travel","lmVerticalId_44":"AU:Fin Serv","edSiteSelectorTableheaderSite":"Site","MmcChannelCompleted":"MMC Channel Completed","SETTOPBOXAverageSessionLength":"SetTopBoxes","currency":"$","edCalendarWeeks":"Weeks:","help_trend":"<font face='Verdana' size='11'>These line graphs show real time activity by plotting the selected quantity against time.<br/>The <b>Trend</b> graphs show the selected quantity plotted at five minute intervals for the last 24 hours. The name of the quantity is displayed in the top left corner. Move the cursor along the time axis to show the exact quantity and time of each point on the graph.</font>","feedbackOption":"Feedback","AverageSessionLength":"Avg Session Length","tabModulesLabel1":"Label","loginUnavail":"Service is unavailable","lmCalendarDaily":"Daily","lmVerticalId_58":"Euro:Apparel","lmVerticalId_59":"Euro:Health and Beauty","MOBILEPHONESessionsPercentOfTotal":"Mobile phones","tabModulesTrend1":"Trend","tabModulesTrend2":"","lmVerticalId_52":"France:Retail","lmVerticalId_53":"German:Retail","marketing":"Enterprise Dashboard Marketing Vendors Module","lmVerticalId_50":"CN:Content Comm","TwitBounceRate":"Twitter","lmVerticalId_51":"CN:Content","lmVerticalId_56":"Euro:B2B","lmVerticalId_57":"Books and Media","metric":"Metric:","lmVerticalId_54":"US:B2B","lmVerticalId_55":"UK:B2B","help_image":"<font face='Verdana' size='11'>Paste image link into the text box.</font>","edCalendarToday":"Today","edAdminDiscard":"Discard","reportLastUpdated":"Report Last Updated: ","Bottom10SearchEnginesToday":"Bottom 10 Search Engines Today","etDialogMediaTimeDataToday":"Today","EventsName_media":"Article","atDate":"at date:","edCalendarQuarters":"Quarters:","currentTotalOrders":"Orders","SETTOPBOXSessionsPercentOfTotal":"SetTopBoxes","lmVerticalId_61":"UK:Health and Beauty","view":"View: ","InstagramSessionsPercentOfSales":"Instagram","NumberOfAbandonedShoppingCarts":"Abandoned Shopping Carts","BROWSER_IE":"Internet Explorer","MySpAverageSessionLength":"MySpace","MobileConvComplSes":"Mobile Conversion Rate","lmVerticalId_60":"UK:General Merchandiser","TotalShipping":"Shipping and Handling","actual":"Actual","hourlyTotalConversionsInitiated":"Events Initiated / Hour","LinkAverageOrderValue":"LinkedIn","WordPageViewsPerSession":"Wordpress","cumulativeTotalElementViews":"Element Views","EventsPointsPerSession":"Event Points / Sessions","MmcOrders":"Vendors Orders","TotalVisitors":"Visitors","aug":"Aug","TABLETAverageSessionLength":"Tablets","MySpSessionsPercentOfTotal":"MySpace","etDialogOrSeporator":"or","tl_report10":"Top 10","excelMonth":"Month","cumulativeTotalProductViews":"Product Views","lmVerticalId_70":"Euro:Retail","SETTOPBOXAverageOrderValue":"SetTopBoxs ","funnelReferralH":"Referring Sites","TotalElementViews":"Element Views","BROWSER_Firefox_Percent":"Firefox %","AndroidSessionsPercentOfTotal":"Android","hourlyTotalArticalsCompleted":"Events Completed / Hour","edAdminDeleteConfirm":"Confirm the deletion by clicking Delete again.","edAdminPendingAdd":"You have a partly created new site group. You must click either Create or Cancel.","tl_trend":"Trend","AverageOrderValue":"Avg Order Value","tl_topline":"Top Line","cumulativeMmcSessions":"MMC Sessions","topline":"Enterprise Dashboard Top Line Module","yesterday":"Yesterday","nov":"Nov","cumulativeTotalNaturalSearchSessions":"Natural Search Sessions","edAdminPendingEdit":"You have a partly changed site group. You must click either Save or Cancel.","IphoneSessionsPercentOfTotal":"Apple IPhone","login_remember":"Remember Client ID and User Name","loginTimeout":"Session timed out","currentTotalItemsOrdered":"Items Ordered","tl_reportri":"Recent Items","lmVerticalId_902":"Universal Travel","lmVerticalId_903":"Universal Content","lmVerticalId_900":"Universal Retail","lmVerticalId_901":"Universal Fin Serv","help_bar":"<font face='Verdana' size='11'>The <b>Bar Graphs</b> show hourly totals since midnight for the selected metric. For the current hour the total up until the latest update is shown in green with the projected total for the hour as a pale blue background. Moving the cursor over the bars will show the exact figures.<br/><br/>The projected total is extrapolated from the current figure.</font>","TotalTrackedProductViews":"Tracked Product Views","MmcShipping":"Vendors Shipping and Handling","SearchActivity":"Natural Search Activity","lmVerticalId_99":"No SubVertical","SearchSessionsCompleted":"Search Sessions Completed","DirectSessionsPercentOfSales":"Direct Load % of Sales","lmVerticalId_904":"Universal Content Comm","currentTotalOnSiteSearch":"On-site Searches","help_gauge":"<font face='Verdana' size='11'>Gauges are used to show the rate of activity for selected activities. The most recent quantity is shown in the center of the gauge and the position of the arrow on the gauge gives an indication of how the current quantity relates to the lowest and highest figures.<br/><br/><b>Per Hour</b> gauges show the activity for the selected metric over the last hour compared to the highest figure over the last 48 hours.<br/><br/><b>Current Quantity</b> gauges show figures for currently active sessions compared to the highest figures over the last 48 hours. <br/><br/><b>Avgs and ratios</b> show calculated figures using data from the last hour compared to the highest figures over the last 48 hours. </font>","lmVerticalId_905":"Universal B2B","tl_Opera":"Opera","lmCalendarFsMonths":"Months","YTubSessionsPercentOfTotal":"Youtube","BROWSER_Safari_Percent":"Safari %","funnel":"Enterprise Dashboard Conversion and Marketing Module","MOBILEPHONEConvComplSes":"Mobile phones","tl_reportedia":"Editable Dialog Options","WordConvComplSes":"Wordpress","currentTotalSales":"Current Sales","tl_dateComp":"Date Compare","TotalRepeatedMMCSessions":"Repeat Session from MMC","TABLETPageViewsPerSession":"Tablets","TotalSessionsPercent":"Total Sessions %","edTypeLabelMarketing":"Marketing\nVendor","SearchChannelShipingsCompleted":"Search Channel Shippings Completed","edMetricsSelectionAll":"All metrics","warningTitle":"Warning","TotalNewMMCSessions":"New Session from MMC","EREADERAverageSessionLength":"Ereaders","sunday":"Sunday","numberMillion":"M","AverageEventPoints":"Average Event Points","cumulativeTotalSales":"Sales","currentTotalProductViews":"Product Views","TumblrBounceRate":"Tumblr","iPodSessionsPercentOfTotal":"Apple iPod Touch","weekAbriviation":"w","hourlyTotalOnePageSessions":"One Page Sessions / Hour","excelWeek":"Week","previousButton":"Previous","PaidSearchSessionsPercentOfTotal":"Paid Search % of Site Traffic","BlogSessionsPercentOfSales":"Blogspot","MmcChannelOrdersCompleted":"MMC Channel Orders Completed","edAdminDeleteError":"An error occurred processing your deletion. The site group was not deleted.","excelQuarter":"Quarter","BlackberrySessionsPercentOfTotal":"Blackberry","UponPageViewsPerSession":"StumbleUpon","DirectLoadSessionsPercentOfTotal":"Direct Load % of Site Traffic","EREADERPageViewsPerSession":"Ereaders","forgotPassword":"Forgot Password or Locked Account?","MOBILEPHONESales":"Mobile phones","adminOption":"Admin","wed":"Wed","TotalItemsOrdered":"Items Ordered","PaidSrchConvComplSes":"Paid Search Conversion Rate","funnelBuy":"Buy","edNumOfSitesToDisplay":"Number of sites to display.","GooglePlusSales":"Google Plus","loginNoService":"Service Unavailable","GooglePlusPageViewsPerSession":"Google Plus","TABLETSessionsPercentOfTotal":"Tablets","funnelShop":"Shop","msFilenameLabelTrend":"Trend","GAMESCONSOLEBounceRate":"Games consoles","hourlyBuyingSessionsCompleted":"Buying Sessions / Hour","MobileSessionsPercentOfSales":"Mobile % of Sales","TotalAnonymousSales":"Anonymous Sales","january":"January","TotalProductViews":"Product Views","EREADERSales":"Ereaders","hourlyTotalRepeatedSessions":"Repeat Sessions / Hour","tabModulesMediaChart2":"","feb":"Feb","tabModulesMediaChart1":"Real Time\nMedia Chart","TotalReferralSessions":"Referral Sessions","hourlyTotalPageViews":"Page Views / Hour","NaturalSearchSessionsPercentOfTotal":"Natural Search % of Site Traffic","DiggSessionsPercentOfSales":"Digg","OrktSales":"Orkut","ItemsPerOrder":"Items / Order","supportOption":"Support","GAMESCONSOLEConvComplSes":"Games consoles","OrktBounceRate":"Orkut","NewVisitors":"New Visitors","PintrestSessionsPercentOfTotal":"Pintrest","etDialogTitle":"Report Title:","warningRecently":"No recently clicked items","PintrestAverageOrderValue":"Pintrest","errorNoImage":"This url doesn't contain\na link to any image.\nThe supported image formats are:\n*.jpg, *.gif, *.png, *.swf ","edTypeLabelToplLine2":"","nextButton":"Next","edRowSubTotalLabel":"Total - Selected Sites","marketingDialogTitle":"Marketing Module Options","ReferralChannelOrdersCompleted":"Referral Channel Orders Completed","FaceBounceRate":"Facebook","TotalNewReferralSessions":"New Session from Referral","ShippingPerOrder":"Avg Shipping and Handling","TotalOnSiteSearch":"On-site Searches","lmCalendarFsQuarter":"Quarters","PercentTotalConversionPoints_media":"Page Views % of Total","TotalRepeatedDirectLoadSessions":"Repeat Session from Direct Load","TotalBuyers":"Buyers","closeOption":"Close","welcome_title":"Welcome to IBM Digital Analytics","msFilenameLabelChannels":"Channel_Summary","WordSales":"Wordpress","logon_reset":"Forgot Password or Locked Account?","lmTypeLabelcompareVert":"Vertical\nCompare","SoldItemsSessions":"Buying Sessions","cumulativeTotalPageViews":"Page Views","september":"September","TwitSales":"Twitter","SocialAverageSessionLength":"Social Sites Session Length","sat":"Sat","MmcRevenue":"Vendors Sales","MmcShippingHandlingCompleted":"MMC Shipping Handling Completed","tl_layout_lm0":"Visitor Behavior","tl_layout_lm2":"Site Stickyness","tl_layout_lm1":"Visitor Conversions","tl_layout_lm4":"Traffic Sources","FaceSessionsPercentOfTotal":"Facebook","tl_layout_lm3":"Transaction Summary","client_title":"Client ID","edSiteSelection":"Site Selection","lmByOS":"By OS","BuyingSessionsCompleted":"Buying Sessions","BlogAverageSessionLength":"Blogspot","tl_RSS":"RSS","SoldItems":"Sold Items","allMetrics":"All Metrics","tabModulesFunnel2":"","tabModulesFunnel1":"Conversion\nFunnel","dec":"Dec","currentTotalReferralSessions":"Referral Sessions","edSiteSelectorTableheaderMetric":"Metric","EREADERBounceRate":"Ereaders","TotalOnePageSessions":"One Page Sessions","edTypeLabelImage":"Image","tabModulesInstructions":"Drag modules onto the page.","SoldItemsNumber":"Items Sold","funnelRealtime":"Realtime Dashboard Conversion and Marketing Module","PalmSessionsPercentOfTotal":"Palm","TotalRepeatedNaturalSearchSessions":"Repeat Session from Natural Search","etDialogIntro":"Filter By: Enter up to 10 search criteria below. Wildcards are assumed.","edAdminNewSiteGroupName":"New Site Group Name","TwitSessionsPercentOfTotal":"Twitter","etDialogMediaTimeData10Min":"Last 10 min","GAMESCONSOLEAverageSessionLength":"Games consoles","UponSessionsPercentOfSales":"StumbleUpon","edAdminSave":"Save","TotalNaturalSearchSessions":"Natural Search Sessions","july":"July","TumblrSales":"Tumblr","am":"am","cumulativeBuyingSessionsCompleted":"Buying Sessions","loginBadIP":"Based on the IP address of your host, you are not allowed to log in to this system. If you think that this is an error, please see your system administrator.","ShopCartConvPct":"Shopping Cart Conversion Rate","currentNumberOfShoppingCarts":"Active Shopping Carts","tl_convFunl":"Conversion Funnel","tl_ctrend":"Cumulative Trend","viewNone":"View: None","BROWSER_Chrome_Percent":"Google Chrome %","NewBuyers":"New Buyers","currentTotalDirectLoadSessions":"Direct Load Sessions","tl_progress":"Progress Bar","allOtherVendors":"All Other MMC Vendors","TotalPaidSearchSessions":"Paid Search Sessions","etDialogConversionEventsFilter":"Conversion Events","SearchRevenueCompleted":"Search Revenue Completed","tl_reportrirs":"Referring Sites","loadingWord":"Loading","edCompareShowPie":"Show Pie","spark":"Benchmark Spark Module","wednesday":"Wednesday","currentTotalSessions":"Current Sessions","labelDialogWidth":"Width","lmTypeLabelcompareDate":"Date\nCompare","sep":"Sep","hourlyTotalArticalsInitiated":"Events Initiated / Hour","MmcChannelSalesCompleted":"MMC Channel Sales Completed","thursday":"Thursday","tl_reportfr":"Filtered Report","tl_vertComp":"Vertical Compare","march":"March","edNothingToDownLoad":"The dashboard contains nothing that can be downloaded.","TotalAnonymousPageViews":"Anonymous Page Views","edAttr_F_1":"days Forward Looking - Last Click","edAttr_F_0":"Same Session","edAttr_F_3":"days Forward Looking - Average Click","LinkPageViewsPerSession":"LinkedIn","BarGraphMedia_title":"Hourly for Yesterday and Today","edAttr_F_2":"days Forward Looking - First Click","june":"June","edAttr_F_5":"days Forward Looking - Custom Click","edAttr_F_4":"days Forward Looking - All Clicks","jul":"Jul","jun":"Jun","DirectChannelsCompleted":"Direct Channels Completed","compareDatesModuleLabel":"Compare Dates","ItemId":"Item","MySpConvComplSes":"MySpace","tl_Internet":"Internet Explorer","duplicateStandardName":"The name for the view is the same as a standard view. Please enter a unique name.","ShoppingSessionsPercent":"Shopping Cart Session %","SamsungSessionsPercentOfTotal":"Samsung","CalendarDateRangeBDes":"Date Range B (Compare Date)","Top10SearchEnginesToday":"Top10 Search Engines Today","TVBounceRate":"TVs","SocialSessionsPercentOfSales":"Social Sites % of Sales","TVSales":"TVs","timedOut":"The module could not be loaded. Your session may have timed out.","SearchChannelSalesCompleted":"Search Channel Sales Completed","InstagramConvComplSes":"Instagram","BlogAverageOrderValue":"Blogspot","etDialogMediaTimeData20Min":"Last 20 min","etDialogVendorFilter":"Marketing Vendors ","tl_Notepad":"Notepad","edTypeLabelTrend":"Trend","EventSessions":"Event Sessions","OrktConvComplSes":"Orkut","BarGraphLegend_Last2Hours":"Last 2 hours","edToplineWarning":"You have selected one or more metrics that do not support today reporting. In the TopLine display they will be null.","edAdminAllUsers":"All user groups","PercentTotalConversionsCompleted_media":"Article Completed % of Total","ShoppingCartAbandonmentRate":"Shopping Cart Abandonment Rate","BraGraphLegent_yesterday":"Yesterday","BarGraphMediaBoth_title":"Trend on Article:","tl_Firefox":"Firefox","TotalConversionPoints_media":"Page Views","TotalConversionsInitiated_media":"Article Initiated","TotalTrackedPageViews":"Tracked Page Views","ReferralActivity":"Referring Sites Activity","AverageTimePerPage":"Avg Time Per Page","ItemAbandonmentRate":"Item Abandonment Rate","SoldItemsRevenue":"Revenue","tl_channels":"Channels","edTypeLabelRss2":"","MobileSessionsPercentOfTotal":"Mobile % of Site Traffic","MEDIAPLAYERSessionsPercentOfTotal":"Mediaplayers","Bottom10ProductsYesterday":"Bottom 10 Products Yesterday","hourlyTotalReferralSessions":"Referral Sessions / Hour","rssDialogURL":"Feed URL","YTubPageViewsPerSession":"Youtube","saveOption":"Save","ReferralSessionsPercentOfSales":"Referrals % of Sales","pwd_title":"Password","BROWSER_Firefox":"Firefox","etDialogMetric1Sort":"Metric 1 (sort by):","Last10OnSiteSearchTerms":"Recent On-site Searches","numberBillion":"B","UponConvComplSes":"StumbleUpon","ExpandAll":"Expand All","help_editableTable":"<font face='Verdana' size='11'>The Filtered Report module allows you to view detailed information (rather than aggregate / Top Line information) on your report type of choice.  <br></br><font color='#0000ff'>Time:</font>  All data reflects information processed so far today.<br></br><br></br><font color='#0000ff'>Report Types:</font><br></br><br></br><font color='#0000ff'>Conversion Events:</font>  A detailed listing of the top conversion events (the completion of non-commerce business objectives as determined by the 'conversion event tag'). Note: you may download up to the top 25,000 rows on this report type by clicking the down arrow on the module display.<br></br><br></br><font color='#0000ff'>Marketing Programs:</font>  A detailed listing of the top marketing programs (unique Vendor-Category-Placement-Item strings as determined by the 'MMC' parameters). Note: you may download up to the top 25,000 rows on this report type by clicking the down arrow on the module display.<br></br><br></br><font color='#0000ff'>Marketing Vendors:</font> A detailed listing of the top marketing program vendors (unique Vendor strings - the first parameter of the Vendor-Category-Placement-Item string as determined by the 'MMC' parameters). Note: you may download up to the top 5,000 rows on this report type by clicking the down arrow on the module display.<br></br><br></br><font color='#0000ff'>Products:</font> A detailed listing of the top products sold. Note: you may download up to the top 15,000 rows on this report type by clicking the down arrow on the module display.<br></br><br></br><font color='#0000ff'>Search Engines (Natural Search):</font>  A detailed listing of the top referring search engines by which visitors accessed your site via natural/organic search (not paid advertisement - paid search will appear in the Marketing Programs report type provided the destination page included the 'MMC' parameters). Note: you may download up to the top 5,000 rows on this report type by clicking the down arrow on the module display.<br></br><br></br><font color='#0000ff'>Metric Selection:</font><br></br><br></br>The Conversion Events and Marketing Programs report types allow you to choose the metrics that you want from the drop down list.  You may choose up to 3 metrics.  Metric #1 will be the metric by which the list is sorted.<br></br><br></br>For the Marketing Vendors, Products and Search Engines (Natural Search) report types, you will be presented with best practice metrics which differ by vertical.<br></br><br></br><font color='#0000ff'>Filtering:</font><br></br><br></br><font color='#0000ff'>Conversion Events:</font>  For Conversion Events, you must first select whether you would like to filter by the event category or the event name.  For example, a filter on selection of Event Category with entries of 1) subscription or 2) actions may return results including: Subscription > Free Trial, Actions> Email a Friend, Actions> Print, etc.<br></br><br></br><font color='#0000ff'>Marketing Programs:</font> For Marketing Programs, you must first select whether you would like to filter by Vendor, Category, Placement or Item. For example, a filter on selection of Placement with entries of 1) news or 2) summer may return results including: Email>Customers>Newsletter>Banner, Google>Paid Search>Summer Promo>sunglasses, etc.<br></br><br></br><font color='#0000ff'>Marketing Vendors:</font>  For Marketing Vendors, you must first select whether you would like to see the top 10 results unfiltered or if you would like to apply filters. For example, filter entries of 1) email or 2) goog may return results including email, google.com, google.de, etc.<br></br><br></br><font color='#0000ff'>Products:</font> For Products, you must first select whether you would like to see the top 10 results unfiltered or if you would like to apply filters.  For example, filter entries of 1) shirt or 2) jeans may return results including T-shirt, Oxford Shirt, Blue Jeans, etc.<br></br><br></br><font color='#0000ff'>Search Engines (Natural Search):</font>  For Search Engines (Natural Search), you must first select whether you would like to see the top 10 results unfiltered or if you would like to apply filters.  For example, entries of 1) goog or 2) yaho may return results including google.com, google.de, yahoo.com, etc.</font>","CalendarDateRangeNote":"*Date Range B applies to date comparing modules","tl_vertComp20":"Average Order Value by Platform","edAdminCreate":"Create","topLineDialogTitle":"Top Line Module Options","TVAverageOrderValue":"TVs","OrktSessionsPercentOfSales":"Orkut","edAdminAvailUsers":"Available User Groups","numberThousand":"K","dialogRecentlyClicked":"Recently clicked","NewVisitorConvPct":"New Visitor Conversion Rate","dialogItem":"Item","edRowTotalLabel":"Total - All Sites","etDialogMediaTimeData30Min":"Last 30 min","text":"Enterprise/Realtime Dashboard Text Module","fri":"Fri","edTypeLabelCompare2":"","SocialPageViewsPerSession":"Social Sites Average Page Views","LinkSessionsPercentOfSales":"LinkedIn","edTypeLabelConversion2":"","lmSparkModAvgPerDay":"Avg/Day","oct":"Oct","edAdminCreateNew":"- Create New Site Group","TotalAnonymousOrders":"Anonymous Orders","FaceSessionsPercentOfSales":"Facebook","tabModulesRecent2":"","sendNewPassword":"Send new password","tabModulesRecent1":"Recent\nItems","labelDialogText":"Enter Text","edPreviousYrCompare":"Previous year comparison","BuyingSessionsPercent":"Order Session %","tl_reportmb":"Media Bar","VendorId":"Vendor","MOBILEPHONEPageViewsPerSession":"Mobile phones","tl_vertComp06":"Visitor Traffic by Referring Sites","tl_vertComp05":"Visitor Traffic by Natural Search","tl_vertComp08":"On-site Search Summary","dialogMetric":"Metric","tl_vertComp07":"Visitor Traffic by Marketing Programs","tl_vertComp02":"Site Trends","tl_reportmr":"Media Report","tl_vertComp01":"Transaction Summary","LinkAverageSessionLength":"LinkedIn","tl_vertComp04":"Visitor Traffic By Direct Load","RefferalSessionsPercentOfTotal":"Referrals % of Site Traffic","tl_vertComp03":"Visitor Summary","tabModulesImage1":"Image","tabModulesImage2":"","help_kpi":"<font face='Verdana' size='11'>The <b>Progress Bars</b> show key performance indicators for the day. The green foreground bar shows the quantity for the metric accumulated since midnight. The pale blue background is the projected total for the day, extrapolated from this.<br/><br/>Moving the cursor over the green bar will show the current quantity. Moving the cursor over the pale blue bar will show the projected total. </font> ","tl_vertComp09":"Visitor Behavior","UponBounceRate":"StumbleUpon","december":"December","mar":"Mar","tl_vertComp11":"Visitor Traffic by Paid Search","tl_vertComp10":"Browser Types","may":"May","edConversionTitle":"Session Conversion Funnel","currentMmcSessions":"MMC Sessions","BROWSER_Mozilla_Percent":"Mozilla %","MEDIAPLAYERAverageOrderValue":"Mediaplayers ","edSiteSelectionNone":"You must select at least one sub-client.","tl_vertComp17":"Average Session Length by Platform","tl_vertComp16":"Sales Breakdown by Platform","tl_vertComp19":"Bounce Rate by Platform","tl_vertComp18":"Average Page Views by Platform","tl_vertComp13":"Visitor Traffic by Social Sites","tl_vertComp12":"Industry Trend by Comparison Period","tl_vertComp15":"Conversion Rate By Platform","tl_vertComp14":"Site Traffic Breakdown by Platform","hourlyTotalNewSessions":"New Sessions / Hour","edAttr_B_5":"days Backward Looking - Custom Click","edAttr_B_4":"days Backward Looking - All Clicks","tabModulesGauge2":"","tabModulesProgress2":"","TotalRepeatedReferralSessions":"Repeat Session from Referral","tabModulesGauge1":"Gauge","tabModulesProgress1":"Progress\nBar","edAttr_B_1":"days Backward Looking - Last Click","edAttr_B_3":"days Backward Looking - Average Click","try_another_account":"Try another account","edAttr_B_2":"days Backward Looking - First Click","TotalTrackedOnSiteSearch":"Total Tracked On Site Search","tl_default_ed3":"Marketing Channels","FourSqureBounceRate":"Foursquare","tl_default_ed2":"Site Traffic Comparison","tl_default_ed1":"KPI Trends","etDialogMediaTimeData40Min":"Last 40 min","noRealTimeSupt":"Enterprise Dashboard does not support real time ('Today') data for the Channel Summary module. Please adjust your calendar to a daily, weekly, monthly or quarterly view.","edTypeLabelToplLine":"Top Line","Top10VendorsYesterday":"Top 10 Vendors Yesterday","RefConvComplSes":"Referrals Conversion Rate","TotalAnonymousProductViews":"Anonymous Product Views","HTCSessionsPercentOfTotal":"HTC","MmcChannelShipingsCompleted":"MMC Channel Shippings Completed","edAdminRestore":"Restore","ReferralChannelsCompleted":"Referral Channels Completed","edCalendarMonths":"Months:","edAdminCancel":"Cancel","NewBuyerSales":"New Buyer Sales","lmSpark30DaysLabel":"Last 30 days","layoutDialogIntro":"Select which view to save over","Percents":"Percents","etDialogMetric4Filter":"Filter on:","MarketingSessions":"Marketing Sessions","hourlyTotalConversionsCompleted":"Events Completed / Hour","SETTOPBOXBounceRate":"SetTopBoxes","etDialogProductFilter":"Products","lmQuartile":"Percentile","DiggAverageSessionLength":"Digg","NewSessionsPercent":"New Session %","metricHeader":"Metric :","GAMESCONSOLEAverageOrderValue":"Games consoles","FourSqureSales":"Foursquare","tl_conversion":"Conversion","tl_hourperf":"Hourly Performance","MmcOrdersCompleted":"MMC Orders Completed","tl_trendg":"Trend Graph","TumblrAverageSessionLength":"Tumblr","edTypeLabelImage2":"","YTubAverageOrderValue":"Youtube","BROWSER_IE_Percent":"Internet Explorer %","errorTitle":"No Title Available","TwitAverageSessionLength":"Twitter","MmcSessionsPercentOfTotal":"Marketing % of Site Traffic","edBadPreviousYrCompare":"Data is not available for: ","TABLETConvComplSes":"Tablets","hourlyTotalProductViews":"Product Views / Hour","BROWSER_AOL_Percent":"AOL %","tl_Safari":"Safari","edCalendarFiscalQuarterHeader":"Fiscal ($$1)","cumulativeTotalItemsOrdered":"Items Ordered","EventsName":"Event Name","WordBounceRate":"Wordpress","EventsPerSession":"Events / Sessions","currentBuyingSessionsCompleted":"Buying Sessions","funnelNatural":"Natural Search","SearchEngines":"Search Engines","DiggSessionsPercentOfTotal":"Digg","pm":"pm","edComparePTotal":"% of Total","tl_stdViews":"Standard Views","tl_Apps":"Applications","CalendarDateRangeADesc":"Date Range A (Global Date)","ShoppingCartConversionRate":"Shopping Cart Conversion Rate","funnelReferral":"Referring Sites","cumulativeTotalDirectLoadSessions":"Direct Load Sessions","TotalItemsInShoppingCart":"Items in Shopping Cart","InstagramAverageOrderValue":"Instagram","tabModulesRss2":"","Last10PagesBrowsed":"Recent Pages Browsed","edTypeLabelRss":"RSS","Last10ProductsBrowsed":"Recent Products Browsed","OnsiteSearchesPerSession":"On-site Searches / Session","funnelMMCH":"Marketing","tabModulesRss1":"RSS","TABLETSales":"Tablets","edCalendarFsMonths":"Fiscal Months","loginClientId":"Client ID is invalid.","TwitPageViewsPerSession":"Twitter","dialogEdit":"Edit","Top10ProductsToday":"Top 10 Products Today","MEDIAPLAYERSessionsPercentOfSales":"Mediaplayers","RepeatesSessionsPercent":"Repeat Session %","WordSessionsPercentOfTotal":"Wordpress","cumulativeTotalSessions":"Sessions","edAdminSiteGroupName":"Site Group Name","august":"August","TABLETBounceRate":"Tablets","compareDateLM":"Benchmark Compare Date Module","SearchChannelCompleted":"Search Channel Completed","AverageItemPrice":"Avg Item Price","tl_report10se":"Search Engines","GooglePlusAverageSessionLength":"Google Plus","lmSparkBarModAvgDiffPerDay":"Avg Difference/Day","AverageRepeatSessionLength":"Avg Repeat Session Length","EREADERSessionsPercentOfTotal":"Ereaders","funnelNaturalH":"Natural Search","TumblrSessionsPercentOfTotal":"Tumblr","help_editableBarMedia":"<font face='Verdana' size='11'>Real Time Media Chart is an optional module that works together with Real Time Media Report and provides the real time performance visualization of articles that are important to you.  Performance of individual articles, article groups or entire article categories are displayed and updated every 10 minutes.<br></br><br></br>Using bar charts, Real Time Media Chart lets you see article performance in 10 minute increments for the last 2 hours and then hourly for the rest of today and yesterday.  By rolling your mouse over a specific time interval, you can see the specific performance for that interval.<br></br><br></br>For additional help, please click the Help link in the top right corner of Monitor.<br></br><br></br>For more detailed information about Real Time Media Chart, please see the Monitor - Real Time Media User Guide located at https://support.coremetrics.com.</font>","DiggPageViewsPerSession":"Digg","TotalConversionPoints":"Event Points","tl_guagecq":"Current Quantity","MOBILEPHONEAverageSessionLength":"Mobile phones","InstagramAverageSessionLength":"Instagram","channelsDialogTitle":"Channel Summary Options","saturday":"Saturday","edChannelsTitle":"Channel Summary","NumberOfShoppingCarts":"Shopping Carts","TwitSessionsPercentOfSales":"Twitter","noDataAvailable":"No data available for selected time period.","msFilenameLabelMarketing":"Marketing_Vendor","edCalendarDaily":"Daily","msgOption":"Messages (($$1))","sun":"Sun","tl_report10vn":"Vendors","LinkConvComplSes":"LinkedIn","MobilePageViewsPerSession":"Mobile Average Page Views","edAdminEditError1":"The site group must have at least one site.","lmCompareButton":"Compare","edAdminEditError2":"An error occurred saving your changes. The site group remains unchanged.","SearchShippingHandlingCompleted":"Search Shipping Handling Completed","tabModulesCumulative1":"Cumulative\nTrend","tabModulesCumulative2":"","MEDIAPLAYERSales":"Mediaplayers","edBadPreviousPrCompare":"Data for today can only be compared to yesterday.","GAMESCONSOLESales":"Games consoles","FacePageViewsPerSession":"Facebook","maymay":"May","edValue":"A","etDialogMediaTimeData50Min":"Last 50 min","funnelDirect":"Direct Load","imageText":"Note: At this time, only some images (*.jpg, *.gif, *.png) and flash movies (*.swf) are supported. If you specify an animated GIF, only the first frame is displayed. If a link is too long the image may not show up.","BROWSER_Netsurf_Percent":"Netsurf %","TwitAverageOrderValue":"Twitter","edSiteSelectorTableheaderOrder":"Order","ProductId":"Product","DiggConvComplSes":"Digg","funnelConversionRateLabel":"Conversion Rate:","DiggBounceRate":"Digg","tl_layout_ed0":"Visitor Trending","BlogSales":"Blogspot","tl_layout_ed2":"Traffic Sources","tl_layout_ed1":"Visitor Loyalty","tl_layout_ed4":"Campaigns","tl_layout_ed3":"Goals","etDialogMetric":"Metric:","TotalDirectLoadSessions":"Direct Load Sessions","BlogSessionsPercentOfTotal":"Blogspot","edTypeLabelChannels2":"","TotalBuySes":"Buying Sessions","GooglePlusSessionsPercentOfSales":"Google Plus","MobileAverageSessionLength":"Mobile Session Length","lmCalendarToday":"Today","helpOption":"Help","logon_back":"Back to login page","edTitle":"Enterprise Dashboard","channels":"Enterprise Dashboard Channel Summary Module","tabViews":"Standard Views","funnelMMC":"Marketing","edTypeLabelConversion":"Conversion &\nMarketing","OnsiteSearchAvgOrderValue":"On-site Search Avg. Order Value","Last10ProductsSold":"Recent Products Sold","lmCalendarFsWeeks":"Weeks","CategoryId":"Category","OnsiteSearchesSessionPercent":"On-site Search Session %","AverageShipping":"Avg Shipping and Handling","currentTotalRepeatedSessions":"Repeat Sessions","UponAverageSessionLength":"StumbleUpon","TotalConversionsCompleted":"Events Completed","ChannelSummaryYesterday":"Channel Summary Yesterday","UponSales":"StumbleUpon","help_editableTableMedia":"<font face='Verdana' size='11'>Real Time Media Report is an optional module that works together with Real Time Media Chart and provides the real time performance of articles that are important to you.  You may select the performance time window to be as broad as today or as narrow as the last ten minutes.  You are able to filter by article category, article name or both and see activity in key areas updated every 10 minutes.<br></br><br></br>Real Time Media Report allows you to measure the performance of your articles in terms of the following metrics:<br></br><br></br>Page Views:  How many total pages of this article were viewed within a specific time window?  This includes all first pages, last pages and all pages in between.<br></br><br></br>Article Initiated:  How many times was this article initiated or started within a specific time window?  This includes only the number of times the article first page was viewed.<br></br><br></br>Article Completed:   How many times was an article completed or finished within a specific time window?  This includes only the number of times the article last page was viewed.<br></br><br></br>Average Page Views:  How many average page views did an article have within a specific time window?  For example, a one page article will always have Average Page Views equal to 1, but a four page article may have on average 1.8, 2.5 or 3.2 of its pages read.  <br></br><br></br>% of Total:   What % of the total does this metric represent?  The % of Total is provided with Page Views, Article Initiated and Article Completed metrics.<br></br><br></br>To see the performance of specific articles, you may filter by article name, article category or a combination of both.<br></br><br></br>You can also download the articles that you are viewing to perform further offline analysis or archive.<br></br><br></br>For additional help, please click the Help link in the top right corner of Monitor.<br></br><br></br>For more detailed information about Real Time Media Report, please see the Monitor - Real Time Media User Guide located at https://support.coremetrics.com. </font>","WordAverageOrderValue":"Wordpress","hourlyTotalOnSiteSearch":"On-site Searches / Hour","etDialogMediaTimeData60Min":"Last 60 min","etDialogSearchFilter":"Search Engines (Natural Search)","SocialConvComplSes":"Social Sites Conversion Rate","showTheComparison":"Show Comparison Period","lmBySocialSite":"By Social Site","fiscalWeek":"Fiscal Week","funnelModTitle":"Session Conversion Funnel By Marketing Channel","CollapseAll":"Collapse All","lmTypeLabelminFunnel":"Conversion\nFunnel","hourlyTotalConversionPoints":"Event Points / Hour","tl_guagear":"Avgs and Ratios","edTypeLabelCompare":"Compare","tabModulesTopTen1":"Filtered\nReports","duplicatePersonalName":"The name for the view is the same as another of your personal views. Please enter a unique name.","trend":"Enterprise Dashboard Trend Module","MobileBounceRate":"Mobile Bounce Rate","downloadDashboardOption":"Download Dashboard","etDialogRadio2":"Top 10 Results Matching Filter Criteria Entered Below","etDialogRadio1":"Top 10 Results Unfiltered","april":"April","mon":"Mon","tabModulesTopTen2":"","TotalPageViews":"Page Views","edDragAndDropDisplay":"Drag and drop to reorder the metrics","LinkSessionsPercentOfTotal":"LinkedIn","TotalSessions":"Sessions","FourSqureConvComplSes":"Foursquare","MotorolaSessionsPercentOfTotal":"Motorola","BROWSER_Safari":"Safari","AverageNewSessionLength":"Avg New Session Length","edAdminAddError4":"An error occurred creating the site group. The site group was not created.","edAdminAddError3":"The new site group must have at least one site.","GAMESCONSOLESessionsPercentOfSales":"Games consoles","edAdminAddError2":"The name for the new site group must be unique.","edAdminAddError1":"You must give the new site group a name.","TotalNewNaturalSearchSessions":"New Session from Natural Search","edNumOfMetricsToDisplay":"Number of metric columns to display.","layoutDialogIndex":"Current names","allDashboard":"All Dashboard Modules","OrktSessionsPercentOfTotal":"Orkut","MmcVendors":"MMC Vendors","tl_number":"Number","edComparePChange":"% Change","errorNoRSS":"RSS is not found","rssDialogCount":"Headlines","TotalTrackedShipping":"Tracked Shipping and Handling","ConversionEventId":"Event","tl_layout0":"My View","PintrestConvComplSes":"Pintrest","SETTOPBOXSales":"SetTopBoxes","cumulativeTotalConversionsCompleted":"Events Completed","Last10OnsiteSearches":"Recent On-site Search Terms","lmHideQuartile":"Hide Percentile","edCalendarFsWeeks":"Fiscal Weeks","clearOption":"Clear","currentTotalItemsInShoppingCart":"Items in Active Shopping Carts","Bottom10ProductsToday":"Bottom 10 Products Today","tabViewsPersonal":"Personal Views","edCalendatSessionsByDay":"Sessions by Day","edPeriodNotSupported":"This metric is not supported for the selected period type.","MEDIAPLAYERBounceRate":"Mediaplayers","tl_report":"Report","lmValuesButton":"Values","Last10NaturalSearchItems":"Recent Natural Search Terms","msFilenameLabelConversion":"Conversion_&_Marketing","currentTotalPageViews":"Page Views","ConversionEventIdAndCategory_media":"Article Category And Article","TwitConvComplSes":"Twitter","etDialogDisplayNum":"Display Top:","channelHeader":"Channel","tl_funnellb":"Session Conversion Funnel By Marketing Channel","OrktAverageOrderValue":"Orkut","BROWSER_Chrome":"Google Chrome","TotalAnonymousShipping":"Anonymous Shipping and Handling","BROWSER_Netscape_Percent":"Netscape %","TotalConversionsInitiated":"Events Initiated","tl_funnel":"Funnel","lmSparkBarModAvgDifPer5Min":"Avg Difference/5min","edTypeLabelMarketing2":"","InstagramPageViewsPerSession":"Instagram","imageDialogURL":"Image URL","MEDIAPLAYERConvComplSes":"Mediaplayers","MySpAverageOrderValue":"MySpace","trendRealtime":"Realtime Dashboard KPI Module","PintrestBounceRate":"Pintrest","tl_reportrips":"Products Sold","help_topten":"<font face='Verdana' size='11'>Two kinds of top ten reports are supported: <b>Top 10 Products sorted by Items Sold</b> and <b>Watch Specific Products</b>.  With both you select a report and can then specify whether you want to filter it or limit it to ten selected Products.<br/><br/><b>Top 10 Products sorted by Items Sold</b> shows the ten most active items of the selected metric since midnight. You can specify a string that must be part of the Product ID to restrict this report to a specific range of items rather than all products.<br/>The <b>Watch for Specific Products</b> report option enables you to enter up to ten Product IDs so that only these products are displayed.<br/><br/>Note: Top 25,000 rows available via download icon on module.</font>","tl_reportripg":"Pages Browsed","FaceAverageSessionLength":"Facebook","TumblrAverageOrderValue":"Tumblr","Bottom10VendorsYesterday":"Bottom 10 Vendors Yesterday","tl_reportripb":"Products Browsed","lmTypeLabeltrend":"Spark","lmTypeLabelminFunnel2":"","BarGraphMediaMin_title":"Last 2 Hours 10min interval","MinniFunnelLM":"Benchmark Session Conversion Funnel Module","TargetSales":"Target Sales","SearchOrdersCompleted":"Search Orders Completed","BounceRate":"Bounce Rate","TotalNewSessions":"New Sessions","GooglePlusAverageOrderValue":"Google Plus","TotalOrders":"Orders","funnelBrowse":"Browse","tl_layout3":"My View","user_title":"User Name","MmcRevenueCompleted":"MMC Revenue Completed","tl_layout4":"My View","YTubAverageSessionLength":"Youtube","tl_layout1":"My View","tl_layout2":"My View","edRowOtherLabel":"Other","BraGraphLegent_today":"Today","DirectChannelSalesCompleted":"Direct Channel Sales Completed","edTypeLabelLabel2":"","Top10SearchEnginesYesterday":"Top 10 Search Engines Yesterday","tl_reportrins":"Natural Search Terms","msFilenameLabelTopLine":"Top_Line","projected":"Projected","tl_guagehr":"Per Hour","hourlyTotalNaturalSearchSessions":"Natural Search Sessions / Hour","TotalShopSes":"Shopping Sessions","MySpBounceRate":"MySpace","badRSSFormat":"Unsupported RSS Format:","edCompareChange":"A-B","WordAverageSessionLength":"Wordpress","cumulativeTotalOnePageSessions":"One Page Sessions","help_recent":"<font face='Verdana' size='11'>The <b>Recent Items</b> reports show the ten most recent results for the selected metric.</font>","allViews":"Enterprise Dashboard - All Modules","february":"February","SearchChannelOrdersCompleted":"Search Channel Orders Completed","funnelDirectH":"Direct Load","edAdminTitle":"Manage Site Groups","subVerticalWords":"SubVertical","ReferralChannelSalesCompleted":"Referral Channel Sales Completed","edNoPieChart":"No pie chart available","tl_guage":"Gauge","tl_reportrios":"On-site Search Terms","etDialogButtonDescription":"Watch Specific Products","tl_Label":"Label","BROWSER_Mozilla":"Mozilla","tuesday":"Tuesday","BlogConvComplSes":"Blogspot","downloadAllOption":"Download All"}};
app.get("/rtm/api/translations", (req, res, next) => res.send(translations));

const applicationConfig = {"ED_realtime_refresh_rate_seconds":"60","RD_realtime_refresh_rate_seconds":"60"};
app.get("/rtm/api/application-config", (req, res, next) => res.send(applicationConfig));

const categoryTree = [{"applicationType":"REALTIME_DASHBOARD","categories":[{"id":9,"name":null,"description":null,"type":"STANDARD","applicationType":"REALTIME_DASHBOARD","dashboards":[]},{"id":10,"name":null,"description":null,"type":"PERSONAL","applicationType":"REALTIME_DASHBOARD","dashboards":[]}]},{"applicationType":"ENTERPRISE_DASHBOARD","categories":[{"id":11,"name":null,"description":null,"type":"STANDARD","applicationType":"ENTERPRISE_DASHBOARD","dashboards":[]},{"id":12,"name":null,"description":null,"type":"PERSONAL","applicationType":"ENTERPRISE_DASHBOARD","dashboards":[{"id":1,"title":"test 001","dashboardType":"ENTERPRISE_DASHBOARD"}]}]},{"applicationType":"CUSTOMIZABLE_DASHBOARD","categories":[{"id":13,"name":"Custom 1","description":"test category","type":"SELF_CREATED","applicationType":"CUSTOMIZABLE_DASHBOARD","dashboards":[]}]},{"applicationType":"NO_APPLICATION","categories":[{"id":14,"name":null,"description":null,"type":"SHARED","applicationType":"NO_APPLICATION","dashboards":[]},{"id":15,"name":null,"description":null,"type":"PUBLIC","applicationType":"NO_APPLICATION","dashboards":[]},{"id":16,"name":null,"description":null,"type":"ADMIN","applicationType":"NO_APPLICATION","dashboards":[]}]}];
app.get("/rtm/api/config/category-tree", (req, res, next) => res.send(categoryTree));

const dashboards1 = {"id":1,"title":"test 001","dashboardType":"ENTERPRISE_DASHBOARD","categoryId":null,"subClients":[30000003,30004001,30000001],"dateRange":{"dateId":"201818","period":"WEEK"},"comparisonParams":{"comparisonDateRange":null,"comparisonData":false,"differenceData":false,"percentDifferenceData":false},"widgets":[{"id":1,"widgetItems":[{"type":"TEXT","id":2,"title":"test 001","description":"test 001","typeLabelKey":"text"}]}],"viewDashboard":false};
app.get("/rtm/api/dashboards/1", (req, res, next) => res.send(dashboards1));

const fiscalData = {"code":0,"CalendarDefinition":{"calendarData":{"weeks":{"data":[20120101,20120108,20120115,20120122,20120129,20120205,20120212,20120219,20120226,20120304,20120311,20120318,20120325,20120401,20120408,20120415,20120422,20120429,20120506,20120513,20120520,20120527,20120603,20120610,20120617,20120624,20120701,20120708,20120715,20120722,20120729,20120805,20120812,20120819,20120826,20120902,20120909,20120916,20120923,20120930,20121007,20121014,20121021,20121028,20121104,20121111,20121118,20121125,20121202,20121209,20121216,20121223,20121230,20130101,20130106,20130113,20130120,20130127,20130203,20130210,20130217,20130224,20130303,20130310,20130317,20130324,20130331,20130407,20130414,20130421,20130428,20130505,20130512,20130519,20130526,20130602,20130609,20130616,20130623,20130630,20130707,20130714,20130721,20130728,20130804,20130811,20130818,20130825,20130901,20130908,20130915,20130922,20130929,20131006,20131013,20131020,20131027,20131103,20131110,20131117,20131124,20131201,20131208,20131215,20131222,20131229,20140101,20140105,20140112,20140119,20140126,20140202,20140209,20140216,20140223,20140302,20140309,20140316,20140323,20140330,20140406,20140413,20140420,20140427,20140504,20140511,20140518,20140525,20140601,20140608,20140615,20140622,20140629,20140706,20140713,20140720,20140727,20140803,20140810,20140817,20140824,20140831,20140907,20140914,20140921,20140928,20141005,20141012,20141019,20141026,20141102,20141109,20141116,20141123,20141130,20141207,20141214,20141221,20141228,20150101,20150104,20150111,20150118,20150125,20150201,20150208,20150215,20150222,20150301,20150308,20150315,20150322,20150329,20150405,20150412,20150419,20150426,20150503,20150510,20150517,20150524,20150531,20150607,20150614,20150621,20150628,20150705,20150712,20150719,20150726,20150802,20150809,20150816,20150823,20150830,20150906,20150913,20150920,20150927,20151004,20151011,20151018,20151025,20151101,20151108,20151115,20151122,20151129,20151206,20151213,20151220,20151227,20160101,20160103,20160110,20160117,20160124,20160131,20160207,20160214,20160221,20160228,20160306,20160313,20160320,20160327,20160403,20160410,20160417,20160424,20160501,20160508,20160515,20160522,20160529,20160605,20160612,20160619,20160626,20160703,20160710,20160717,20160724,20160731,20160807,20160814,20160821,20160828,20160904,20160911,20160918,20160925,20161002,20161009,20161016,20161023,20161030,20161106,20161113,20161120,20161127,20161204,20161211,20161218,20161225,20170101,20170108,20170115,20170122,20170129,20170205,20170212,20170219,20170226,20170305,20170312,20170319,20170326,20170402,20170409,20170416,20170423,20170430,20170507,20170514,20170521,20170528,20170604,20170611,20170618,20170625,20170702,20170709,20170716,20170723,20170730,20170806,20170813,20170820,20170827,20170903,20170910,20170917,20170924,20171001,20171008,20171015,20171022,20171029,20171105,20171112,20171119,20171126,20171203,20171210,20171217,20171224,20171231,20180101,20180107,20180114,20180121,20180128,20180204,20180211,20180218,20180225,20180304,20180311,20180318,20180325,20180401,20180408,20180415,20180422,20180429,20180506,20180513,20180520,20180527,20180603,20180610,20180617,20180624,20180701,20180708,20180715,20180722,20180729,20180805,20180812,20180819,20180826,20180902,20180909,20180916,20180923,20180930,20181007,20181014,20181021,20181028,20181104,20181111,20181118,20181125,20181202,20181209,20181216,20181223,20181230,20190101,20190106,20190113,20190120,20190127,20190203,20190210,20190217,20190224,20190303,20190310,20190317,20190324,20190331,20190407,20190414,20190421,20190428,20190505,20190512,20190519,20190526,20190602,20190609,20190616,20190623,20190630,20190707,20190714,20190721,20190728,20190804,20190811,20190818,20190825,20190901,20190908,20190915,20190922,20190929,20191006,20191013,20191020,20191027,20191103,20191110,20191117,20191124,20191201,20191208,20191215,20191222,20191229,20200101,20200105,20200112,20200119,20200126,20200202,20200209,20200216,20200223,20200301,20200308,20200315,20200322,20200329,20200405,20200412,20200419,20200426,20200503,20200510,20200517,20200524,20200531,20200607,20200614,20200621,20200628,20200705,20200712,20200719,20200726,20200802,20200809,20200816,20200823,20200830,20200906,20200913,20200920,20200927,20201004,20201011,20201018,20201025,20201101,20201108,20201115,20201122,20201129,20201206,20201213,20201220,20201227,20210101,20210103,20210110,20210117,20210124,20210131,20210207,20210214,20210221,20210228,20210307,20210314,20210321,20210328,20210404,20210411,20210418,20210425,20210502,20210509,20210516,20210523,20210530,20210606,20210613,20210620,20210627,20210704,20210711,20210718,20210725,20210801,20210808,20210815,20210822,20210829,20210905,20210912,20210919,20210926,20211003,20211010,20211017,20211024,20211031,20211107,20211114,20211121,20211128,20211205,20211212,20211219,20211226,20220101,20220102,20220109,20220116,20220123,20220130,20220206,20220213,20220220,20220227,20220306,20220313,20220320,20220327,20220403,20220410,20220417,20220424,20220501,20220508,20220515,20220522,20220529,20220605,20220612,20220619,20220626,20220703,20220710,20220717,20220724,20220731,20220807,20220814,20220821,20220828,20220904,20220911,20220918,20220925,20221002,20221009,20221016,20221023,20221030,20221106,20221113,20221120,20221127,20221204,20221211,20221218,20221225,20230101]},"months":{"data":[20120101,20120201,20120301,20120401,20120501,20120601,20120701,20120801,20120901,20121001,20121101,20121201,20130101,20130201,20130301,20130401,20130501,20130601,20130701,20130801,20130901,20131001,20131101,20131201,20140101,20140201,20140301,20140401,20140501,20140601,20140701,20140801,20140901,20141001,20141101,20141201,20150101,20150201,20150301,20150401,20150501,20150601,20150701,20150801,20150901,20151001,20151101,20151201,20160101,20160201,20160301,20160401,20160501,20160601,20160701,20160801,20160901,20161001,20161101,20161201,20170101,20170201,20170301,20170401,20170501,20170601,20170701,20170801,20170901,20171001,20171101,20171201,20180101,20180201,20180301,20180401,20180501,20180601,20180701,20180801,20180901,20181001,20181101,20181201,20190101,20190201,20190301,20190401,20190501,20190601,20190701,20190801,20190901,20191001,20191101,20191201,20200101,20200201,20200301,20200401,20200501,20200601,20200701,20200801,20200901,20201001,20201101,20201201,20210101,20210201,20210301,20210401,20210501,20210601,20210701,20210801,20210901,20211001,20211101,20211201,20220101,20220201,20220301,20220401,20220501,20220601,20220701,20220801,20220901,20221001,20221101,20221201,20230101],"startId":201201},"quarters":{"data":[20120101,20120401,20120701,20121001,20130101,20130401,20130701,20131001,20140101,20140401,20140701,20141001,20150101,20150401,20150701,20151001,20160101,20160401,20160701,20161001,20170101,20170401,20170701,20171001,20180101,20180401,20180701,20181001,20190101,20190401,20190701,20191001,20200101,20200401,20200701,20201001,20210101,20210401,20210701,20211001,20220101,20220401,20220701,20221001,20230101],"startId":20121},"years":{"yearStartMonths":[1,1,1,1,1,1,1,1,1,1,1],"firstDayOfWeeks":[1,1,1,1,1,1,1,1,1,1,1],"data":[20120101,20130101,20140101,20150101,20160101,20170101,20180101,20190101,20200101,20210101,20220101,20230101],"yearIds":[2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],"yearStartDates":[20120101,20130101,20140101,20150101,20160101,20170101,20180101,20190101,20200101,20210101,20220101],"yearCountMonths":[12,12,12,12,12,12,12,12,12,12,12],"nonStandard":[false,false,false,false,false,false,false,false,false,false,false],"startId":2012}},"guid":"cme-calendardefinition-30000009-STANDARD-2012-12","type":"STANDARD"}}
app.get("/api/calendar", (req, res, next) => res.send(fiscalData));

const subclients = [{"id":30000001,"name":"QA Retail","master":false},{"id":30000009,"name":"QA Retail - Enterprise Dashboard","master":true},{"id":30000003,"name":"QA Demo WebSite","master":false},{"id":30004001,"name":"QA Content Commerce","master":false}];
app.get("/rtm/api/dashboards/subclients", (req, res, next) => res.send(subclients));

const defaultRoute = (req, res, next) => {
  //const newUrl = "http://aus08-rtweb01.cm.emm.local:8080";
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
