const express = require("express");
const dashboardsData = require("./dashboards-data");
const metricsData = require("./metrics-data");

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({ limit: "10mb", extended: true }));
const port = 3099;

const MAX_DELAY = 0;
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

app.get("/fetch-report-details-by-id", (req, res, next) => {
  res.send({
    data: {
      availableMetrics: [
        { id: 1, title: "Total Sales", type: "currency" },
        { id: 2, title: "Order per session", type: "percent" },
        { id: 3, title: "Average shipping", type: "currency" }
      ]
    }
  });
});

app.get("/dashboards", (req, res, next) => {
  const data = Object.keys(dashboardsData.data).map(key => {
    return {
      id: dashboardsData.data[key].id,
      title: dashboardsData.data[key].title
    };
  });
  res.send(data);
});

app.get("/dashboards/:id", (req, res, next) => {
  res.send(dashboardsData.data[req.params.id] || dashboardsData.data[3]);
});

app.get("/report-line/:id", (req, res, next) => {
  const arr = new Array(10).fill(1);
  res.send({
    cols: ["item", "value"],
    values: arr.map((_, index) => [
      `item-${index + 1}`,
      Math.ceil(Math.random() * 100)
    ])
  });
});

app.get("/api/kpi/:id", (req, res, next) => {
  let { cumulative } = req.params;
  if (!cumulative) cumulative = false;
  const arr = new Array(10).fill(1);
  res.send({
    values: arr.map((_, index) => ({
      item: `item-${index + 1}`,
      value: Math.ceil(Math.random() * 100)
    })),
    cumulative
  });
});

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

function getPercents(a, b) {
  return ((a / b) * 100).toFixed(2);
}

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
      label: `${val}k/${getPercents(val, initialMax)}%`,
      value: val
    };
  });

  res.send(data.reverse());
});

app.get("/api/gauge/:id", (req, res, next) => {
  return res.send({
    value: Math.ceil(Math.random() * 100)
  });
});

app.post("/dashboards/:id", (req, res, next) => {
  const data = req.body;
  data.reports = data.reports.map(el => {
    if (!el.id) {
      el.id = Math.floor(Math.random() * 10000000);
    }
    return el;
  });
  dashboardsData.data[req.params.id] = req.body;
  res.send(req.body);
});

app.put("/dashboards", (req, res, next) => {
  const data = req.body;
  data.reports = data.reports.map(el => {
    if (!el.id) {
      el.id = Math.floor(Math.random() * 10000000);
    }
    return el;
  });
  const randDashboardId = Math.floor(Math.random() * 10000000);
  data.id = randDashboardId;
  dashboardsData.data[randDashboardId] = data;
  res.send(req.body);
});

app.get("/report-details/:reportType", (req, res, next) => {
  res.send(metricsData.data[req.params.reportType]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
