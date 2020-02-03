const TREND = "TREND";
const CUMULATIVE_TREND = "CUMULATIVE_TREND";

const CONVERSION_FUNNEL = "CONVERSION_FUNNEL";
const FILTERED_REPORTS = "FILTERED_REPORTS";
const GAUGE = "GAUGE";
const HOURLY_BAR_CHART = "HOURLY_BAR_CHART";
const IMAGE = "IMAGE";
const LABEL = "LABEL";
const PROGRESS_BAR = "PROGRESS_BAR";
const REAL_TIME_MEDIA_CHART = "REAL_TIME_MEDIA_CHART";
const REAL_TIME_MEDIA_REPORT = "REAL_TIME_MEDIA_REPORT";
const RECENT_ITEMS = "RECENT_ITEMS";
const RSS = "RSS";
const KPI = "KPI";




module.exports = {
  data: {
    [TREND]: {
      metrics: [
        {
          "id": "TOTAL_SALES",
        },
        {
          "id": "TOTAL_ORDERS",
        },
        {
          "id": "TOTAL_ITEMS_ORDERED",
        },
        {
          "id": "TOTAL_SHIPPING",
        },
        {
          "id": "TOTAL_PAGE_VIEWS",
        },
        {
          "id": "TOTAL_PRODUCT_VIEWS",
        },
        {
          "id": "TOTAL_ONSITE_SEARCH",
        },
        {
          "id": "TOTAL_SESSIONS",
        },
        {
          "id": "BUYING_SESSIONS_COMPLETED",
        },
        {
          "id": "TOTAL_NEW_SESSIONS",
        },
        {
          "id": "TOTAL_REPEATED_SESSIONS",
        },
        {
          "id": "TOTAL_MMC_SESSIONS",
        },
        {
          "id": "TOTAL_DIRECT_LOAD_SESSIONS",
        },
        {
          "id": "TOTAL_NATURAL_SEARCH_SESSIONS",
        },
        {
          "id": "TOTAL_REFERRAL_SESSIONS",
        },
        {
          "id": "AVERAGE_SESSION_LENGTH",
        },
        {
          "id": "AVERAGE_ORDER_VALUE",
        },
        {
          "id": "ITEMS_PER_ORDER",
        },
        {
          "id": "SHIPPING_PER_ORDER",
        },
        {
          "id": "AVERAGE_ITEMS_IN_SHOPPING_CART",
        },
        {
          "id": "ABANDONED_SHOPPING_CARTS",
        },
        {
          "id": "BUYING_SESSIONS_PER_SESSION",
        },
        {
          "id": "PAGE_VIEWS_PER_SESSION",
        },
        {
          "id": "PRODUCT_VIEWS_PER_SESSION",
        },
        {
          "id": "ONSITE_SEARCHES_PER_SESSION",
        },
        {
          "id": "ELEMENT_VIEWS",
        },
        {
          "id": "ONE_PAGE_SESSIONS",
        },
        {
          "id": "EVENTS_INITIATED",
        },
        {
          "id": "EVENTS_COMPLETED",
        },
        {
          "id": "EVENT_POINTS",
        }
      ],
    },
    [CUMULATIVE_TREND]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
        {
          "id": "CUMULATIVE_ITEMS_ORDERED",
        },
        {
          "id": "CUMULATIVE_PAGE_VIEWS",
        },
        {
          "id": "CUMULATIVE_PRODUCT_VIEWS",
        },
        {
          "id": "CUMULATIVE_ONSITE_SEARCHES",
        },
        {
          "id": "CUMULATIVE_SESSSIONS",
        },
        {
          "id": "CUMULATIVE_BUYING_SESSIONS",
        },
        {
          "id": "CUMULATIVE_NEW_SESSSIONS",
        },
        {
          "id": "CUMULATIVE_REPEAT_SESSIONS",
        },
        {
          "id": "CUMULATIVE_MMC_SESSIONS",
        },
        {
          "id": "CUMULATIVE_DIRECT_LOAD_SESSIONS",
        },
        {
          "id": "CUMULATIVE_NATURAL_SEARCH_SESSIONS",
        },
        {
          "id": "CUMULATIVE_REFERRAL_SESSIONS",
        },
        {
          "id": "CUMULATIVE_ELEMENT_VIEWS",
        },
        {
          "id": "CUMULATIVE_ONE_PAGE_SESSIONS",
        },
        {
          "id": "CUMULATIVE_EVENTS_INITIATED",
        },
        {
          "id": "CUMULATIVE_EVENTS_COMPLETED",
        },
        {
          "id": "CUMULATIVE_EVENT_POINTS",
        }
      ],
    },
    [CONVERSION_FUNNEL]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [FILTERED_REPORTS]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [CONVERSION_FUNNEL]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [GAUGE]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [CONVERSION_FUNNEL]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [HOURLY_BAR_CHART]: {
      metrics: [
        {
          "id": "SOME_SALES",
        },
        {
          "id": "SOME_ORDERS",
        },
        {
          "id": "EDITABLE_BAR_MEDIA"
        }
      ],
    },
    [CONVERSION_FUNNEL]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [PROGRESS_BAR]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [REAL_TIME_MEDIA_CHART]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [CONVERSION_FUNNEL]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [REAL_TIME_MEDIA_REPORT]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [RECENT_ITEMS]: {
      metrics: [
        {
          "id": "CUMULATIVE_SALES",
        },
        {
          "id": "CUMULATIVE_ORDERS",
        },
      ],
    },
    [KPI]: {
      metrics: [
        {
          "id": "TOTAL_SALES",
        },
        {
          "id": "TOTAL_ORDERS",
        },
        {
          "id": "TOTAL_ITEMS_ORDERED",
        },
        {
          "id": "TOTAL_SHIPPING",
        },
        {
          "id": "TOTAL_PAGE_VIEWS",
        },
        {
          "id": "TOTAL_PRODUCT_VIEWS",
        },
        {
          "id": "TOTAL_ONSITE_SEARCH",
        },
        {
          "id": "TOTAL_SESSIONS",
        },
        {
          "id": "BUYING_SESSIONS_COMPLETED",
        },
        {
          "id": "TOTAL_NEW_SESSIONS",
        },
        {
          "id": "TOTAL_REPEATED_SESSIONS",
        },
        {
          "id": "TOTAL_MMC_SESSIONS",
        },
        {
          "id": "TOTAL_DIRECT_LOAD_SESSIONS",
        },
        {
          "id": "TOTAL_NATURAL_SEARCH_SESSIONS",
        },
        {
          "id": "TOTAL_REFERRAL_SESSIONS",
        },
        {
          "id": "AVERAGE_SESSION_LENGTH",
        },
        {
          "id": "AVERAGE_ORDER_VALUE",
        },
        {
          "id": "ITEMS_PER_ORDER",
        },
        {
          "id": "SHIPPING_PER_ORDER",
        },
        {
          "id": "AVERAGE_ITEMS_IN_SHOPPING_CART",
        },
        {
          "id": "ABANDONED_SHOPPING_CARTS",
        },
        {
          "id": "BUYING_SESSIONS_PER_SESSION",
        },
        {
          "id": "PAGE_VIEWS_PER_SESSION",
        },
        {
          "id": "PRODUCT_VIEWS_PER_SESSION",
        },
        {
          "id": "ONSITE_SEARCHES_PER_SESSION",
        },
        {
          "id": "ELEMENT_VIEWS",
        },
        {
          "id": "ONE_PAGE_SESSIONS",
        },
        {
          "id": "EVENTS_INITIATED",
        },
        {
          "id": "EVENTS_COMPLETED",
        },
        {
          "id": "EVENT_POINTS",
        }
      ],
    }
  }
};
