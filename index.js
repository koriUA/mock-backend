const express = require("express");
const dashboardsData = require("./dashboards-data");
const app = express();
const port = 3099;

const MAX_DELAY = 1000;
const ERROR_POSIBILITY_PERCENT = 0;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Headers", "Authorisation");
    res.setHeader("Access-Control-Request-Headers", "Authori  " + "sation");
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
  res.send([
    { id: 1, title: "Main Dashboard" },
    { id: 2, title: "Dashboard 001" },
    { id: 3, title: "My Dashboard" },
    { id: 4, title: "KPI Trends" },
    { id: 5, title: "Merchandise" },
    { id: 6, title: "Session Analitics" }
  ]);
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
