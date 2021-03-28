import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ErrorComponent from "../ErrorComponent/ErrorText";
import Card from "@material-ui/core/Card";
import "../../utils/customStyles.css";

const cardStyle = {
  marginBottom: "20px",
  padding: "10px",
  backgroundColor: "#777",
  color: "#FFF",
};

const StockList = ({
  searchedData,
  isSearchedDataFetchedSuccessfully,
  filteredData,
}) => {
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
    if (filteredData.length) {
      const result = filteredData.map((el) => {
        return (
          <Card style={cardStyle}>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{el["1. symbol"]}</div>
                <div>{el["2. name"]}</div>
              </div>
              <div>{el["4. region"]}</div>
            </Grid>
          </Card>
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
        style={{ marginTop: "25px" }}
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
