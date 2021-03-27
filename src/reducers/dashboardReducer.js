import types from "../types";

const initialState = {
  isDataFetchedSuccessfully: false,
  intradayData: {},
  isSearchedDataFetchedSuccessfully: false,
  isSearchedDataFetchedFailed: false,
  searchedData: [],
  isSearchDataLoading: false,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_INTRADAY_DATA_SUCCESSFULLY:
      return {
        ...state,
        isDataFetchedSuccessfully: true,
        intradayData: action.payload,
      };
    case types.FETCH_INTRADAY_DATA_FAILED:
      return {
        ...state,
        isDataFetchedSuccessfully: false,
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
