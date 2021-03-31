import types from "../types";

const initialState = {
  isTimeSeriesDailyAdjustedFetchedSuccessfully: false,
  isTimeSeriesDailyAdjustedFetchedFailed: false,
  timesSeriesDailyAdjusted: {},
  isSearchedDataFetchedSuccessfully: false,
  isSearchedDataFetchedFailed: false,
  searchedData: [],
  isSearchDataLoading: false,
  isIntradayDataLoading: false,
  isDailyAdjustedDataLoading: false,
  isOverviewDataFetchedSuccessfully: false,
  isOverviewDataFetchedFailed: false,
  overviewData: {},
  isGlobalQuoteFetchSuccessfully: false,
  isGlobalQuoteFetchFailed: false,
  globalQuote: {},
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_OVERVIEW_DATA_SUCCESSFULLY:
      return {
        ...state,
        isOverviewDataFetchedSuccessfully: true,
        isOverviewDataFetchedFailed: false,
        overviewData: action.payload,
      };
    case types.FETCH_OVERVIEW_DATA_FAILED:
      return {
        ...state,
        isOverviewDataFetchedSuccessfully: false,
        isOverviewDataFetchedFailed: true,
        overviewData: {},
      };
    case types.FETCH_TIME_SERIES_DAILY_ADJUSTED_SUCCESSFULLY:
      return {
        ...state,
        isTimeSeriesDailyAdjustedFetchedSuccessfully: true,
        isTimeSeriesDailyAdjustedFetchedFailed: false,
        timesSeriesDailyAdjusted: action.payload,
      };
    case types.FETCH_TIME_SERIES_DAILY_ADJUSTED_FAILED:
      return {
        ...state,
        isTimeSeriesDailyAdjustedFetchedSuccessfully: false,
        isTimeSeriesDailyAdjustedFetchedFailed: true,
        timesSeriesDailyAdjusted: {},
      };
    case types.FETCH_SEARCH_ENDPOINT_DATA:
      return {
        ...state,
        searchedData: action.payload,
        isSearchedDataFetchedSuccessfully:
          action.isSearchedDataFetchedSuccessfully,
        isSearchedDataFetchedFailed: action.isSearchedDataFetchedFailed,
      };
    case types.IS_SEARCH_DATA_LOADING:
      return {
        ...state,
        isSearchDataLoading: action.payload,
      };
    case types.FETCH_GLOBAL_QUOTE_SUCCESSFULLY:
      return {
        ...state,
        isGlobalQuoteFetchSuccessfully: true,
        isGlobalQuoteFetchFailed: false,
        globalQuote: action.payload,
      };
    case types.FETCH_GLOBAL_QUOTE_FAILED:
      return {
        ...state,
        isGlobalQuoteFetchSuccessfully: false,
        isGlobalQuoteFetchFailed: true,
        globalQuote: {},
      };
    case types.RESET_GLOBAL_QUOTE:
      return {
        ...state,
        isGlobalQuoteFetchSuccessfully: false,
        isGlobalQuoteFetchFailed: false,
        globalQuote: {},
      };
    default:
      return state;
  }
};

export default dashboardReducer;
