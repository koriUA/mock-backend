const CONVERSION_FUNNEL = "CONVERSION_FUNNEL";
const LABEL = "LABEL";
const REAL_TIME_MEDIA_REPORT = "REAL_TIME_MEDIA_REPORT";
const RECENT_ITEMS = "RECENT_ITEMS";
const KPI = "KPI";
const FILTERED_REPORTS = "FILTERED_REPORTS";

module.exports = {
  data: {
    1: {
      id: 1,
      title: "Demo Dashboard",
      reports: [
        {
          id: 2,
          metrics: ["TOTAL_ITEMS_ORDERED", "TOTAL_SALES", "TOTAL_SHIPPING"],
          type: FILTERED_REPORTS,
          title: 'Abandoned shopping carts (filtered report)'
        },
        { id: 23, type: CONVERSION_FUNNEL, title: 'Marketing programs' },
        { id: 10, type: CONVERSION_FUNNEL, title: 'Some data 003' },
      ]
    },
    2: {
      id: 2,
      title: "Dashboard 001",
      reports: [
        { id: 4534, type: CONVERSION_FUNNEL, title: 'Some data 003' },
      ]
    },
    3: {
      id: 3,
      title: "My Dashboard",
      reports: [
        { id: 231, metrics: ["ITEMS_PER_ORDER"], type: CONVERSION_FUNNEL, title: 'Some data 001' },
        { id: 232, metrics: ["ITEMS_PER_ORDER"], type: KPI, visualization: 'BAR', cumulative: true, title: 'KPI test' },
        { id: 233, metrics: ["ITEMS_PER_ORDER"], type: KPI, visualization: 'LINE', cumulative: true, title: 'KPI test' },
        { id: 234, metrics: ["ITEMS_PER_ORDER"], type: KPI, visualization: 'PROGRESS', cumulative: true, title: 'KPI test' },
      ]
    },
    5: {
      id: 5,
      title: "Dashboard with all report",
      reports: [
        { id: 5, metrics: ["TOP10_PRODUCTS_FOR_TODAY"], type: RECENT_ITEMS, title: 'Some data 001' },
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
        { id: 23, type: CONVERSION_FUNNEL, title: 'Some data 001', },
      ]
    }
  }
};
