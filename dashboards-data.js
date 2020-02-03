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
const KPI = "KPI";

module.exports = {
  data: {
    1: {
      id: 1,
      title: "Demo Dashboard",
      reports: [
        {
          id: 1,
          metrics: ["TOTAL_ITEMS_ORDERED"],
          type: TREND,
          title: 'Abandoned shopping carts'
        },
        { id: 23, type: CONVERSION_FUNNEL, title: 'Marketing programs' },
        { id: 12, metrics: ["EDITABLE_BAR_MEDIA"], type: HOURLY_BAR_CHART, title: 'Some data 001' },
        { id: 8, metrics: ["ABANDONED_SHOPPING_CARTS"], type: TREND, title: 'Some data 002' },
        { id: 10, type: CONVERSION_FUNNEL, title: 'Some data 003' },
        { id: 6, metrics: ["CURRENT_SESSSIONS"], type: GAUGE, title: 'Some data 003' },
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
          title: 'Some data 001'
        },
        { id: 31, metrics: ["ITEMS_PER_ORDER"], type: PROGRESS_BAR, title: 'Some data 001' }
      ]
    },
    3: {
      id: 3,
      title: "My Dashboard",
      reports: [
        { id: 231, metrics: ["ITEMS_PER_ORDER"], type: TREND, title: 'Some data 001' },
        { id: 232, metrics: ["ITEMS_PER_ORDER"], type: KPI, visualization: 'BAR', cumulative: true, title: 'KPI test' },
      ]
    },
    5: {
      id: 5,
      title: "Dashboard with all report",
      reports: [
        {
          id: 1,
          metrics: ["TOTAL_ITEMS_ORDERED"],
          type: TREND,
          title: 'Some data 001'
        },
        { id: 2, metrics: ["ITEMS_PER_ORDER"], type: TREND, title: 'Some data 001' },
        { id: 3, metrics: ["TOTAL_ITEMS_ORDERED"], type: CUMULATIVE_TREND, title: 'Some data 001' },
        { id: 4, metrics: ["TOTAL_SALES"], type: PROGRESS_BAR, title: 'Some data 001' },
        { id: 5, metrics: ["TOP10_PRODUCTS_FOR_TODAY"], type: RECENT_ITEMS, title: 'Some data 001' },
        { id: 6, metrics: ["CURRENT_SESSSIONS"], type: GAUGE, title: 'Some data 001' },
        { id: 7, metrics: ["CURRENT_ACTIVE_SHOPING_CARTS"], type: GAUGE, title: 'Some data 001' },
        { id: 8, metrics: ["ABANDONED_SHOPPING_CARTS"], type: TREND, title: 'Some data 001' },
        { id: 9, type: LABEL, title: "some label...." },
        { id: 10, type: CONVERSION_FUNNEL },
        {
          id: 11,
          title: 'Some data 001',
          metrics: ["EDITABLE_TABLE_MEDIA"],
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
        { id: 12, metrics: ["EDITABLE_BAR_MEDIA"], type: HOURLY_BAR_CHART, title: 'Some data 001', },
        { id: 23, type: CONVERSION_FUNNEL, title: 'Some data 001', },
        { id: 24, metrics: ["TOTAL_SESSIONS"], type: CUMULATIVE_TREND, title: 'Some data 001', },
        { id: 25, metrics: ["TOTAL_SESSIONS"], type: CUMULATIVE_TREND, title: 'Some data 001', }
      ]
    }
  }
};
