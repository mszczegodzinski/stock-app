import types from "../types";

const fetchUrl = "https://www.alphavantage.co/query?function=";
const key = process.env.REACT_APP_KEY;

export const getIntradayData = (symbol) => (dispatch) => {
  fetch(
    `${fetchUrl}TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${key}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log("data ", data);
      dispatch({ type: types.FETCH_INTRADAY_DATA_SUCCESSFULLY, payload: data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.FETCH_INTRADAY_DATA_FAILED });
    });
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
      console.log("intraday data ", data);
      dispatch({ type: types.IS_SEARCH_DATA_LOADING, payload: false });
      dispatch({
        type: types.FETCH_SEARCH_ENDPOINT_DATA,
        isSearchedDataFetchedSuccessfully: true,
        isSearchedDataFetchedFailed: false,
        payload: data.bestMatches,
      });
    })
    .catch((err) => {
      console.log(err);
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
      dispatch({ type: types.FETCH_OVERVIEW_DATA_SUCCESSFULLY, payload: data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.FETCH_OVERVIEW_DATA_FAILED, payload: {} });
    });
};
