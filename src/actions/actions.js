import types from "../types";

const fetchUrl = "https://www.alphavantage.co/query?function=";
const key = process.env.REACT_APP_KEY;

export const getTimeSeriesDailyAdjusted = (symbol) => (dispatch) => {
  fetch(`${fetchUrl}TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${key}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      // console.log("time series daily adjusted ", data);
      dispatch({
        type: types.FETCH_TIME_SERIES_DAILY_ADJUSTED_SUCCESSFULLY,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.FETCH_TIME_SERIES_DAILY_ADJUSTED_FAILED });
    });
};

export const getGlobalQuoteCompany = (symbol) => (dispatch) => {
  resetGlobalQuoteCompany();
  fetch(`${fetchUrl}GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      // console.log("global quote ", data);
      dispatch({
        type: types.FETCH_GLOBAL_QUOTE_SUCCESSFULLY,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.FETCH_GLOBAL_QUOTE_FAILED });
    });
};

export const resetGlobalQuoteCompany = () => (dispatch) => {
  dispatch({ type: types.RESET_GLOBAL_QUOTE });
};

export const getSearchComponentData = (searchedPhrase) => (dispatch) => {
  dispatch({ type: types.IS_SEARCH_DATA_LOADING, payload: true });
  fetch(`${fetchUrl}SYMBOL_SEARCH&keywords=${searchedPhrase}&apikey=${key}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      dispatch({ type: types.IS_SEARCH_DATA_LOADING, payload: false });
      dispatch({
        type: types.FETCH_SEARCH_ENDPOINT_DATA,
        isSearchedDataFetchedSuccessfully: true,
        isSearchedDataFetchedFailed: false,
        payload: data.bestMatches,
      });
    })
    .catch((err) => {
      dispatch({ type: types.IS_SEARCH_DATA_LOADING, payload: false });
      dispatch({
        type: types.FETCH_SEARCH_ENDPOINT_DATA,
        isSearchedDataFetchedSuccessfully: false,
        isSearchedDataFetchedFailed: true,
        payload: [],
      });
    });
};

export const closeSearchDataNotification = (searchedData) => (dispatch) => {
  dispatch({
    type: types.FETCH_SEARCH_ENDPOINT_DATA,
    payload: searchedData,
    isSearchedDataFetchedSuccessfully: false,
    isSearchedDataFetchedFailed: false,
  });
};

export const setSearchDataLoading = (currentValue) => (dispatch) => {
  dispatch({ type: types.IS_SEARCH_DATA_LOADING, payload: currentValue });
};

export const getOverview = (symbol) => (dispatch) => {
  dispatch({ type: types.IS_OVERVIEW_DATA_LOADING, payload: true });
  fetch(`${fetchUrl}OVERVIEW&symbol=${symbol}&apikey=${key}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log("overview data ", data);
      dispatch({ type: types.IS_OVERVIEW_DATA_LOADING, payload: false });
      dispatch({ type: types.FETCH_OVERVIEW_DATA_SUCCESSFULLY, payload: data });
    })
    .catch((err) => {
      dispatch({ type: types.IS_OVERVIEW_DATA_LOADING, payload: false });
      dispatch({ type: types.FETCH_OVERVIEW_DATA_FAILED, payload: {} });
    });
};

export const setOverviewDataLoading = (currentValue) => (dispatch) => {
  dispatch({ type: types.IS_OVERVIEW_DATA_LOADING, payload: currentValue });
};

export const saveOpenPositions = (openPositions) => (dispatch) => {
  dispatch({ type: types.SAVE_OPEN_POSITIONS, payload: openPositions });
};

export const resetOpenPositions = () => (dispatch) => {
  dispatch({ type: types.RESET_OPEN_POSITIONS, payload: [] });
};
