const CONVERSION_FUNNEL = "CONVERSION_FUNNEL";
const FILTERED_REPORTS = "FILTERED_REPORTS";
const REAL_TIME_MEDIA_CHART = "REAL_TIME_MEDIA_CHART";
const REAL_TIME_MEDIA_REPORT = "REAL_TIME_MEDIA_REPORT";
const RECENT_ITEMS = "RECENT_ITEMS";
const KPI = "KPI";




module.exports = {
  data: {
    [CONVERSION_FUNNEL]: {
      metrics: [
        {
          "metricId": "CUMULATIVE_SALES",
        },
        {
          "metricId": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [FILTERED_REPORTS]: {
      metrics: [
        {
          "metricId": "TOTAL_SALES",
        },
        {
          "metricId": "TOTAL_ORDERS",
        },
        {
          "metricId": "TOTAL_ITEMS_ORDERED",
        },
        {
          "metricId": "TOTAL_SHIPPING",
        },
        {
          "metricId": "TOTAL_PAGE_VIEWS",
        },
        {
          "metricId": "TOTAL_PRODUCT_VIEWS",
        },
        {
          "metricId": "TOTAL_ONSITE_SEARCH",
        },
        {
          "metricId": "TOTAL_SESSIONS",
        },
        {
          "metricId": "BUYING_SESSIONS_COMPLETED",
        },
        {
          "metricId": "TOTAL_NEW_SESSIONS",
        },
        {
          "metricId": "TOTAL_REPEATED_SESSIONS",
        },
        {
          "metricId": "TOTAL_MMC_SESSIONS",
        },
        {
          "metricId": "TOTAL_DIRECT_LOAD_SESSIONS",
        },
        {
          "metricId": "TOTAL_NATURAL_SEARCH_SESSIONS",
        },
        {
          "metricId": "TOTAL_REFERRAL_SESSIONS",
        },
        {
          "metricId": "AVERAGE_SESSION_LENGTH",
        },
        {
          "metricId": "AVERAGE_ORDER_VALUE",
        },
        {
          "metricId": "ITEMS_PER_ORDER",
        },
        {
          "metricId": "SHIPPING_PER_ORDER",
        },
        {
          "metricId": "AVERAGE_ITEMS_IN_SHOPPING_CART",
        },
        {
          "metricId": "ABANDONED_SHOPPING_CARTS",
        },
        {
          "metricId": "BUYING_SESSIONS_PER_SESSION",
        },
        {
          "metricId": "PAGE_VIEWS_PER_SESSION",
        },
        {
          "metricId": "PRODUCT_VIEWS_PER_SESSION",
        },
        {
          "metricId": "ONSITE_SEARCHES_PER_SESSION",
        },
        {
          "metricId": "ELEMENT_VIEWS",
        },
        {
          "metricId": "ONE_PAGE_SESSIONS",
        },
        {
          "metricId": "EVENTS_INITIATED",
        },
        {
          "metricId": "EVENTS_COMPLETED",
        },
        {
          "metricId": "EVENT_POINTS",
        }
      ],
    },
    [REAL_TIME_MEDIA_CHART]: {
      metrics: [
        {
          "metricId": "CUMULATIVE_SALES",
        },
        {
          "metricId": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [REAL_TIME_MEDIA_REPORT]: {
      metrics: [
        {
          "metricId": "CUMULATIVE_SALES",
        },
        {
          "metricId": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [RECENT_ITEMS]: {
      metrics: [
        {
          "metricId": "CUMULATIVE_SALES",
        },
        {
          "metricId": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [KPI]: {
      "metrics": {
        "LINE": [
          {
            "metricId": "TOTAL_SALES",
            "cumulative": true,
            "last24Hours": false,
            "projected": true
          },
          {
            "metricId": "TOTAL_ORDERS",
            "cumulative": true,
            "last24Hours": true,
            "projected": true
          }
        ],
        "BAR": [
          {
            "metricId": "TOTAL_SALES_BAR",
            "cumulative": false,
            "last24Hours": false,
            "projected": false
          },
          {
            "metricId": "TOTAL_ORDERS_BAR",
            "cumulative": true,
            "last24Hours": true,
            "projected": true
          }
        ]
      }
    }
  }
};
