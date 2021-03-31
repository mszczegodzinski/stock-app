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
      const result = filteredData.map((el, i) => {
        return (
          <div
            key={`stock-list-element-${i}`}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            <Button
              style={{
                padding: "0",
                minWidth: "100%",
              }}
              onClick={() => showTransactionWindow(el)}
            >
              <Card style={cardStyle}>
                <Grid item xs={12}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ marginRight: "25px" }}>{el["1. symbol"]}</div>
                    <div style={{ textTransform: "none" }}>{el["2. name"]}</div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {el["4. region"]}
                  </div>
                </Grid>
              </Card>
            </Button>
          </div>
        );
      });
      return result;
    }
    if (isNoResult) {
      return (
        <Grid item xs={12}>
          <p>No result found. Try again</p>
        </Grid>
      );
    }
    return (
      <Grid item xs={12}>
        <p>No stocks were searched yet</p>
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
    return (
      <ErrorComponent message="Result stock list was crashed. Try refresh page" />
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
