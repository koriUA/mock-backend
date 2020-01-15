module.exports = {
  data: {
    1: [
      { id: 1, metrics: ['TOTAL_ITEMS_ORDERED'], type: 'line', scale: "100", x: "130", y: "29" },
      { id: 2,  metrics: ['ITEMS_PER_ORDER'], type: 'line' },
      { id: 3, metrics: ['TOTAL_ITEMS_ORDERED'], type: 'kpi' },
      { id: 4, metrics: ['TOTAL_SALES'], type: 'bar' },
      { id: 5,  metrics: ['TOP10_PRODUCTS_FOR_TODAY'], type: 'table' },
      { id: 6,  metrics: ['CURRENT_SESSSIONS'], type: 'gauge' },
      { id: 7, metrics: ['CURRENT_ACTIVE_SHOPING_CARTS'], type: 'gauge' },
      { id: 8, metrics: ['ABANDONED_SHOPPING_CARTS'], type: 'line' },
      { id: 9, type: 'label' },
      { id: 10, type: 'funnel' },
      {
        id: 11,
        metrics: ['EDITABLE_TABLE_MEDIA'],
        "type": "editableTableMedia",
        "scale": "100",
        "y": "371",
        "x": "845.45",
        "andy": "isCool",
        "metricsMedDown": "TotalConversionPoints_media,TotalConversionsInitiated_media,TotalConversionsCompleted_media,AverageEventPoints_media",
        "headerLabelsStDownload": "Article Category,Article,Page Views,Page Views % of Total,Article Initiated,Article Initiated % of Total,Article Completed,Article Completed % of Total,Average Page Views",
        "headerLabels": "Article,Article Category,Article Category And Article,Page Views,Article Initiated,Article CompletedPage Views,,Article Initiated,,Article Completed,,Average Page Views",
        "metrics": "TotalConversionPoints_media,PercentTotalConversionPoints_media,TotalConversionsInitiated_media,PercentTotalConversionsInitiated_media,TotalConversionsCompleted_media,PercentTotalConversionsCompleted_media,AverageEventPoints_media",
        "tableFilters": "aaaaaa^|^cccccc,bbbbbb^|^dddddd,^|^,^|^,^|^,^|^,^|^,^|^,^|^,^|^,",
        "filterOn": "ConversionEventIdAndCategory_media",
        "metric_4": "AverageEventPoints_media",
        "metric_3": "TotalConversionsCompleted_media",
        "metric_2": "TotalConversionsInitiated_media",
        "metric_1": "TotalConversionPoints_media",
        "sortMetric": "TotalConversionPoints_media",
        "timePeriodLabel": "Today",
        "timePeriod": "today",
        "displayNum": "10",
        "isFiltered": "true",
        "title": "Real Time Media",
        "filterType": "conversionEvents",
        "type": "editableTableMedia",
        "repType": "editableTableMedia",
        "repNameLabel": "Conversion Events"
      },
      { id: 11, metrics: ["EDITABLE_BAR_MEDIA"], type: "barMedia" },
      { id: 11, type: "conversion" },
      { id: 11, metrics: [ "TOTAL_SESSIONS"], type: "topline" },
      { id: 11, metrics: [ "TOTAL_SESSIONS"], type: "compaire" }
    ],
    2: [
      { id: 14, metrics: ['TOTAL_ITEMS_ORDERED'], type: 'line', scale: "100", x: "130", y: "29" },
      { id: 31, metrics: ['ITEMS_PER_ORDER'], type: 'line' },
    ],
    3: [
      { id: 231, metrics: ['ITEMS_PER_ORDER'], type: 'line' },
    ]
  }
};
