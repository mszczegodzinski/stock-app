import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getSearchComponentData,
  closeSearchDataNotification,
  setSearchDataLoading,
} from "../../actions/actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import utils from "../../utils/utils";
import Grid from "@material-ui/core/Grid";
import ErrorText from "../ErrorComponent/ErrorText";
import StockList from "../StockList/StockList";
import { CircularProgress } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import "../../utils/customStyles.css";

const SearchComponent = ({
  getSearchComponentData,
  isSearchDataLoading,
  isSearchedDataFetchedSuccessfully,
  isSearchedDataFetchedFailed,
  closeSearchDataNotification,
  setSearchDataLoading,
  searchedData,
}) => {
  const [searchedPhrase, setSearchedPhrase] = useState("");
  const [stockInputError, setStockInputError] = useState(false);

  useEffect(() => {
    if (isSearchedDataFetchedSuccessfully) {
      setSearchDataLoading(false);
      setTimeout(() => {
        closeSearchDataNotification(searchedData);
      }, 5000);
    }
  }, [isSearchedDataFetchedSuccessfully]);

  const handleSearchComponentChange = (e) => {
    console.log(e.target.value);
    const isValueIncorrect = utils.validateInput(e.target.value);
    setStockInputError(isValueIncorrect);
    setSearchedPhrase(e.target.value);
  };

  const handleSearchClicked = () => {
    getSearchComponentData(searchedPhrase);
    setSearchedPhrase("");
  };

  try {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <h2
              className="search-module-header"
              style={{ textAlign: "center" }}
            >
              Search company
            </h2>
          </Grid>
          <Grid container item xs={12} justify="center" alignItems="center">
            <TextField
              id="company-input"
              label="Company name or symbol"
              required
              variant="outlined"
              value={searchedPhrase}
              helperText={
                stockInputError
                  ? !searchedPhrase
                    ? "Empty value is not allowed"
                    : "Incorrect value. Signs <, >, / are not allowed."
                  : ""
              }
              error={stockInputError}
              onChange={(e) => handleSearchComponentChange(e)}
              style={{ width: "300px", transition: "0.3s" }}
            />
          </Grid>
          <Grid container item xs={12} justify="center" alignItems="center">
            <Button
              variant="outlined"
              disabled={
                !searchedPhrase ||
                stockInputError ||
                isSearchedDataFetchedSuccessfully ||
                isSearchedDataFetchedFailed
              }
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                transition: "0.3s",
              }}
              onClick={handleSearchClicked}
            >
              Search
            </Button>
          </Grid>
          <Grid container item xs={12} justify="center" alignItems="center">
            {isSearchDataLoading ? <CircularProgress /> : <StockList />}
          </Grid>
        </Grid>
        <Snackbar
          open={
            isSearchedDataFetchedSuccessfully || isSearchedDataFetchedFailed
          }
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => closeSearchDataNotification(searchedData)}
        >
          <Alert
            icon={false}
            variant="filled"
            color={searchedData.length ? "success" : "error"}
            elevation={6}
            onClose={() => closeSearchDataNotification(searchedData)}
          >
            {searchedData.length
              ? "Data was fetch successfully"
              : "No result found"}
          </Alert>
        </Snackbar>
      </>
    );
  } catch (error) {
    console.log("error");
    return <ErrorText message="Search input was crashed. Try again" />;
  }
};

const mapStateToProps = (state) => {
  return {
    isSearchedDataFetchedSuccessfully: state.isSearchedDataFetchedSuccessfully,
    isSearchedDataFetchedFailed: state.isSearchedDataFetchedFailed,
    searchedData: state.searchedData,
    isSearchDataLoading: state.isSearchDataLoading,
  };
};

const actions = {
  getSearchComponentData,
  closeSearchDataNotification,
  setSearchDataLoading,
};

export default connect(mapStateToProps, actions)(SearchComponent);
