export const PATH_TEMPLATES = {
  HOME: '/',
  GERMANY: '/deutschland',
  STATE: '/deutschland/:stateIdName()',
  KREIS: '/deutschland/:stateIdName()/:kreisIdName()',
  GEMEINDE: '/deutschland/:stateIdName()/:kreisIdName()/:gemeindeIdName()'
}
export const PATHS = {
  GERMANY: '/deutschland',
  STATE: (_, stateIdName) => `/deutschland/${stateIdName}`,
  KREIS: ({ stateIdName }, kreisIdName) => `/deutschland/${stateIdName}/${kreisIdName}`,
  GEMEINDE: ({ stateIdName, kreisIdName }, gemeindeIdName) => `/deutschland/${stateIdName}/${kreisIdName}/${gemeindeIdName}`,
  BODENRICHTWERT: '/bodenrichtwerte',
  PROPERTY_VALUE: '/grundstueckswert-ermitteln',
  PROPERTY_SELL: '/grundstueck-verkaufen',
  PRIVACY: '/datenschutz',
  IMPRINT: '/impressum',
  TERMS_AND_CONDITIONS: '/agb',
  CALC_SEO: '/renditerechner-immobilien',
  CALC: '/renditerechner-immobilien/rechner',
  SOLAR: '/solaranlagen-photovoltaik'
}

export const LOCATION_TYPE = {
  GERMANY: 'GERMANY',
  STATE: 'STATE',
  KREIS: 'KREIS',
  GEMEINDE: 'GEMEINDE'
}

export const X_FEATURES = {
  YEARS: 'YEARS',
  PLOT_SIZE: 'PLOT_SIZE',
  BUILDING_PERMISSION: 'BUILDING_PERMISSION',
  DEVELOPMENT_STATUS: 'DEVELOPMENT_STATUS',
  CHILD_LOCATION: 'CHILD_LOCATION'
}
export const X_FEATURES_LY2 = {
  PLOT_SIZE: 'PLOT_SIZE',
  BUILDING_PERMISSION: 'BUILDING_PERMISSION',
  DEVELOPMENT_STATUS: 'DEVELOPMENT_STATUS',
  CHILD_LOCATION: 'CHILD_LOCATION'
}

export const Y_VALUES = {
  PRICE_PER_SQM: 'PRICE_PER_SQM',
  MARKETING_PERIOD: 'MARKETING_PERIOD',
  PROPERTY_COUNT: 'PROPERTY_COUNT'
}

export const X_FEATURE_KEYS = {
  PLOT_SIZE: 'plotSizeRange',
  BUILDING_PERMISSION: 'buildingPermission',
  DEVELOPMENT_STATUS: 'developmentStatus',
  CHILD_LOCATION: 'name',
  YEARS: 'years'
}
export const Y_VALUES_KEYS = {
  PRICE_PER_SQM: 'pricePerSqm',
  MARKETING_PERIOD: 'marketingPeriodInWeeks',
  PROPERTY_COUNT: 'count'
}

export const X_FEATURE_PLOT_SIZE_LABEL_ORDER = [
  '0-250',
  '250-500',
  '500-1000',
  '1000-2000',
  '2000-5000',
  '5000+'
]
export const X_FEATURE_DEVELOPMENT_STATUS = {
  NOT_DEVELOPED: 'NOT_DEVELOPED',
  DEVELOPED_PARTIALLY: 'DEVELOPED_PARTIALLY',
  DEVELOPED: 'DEVELOPED',
  NO_INFORMATION: 'NO_INFORMATION'
}
export const X_FEATURE_DEVELOPMENT_STATUS_LABEL_ORDER = [
  X_FEATURE_DEVELOPMENT_STATUS.NOT_DEVELOPED,
  X_FEATURE_DEVELOPMENT_STATUS.DEVELOPED_PARTIALLY,
  X_FEATURE_DEVELOPMENT_STATUS.DEVELOPED,
  X_FEATURE_DEVELOPMENT_STATUS.NO_INFORMATION
]

export const CHART_UNITS = {
  EURO: 'EURO',
  FLOAT: 'FLOAT',
  COUNT: 'COUNT',
  WEEK: 'WEEK'
}

export const CF_CONTENT_TYPES = {
  CHART: 'trendChart',
  INFO_PAGE: 'infoPage',
  INFO_ARTICLE: 'infoArticle',
  INFO_DROPDOWN: 'infoDropdown',
  INFO_TABLE: 'infoTable',
  INFO_BUTTON: 'infoButton',
  INFO_TEXT_BUTTON_BOX: 'infoTextButtonBox',
  INFO_VIDEO: 'infoVideo',
  INFO_HIGHLIGHT: 'infoHighlight',
  LEGAL_PAGE: 'legalPage',
  CALC_SEO_PAGE: 'calcSeoPage',
  LOCATION_BODENRICHTWERT: 'bodenrichtwert',
  LOCATION_TREND: 'trend',
  LOCATION_FAKTOREN: 'locationFaktoren',
  LOCATION_FAQ: 'locationFaq',
  LOCATION_TREND_ARTICLE: 'trendArticle',
  HOME_FAQ: 'homeFaq'
}

export const META_TITLE_MONTHS = [
  'Jan.',
  'Feb.',
  'März',
  'Apr.',
  'Mai',
  'Juni',
  'Juli',
  'Aug.',
  'Sept.',
  'Okt.',
  'Nov.',
  'Dez.'
]

export const OVERVIEW_STATS_AVG_PRICE_FROM_MULTIPLIER = 0.8
export const OVERVIEW_STATS_AVG_PRICE_TO_MULTIPLIER = 1.2
