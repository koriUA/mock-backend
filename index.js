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

app.get('/api/dashboards/config/tree-simplified', async (req, res, next) => {
  console.log('invoked tree config request');

  try {
    const dashboards = await axios.get('http://10.239.169.188:8080/api/dashboards', {
      headers: req.headers
    }).then((response) => response.data);
    const applications = ['REALTIME_DASHBOARD', 'ENTERPRISE_DASHBOARD'];
    const categories = ["STANDARD",
      "SHARED",
      "PERSONAL",
      "PUBLIC",
      "ADMIN"];
  
    const result = applications.map(application => ({
      type: application,
      categories: categories.map(category => ({
        id: category,
        name: category,
        dashboards: dashboards.filter(({dashboardType, id}) =>{
          const isApp = dashboardType === application;
          const isCategory = category === 'STANDARD' ? id % 2 === 0 : id % 2 !== 0;
          return isApp && isCategory; 
        }).map(({id, title}) => ({id, name: title}))
      }))
    }));

    res.status(200).json({applications: result});
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

});

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



const defaultRoute = (req, res, next) => {
  //const newUrl = "http://aus08-rtweb01.cm.emm.local:8080";
  const newUrl = "http://10.239.169.188:8080";
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
