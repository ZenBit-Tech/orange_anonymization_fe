export const REVIEW_AND_RUN_CONSTANTS = {
  spacing: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
  },
  sizes: {
    errorIconSize: 60,
    entityBadgeSize: 30,
    tabContentHeight: 400,
    entityPanelMaxHeight: 400,
  },
  tabs: {
    original: 'original',
    deIdentified: 'de-identified',
  },
  sortOptions: {
    orderInDocument: 'confidence_desc',
    confidence: 'confidence_asc',
    type: 'position_asc',
  },
} as const;
