const express = require('express');
const app = express();
const port = 3099;

const MAX_DELAY = 5000;
const ERROR_POSIBILITY_PERCENT = 5;


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === 'OPTIONS') {
    res.setHeader("Access-Control-Allow-Headers", "Authorisation");
    res.setHeader("Access-Control-Request-Headers", "Authori  " +
      "sation");
    next();
    return;
  }
  if (Math.random() < ERROR_POSIBILITY_PERCENT / 100) {
    return res.sendStatus(500);
  }
  setTimeout(() => {
    next();
  }, Math.random() * MAX_DELAY)
});



app.get('/fetch-report-details-by-id', (req, res, next) => {
  res.send({
    data: {
      availableMetrics: [
        { id: 1, title: 'Total Sales', type: 'currency' },
        { id: 2, title: 'Order per session', type: 'percent' },
        { id: 3, title: 'Average shipping', type: 'currency' },
      ],
    },
  });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
