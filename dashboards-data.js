const CONVERSION_FUNNEL = "CONVERSION_FUNNEL";
const CUMULATIVE_TREND = "CUMULATIVE_TREND";
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
const TREND = "TREND";

module.exports = {
  data: {
    1: {
      id: 1,
      title: "Main Dashboard",
      reports: [
        {
          id: 1,
          metrics: ["TOTAL_ITEMS_ORDERED"],
          type: TREND,
          scale: "100",
          x: "130",
          y: "29"
        },
        { id: 2, metrics: ["ITEMS_PER_ORDER"], type: TREND },
        { id: 3, metrics: ["TOTAL_ITEMS_ORDERED"], type: CUMULATIVE_TREND },
        { id: 4, metrics: ["TOTAL_SALES"], type: PROGRESS_BAR },
        { id: 5, metrics: ["TOP10_PRODUCTS_FOR_TODAY"], type: RECENT_ITEMS },
        { id: 6, metrics: ["CURRENT_SESSSIONS"], type: GAUGE },
        { id: 7, metrics: ["CURRENT_ACTIVE_SHOPING_CARTS"], type: GAUGE },
        { id: 8, metrics: ["ABANDONED_SHOPPING_CARTS"], type: TREND },
        { id: 9, type: LABEL },
        { id: 10, type: CONVERSION_FUNNEL },
        {
          id: 11,
          metrics: ["EDITABLE_TABLE_MEDIA"],
          scale: "100",
          y: "371",
          x: "845.45",
          andy: "isCool",
          metricsMedDown:
            "TotalConversionPoints_media,TotalConversionsInitiated_media,TotalConversionsCompleted_media,AverageEventPoints_media",
          headerLabelsStDownload:
            "Article Category,Article,Page Views,Page Views % of Total,Article Initiated,Article Initiated % of Total,Article Completed,Article Completed % of Total,Average Page Views",
          headerLabels:
            "Article,Article Category,Article Category And Article,Page Views,Article Initiated,Article CompletedPage Views,,Article Initiated,,Article Completed,,Average Page Views",
          metrics:
            "TotalConversionPoints_media,PercentTotalConversionPoints_media,TotalConversionsInitiated_media,PercentTotalConversionsInitiated_media,TotalConversionsCompleted_media,PercentTotalConversionsCompleted_media,AverageEventPoints_media",
          tableFilters:
            "aaaaaa^|^cccccc,bbbbbb^|^dddddd,^|^,^|^,^|^,^|^,^|^,^|^,^|^,^|^,",
          filterOn: "ConversionEventIdAndCategory_media",
          metric_4: "AverageEventPoints_media",
          metric_3: "TotalConversionsCompleted_media",
          metric_2: "TotalConversionsInitiated_media",
          metric_1: "TotalConversionPoints_media",
          sortMetric: "TotalConversionPoints_media",
          timePeriodLabel: "Today",
          timePeriod: "today",
          displayNum: "10",
          isFiltered: "true",
          title: "Real Time Media",
          filterType: "conversionEvents",
          type: REAL_TIME_MEDIA_REPORT,
          repType: REAL_TIME_MEDIA_REPORT,
          repNameLabel: "Conversion Events"
        },
        { id: 12, metrics: ["EDITABLE_BAR_MEDIA"], type: HOURLY_BAR_CHART },
        { id: 23, type: CONVERSION_FUNNEL },
        { id: 24, metrics: ["TOTAL_SESSIONS"], type: CUMULATIVE_TREND },
        { id: 25, metrics: ["TOTAL_SESSIONS"], type: CUMULATIVE_TREND }
      ]
    },
    2: {
      id: 2,
      title: "Dashboard 001",
      reports: [
        {
          id: 14,
          metrics: ["TOTAL_ITEMS_ORDERED"],
          type: TREND,
          scale: "100",
          x: "130",
          y: "29"
        },
        { id: 31, metrics: ["ITEMS_PER_ORDER"], type: PROGRESS_BAR }
      ]
    },
    3: {
      id: 3,
      title: "My Dashboard",
      reports: [{ id: 231, metrics: ["ITEMS_PER_ORDER"], type: TREND }]
    }
  }
};
