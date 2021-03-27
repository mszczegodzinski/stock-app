import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ErrorComponent from "../ErrorComponent/ErrorText";
import "../../utils/customStyles.css";

const StockList = ({ searchedData, isSearchedDataFetchedSuccessfully }) => {
  const [isNoResult, setIsNoResult] = useState(false);

  useEffect(() => {
    if (searchedData) {
      if (!searchedData.length && isSearchedDataFetchedSuccessfully) {
        setIsNoResult(true);
      }
      if (searchedData.length && isSearchedDataFetchedSuccessfully) {
        setIsNoResult(false);
      }
    }
  }, [searchedData, isSearchedDataFetchedSuccessfully]);

  const renderStockList = () => {
    if (searchedData.length) {
      const result = searchedData.map((el) => {
        return (
          <Grid item xs={12}>
            {el["2. name"]}
          </Grid>
        );
      });
      return result;
    }
    if (isNoResult) {
      return (
        <Grid item xs={12}>
          No result found. Try again
        </Grid>
      );
    }
    return (
      <Grid item xs={12}>
        No stocks were searched yet
      </Grid>
    );
  };

  try {
    const res = renderStockList();
    return (
      <div
        className={
          isNoResult || searchedData.length ? "stock-list-wrapper" : ""
        }
      >
        {res}
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <ErrorComponent message="Result stock list was crashed. Try again" />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    searchedData: state.searchedData,
    isSearchedDataFetchedSuccessfully: state.isSearchedDataFetchedSuccessfully,
  };
};

const actions = null;

export default connect(mapStateToProps, actions)(StockList);
