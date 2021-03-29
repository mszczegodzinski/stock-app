import types from "../types";

const initialState = {
  isIntradayDataFetchedSuccessfully: false,
  isIntradayDataFetchedFailed: false,
  intradayData: {},
  isSearchedDataFetchedSuccessfully: false,
  isSearchedDataFetchedFailed: false,
  searchedData: [],
  isSearchDataLoading: false,
  isIntradayDataLoading: false,
  isDailyAdjustedDataLoading: false,
  isOverviewDataFetchedSuccessfully: false,
  isOverviewDataFetchedFailed: false,
  overviewData: {},
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
    case types.FETCH_INTRADAY_DATA_SUCCESSFULLY:
      return {
        ...state,
        isIntradayDataFetchedSuccessfully: true,
        isIntradayDataFetchedFailed: false,
        intradayData: action.payload,
      };
    case types.FETCH_INTRADAY_DATA_FAILED:
      return {
        ...state,
        isIntradayDataFetchedSuccessfully: false,
        isIntradayDataFetchedFailed: true,
        intradayData: {},
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
    default:
      return state;
  }
};

export default dashboardReducer;
