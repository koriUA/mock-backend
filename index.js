const express = require("express");
const dashboardsData = require("./dashboards-data");
const metricsData = require("./metrics-data");
const UtilsService = require("./utils");
const request = require("request");
const ReportOptions = require('./report-options-data');
const ReportData = require('./reports-data');

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({ limit: "10mb", extended: true }));
const port = 3099;

const MAX_DELAY = 100;
const ERROR_POSIBILITY_PERCENT = 0;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  if (req.method === "OPTIONS") {
    next();
    return;
  }
  if (Math.random() < ERROR_POSIBILITY_PERCENT / 100) {
    return res.sendStatus(500);
  }
  setTimeout(() => {
    next();
  }, Math.random() * MAX_DELAY);
});

app.get("/api/conversion-funnel", (req, res, next) => {
  const channels = ["Direct", "MMC", "Search", "Referral"];
  res.send({
    data: channels.map(channel => ({
      channel,
      channelData: UtilsService.getChannelData()
    }))
  });
});

app.get("/api/widget-item-config/CONVERSION_EVENTS", (req, res, next) => {
  res.send(ReportOptions.data);
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

app.get("/api/dashboards/:id", (req, res, next) => {
  console.log("GET /api/dashboard/:id");
  res.send(dashboardsData.data[req.params.id]);
});

app.put("/api/dashboards/:id", (req, res, next) => {
  console.log("PUT dashboard........................................");
  const data = req.body;
  data.widgets = data.widgets.map(el => {
    if (!el.id) {
      el.id = Math.floor(Math.random() * 10000000);
    }
    el.widgetItems.map(el1 => {
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

app.post("/api/dashboards", (req, res, next) => {
  console.log("POST dashboard........................................");
  const data = req.body;
  data.widgets = data.widgets.map(el => {
    if (!el.id) {
      el.id = Math.floor(Math.random() * 10000000);
    }
    el.widgetItems.map(el1 => {
      if (!el1.id) {
        el1.id = Math.floor(Math.random() * 10000000);
      }
      return el1;
    });
    return el;
  });
  const randDashboardId = Math.floor(Math.random() * 10000000);
  data.id = randDashboardId;
  dashboardsData.data[randDashboardId] = data;
  res.send(req.body);
});

app.post("/api/report-data", (req, res, next) => {
  res.send({
    data: ReportData[req.body.type]
  });
});


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

app.get("/api/widget-item-config/:type", (req, res, next) => {
  res.send({"metrics":{"LINE":[{"metricId":"AverageOrderValue","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"AverageSessionLength","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"AvgItemsInShoppingCart","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"BuyingSessionsCompleted","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"BuyingSessionsPerSession","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"ItemsPerOrder","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"MmcSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"NumberOfAbandonedShoppingCarts","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"OnsiteSearchesPerSession","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"PageViewsPerSession","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"ProductViewsPerSession","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"ShippingPerOrder","cumulative":false,"last24Hours":true,"projected":true},{"metricId":"TotalConversionPoints","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionsCompleted","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionsInitiated","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalDirectLoadSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalElementViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalItemsOrdered","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalNaturalSearchSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalNewSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOnSiteSearch","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOnePageSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOrders","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalPageViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalProductViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalReferralSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalRepeatedSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalSales","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalShipping","cumulative":false,"last24Hours":true,"projected":true}],"PROGRESS":[{"metricId":"BuyingSessionsCompleted","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"MmcSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionPoints","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionsCompleted","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionsInitiated","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalDirectLoadSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalElementViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalItemsOrdered","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalNaturalSearchSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalNewSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOnSiteSearch","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOnePageSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOrders","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalPageViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalProductViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalReferralSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalRepeatedSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalSales","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalShipping","cumulative":false,"last24Hours":false,"projected":false}],"BAR":[{"metricId":"BuyingSessionsCompleted","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"MmcSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionPoints","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionsCompleted","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalConversionsInitiated","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalDirectLoadSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalElementViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalItemsOrdered","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalNaturalSearchSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalNewSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOnSiteSearch","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOnePageSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalOrders","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalPageViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalProductViews","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalReferralSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalRepeatedSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalSales","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalSessions","cumulative":true,"last24Hours":true,"projected":true},{"metricId":"TotalShipping","cumulative":true,"last24Hours":true,"projected":true}],"NUMBER":[{"metricId":"AverageOrderValue","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"AverageSessionLength","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"AvgItemsInShoppingCart","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"BuyingSessionsCompleted","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"BuyingSessionsPerSession","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"ItemsPerOrder","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"MmcSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"NumberOfAbandonedShoppingCarts","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"OnsiteSearchesPerSession","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"PageViewsPerSession","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"ProductViewsPerSession","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"ShippingPerOrder","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionPoints","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionsCompleted","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalConversionsInitiated","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalDirectLoadSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalElementViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalItemsOrdered","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalNaturalSearchSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalNewSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOnSiteSearch","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOnePageSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalOrders","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalPageViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalProductViews","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalReferralSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalRepeatedSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalSales","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalSessions","cumulative":false,"last24Hours":false,"projected":false},{"metricId":"TotalShipping","cumulative":false,"last24Hours":false,"projected":false}]}});
});

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

const defaultRoute = (req, res, next) => {
  const newUrl = "http://10.239.169.188:8080";
  console.log(`proxy to ${newUrl}${req.originalUrl}...`);
  request({
    method: req.method,
    uri: `${newUrl}${req.originalUrl}`,
    json: req.body
  }).pipe(res);
};
app.get("*", defaultRoute);
app.post("*", defaultRoute);
app.put("*", defaultRoute);
app.delete("*", defaultRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
