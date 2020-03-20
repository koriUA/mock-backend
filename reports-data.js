module.exports = {
  CONVERSION_EVENTS: [
    {
      ConversionEventCategoryId: 'gaaab',
      ConversionEventId: 'test_gaaab',

      // rest 3 metrics that I send to backend before;
      TotalConversionsInitiated: 22840,
      TotalConversionPoints: 223,
      TotalConversionsCompleted: 233
    }
  ],
  MARKETING_PROGRAMS: [
    {
      VendorId: 'googlepaidnn',
      CategoryId: 'q-qvc+keyword',
      PlacementId: 'qvc+-+e',
      ItemId: 'sy3i0jtvg%7Cdm_282258393262_qvc__e_campid_60836220__pgrid_2069539260_ptaid_kwd-14923250',

      // rest metrics that I send to backend before;
      TotalSales: 32234,
      TotalOrders: 122,
      TotalSessions: 12
    },
  ],
  PRODUCTS: [ // UI send only report type
    {
      ProductId: 'Disle of paradise self-tanning+drops butter auto-delivery',
      TotalSales: 196112.80,
      BuyingSessionsCompleted: 4304,
      ItemsSold: 300
    },
    {
      ProductId: 'be be beb e....',
      TotalSales: 2235.14,
      BuyingSessionsCompleted: 434,
      ItemsSold: 150
    }
  ],
  SEARCH_ENGINES: [  // UI send only report type
    {
      SearchEngines: 'google.com',
      TotalSales: 87829.46,
      TotalSessions: 16351,
      TotalOrders: 123
    },
    {
      SearchEngines: 'com.google.android.googlequicksearchbox',
      TotalSales: 43225.46,
      TotalSessions: 53351,
      TotalOrders: 523
    },
  ],
  MARKETING_VENDORS: [ // UI send only report type
    {
      VendorId: 'impactradius',
      TotalSales: 86455.03,
      TotalSessions: 21070,
      TotalOrders: 1427,
      // TotalPageViews    backend send them in legacy but don't know why...
      // TotalConversionPoints
      // TotalConversionsCompleted
    }
  ],
  RECENT_ITEMS: []
};
