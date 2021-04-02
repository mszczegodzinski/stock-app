import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import "../../utils/customStyles.css";

const cardStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#777",
  color: "#FFF",
};

const StockList = ({
  searchedData,
  isSearchedDataFetchedSuccessfully,
  filteredData,
  showTransactionWindow,
}) => {
  const [isNoResult, setIsNoResult] = useState(false);

  useEffect(() => {
    if (!searchedData.length && isSearchedDataFetchedSuccessfully) {
      return setIsNoResult(true);
    }
    if (searchedData.length && isSearchedDataFetchedSuccessfully) {
      return setIsNoResult(false);
    }
  }, [searchedData, isSearchedDataFetchedSuccessfully]);

  const renderNoResultMessage = () => {
    if (isNoResult) {
      return (
        <Grid container item xs={12} justify="center">
          <div>No result found. Try again</div>
        </Grid>
      );
    }
  };

  const renderDefaultMessage = () => {
    if (!isNoResult && !filteredData.length) {
      return (
        <Grid container item xs={12} justify="center">
          <div>No stocks were searched yet</div>
        </Grid>
      );
    }
  };

  const renderStockList = () => {
    if (filteredData.length) {
      const result = filteredData.map((el, i) => {
        return (
          <div key={`stock-list-element-${i}`} style={{ minWidth: "100%", marginBottom: "20px" }}>
            <Button
              style={{ padding: "0", minWidth: "100%" }}
              onClick={() => showTransactionWindow(el)}
            >
              <Card style={cardStyle}>
                <Grid item container xs={12} justify="space-between">
                  <div style={{ marginRight: "25px" }}>{el["1. symbol"]}</div>
                  <div style={{ textTransform: "none" }}>{el["2. name"]}</div>
                  <Grid item container xs={12} justify="flex-start">
                    <div>{el["4. region"]}</div>
                  </Grid>
                </Grid>
              </Card>
            </Button>
          </div>
        );
      });
      return result;
    }
  };

  try {
    return (
      <Grid
        container
        item
        xs={12}
        justify="center"
        className={isNoResult || searchedData.length ? "stock-list-wrapper" : null}
        style={{ marginTop: "25px" }}
      >
        {renderStockList()}
        {renderNoResultMessage()}
        {renderDefaultMessage()}
      </Grid>
    );
  } catch (error) {
    return <ErrorComponent message="Result stock list was crashed. Try refresh page" />;
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
