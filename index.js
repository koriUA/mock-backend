const express = require("express");
const dashboardsData = require("./dashboards-data");

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({limit: '10mb', extended: true}));
const port = 3099;

const MAX_DELAY = 1000;
const ERROR_POSIBILITY_PERCENT = 0;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
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
  const data = Object.keys(dashboardsData.data).map((key) => {
    return {
      id: dashboardsData.data[key].id,
      title: dashboardsData.data[key].title,
    }
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

app.post("/dashboards/:id", (req, res, next) => {
  dashboardsData.data[req.params.id] = req.body;
  res.send(req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
