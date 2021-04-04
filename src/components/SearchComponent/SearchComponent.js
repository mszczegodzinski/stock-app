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
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import StockList from "../StockList/StockList";
import { CircularProgress } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../../utils/customStyles.css";

const SearchComponent = ({
  getSearchComponentData,
  isSearchDataLoading,
  isSearchedDataFetchedSuccessfully,
  isSearchedDataFetchedFailed,
  closeSearchDataNotification,
  setSearchDataLoading,
  searchedData,
  showTransactionWindow,
}) => {
  const [searchedPhrase, setSearchedPhrase] = useState("");
  const [stockInputError, setStockInputError] = useState(false);
  const [market, setMarket] = useState(null);
  const [marketOptions, setMarketOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const textFieldDisabledCondition =
    isSearchedDataFetchedSuccessfully || isSearchedDataFetchedFailed || isSearchDataLoading;
  const searchButtonDisabled =
    isSearchedDataFetchedSuccessfully ||
    isSearchedDataFetchedFailed ||
    isSearchDataLoading ||
    !searchedPhrase ||
    stockInputError;

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && !searchButtonDisabled) {
      e.preventDefault();
      getSearchComponentData(searchedPhrase);
      setSearchedPhrase("");
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [searchedPhrase]);

  useEffect(() => {
    setFilteredData([...searchedData]);
  }, [searchedData]);

  useEffect(() => {
    if (isSearchedDataFetchedSuccessfully) {
      const searchNotificationTimeout = setTimeout(() => {
        closeSearchDataNotification(searchedData);
      }, 5000);
      return () => {
        clearTimeout(searchNotificationTimeout);
      };
    }
  }, [isSearchedDataFetchedSuccessfully]);

  useEffect(() => {
    // delete duplicate values:
    if (searchedData.length) {
      const duplicates = searchedData.map((el) => el["4. region"]);
      const distinctValues = new Set(duplicates);
      setMarketOptions([...distinctValues]);
    }
  }, [searchedData]);

  useEffect(() => {
    const filterResult = searchedData.filter((el) => el["4. region"] === market);
    if (filterResult.length) {
      return setFilteredData(filterResult);
    }
    return setFilteredData(searchedData);
  }, [market]);

  const handleSearchComponentChange = (e) => {
    const isValueIncorrect = utils.validateInput(e.target.value);
    setStockInputError(isValueIncorrect);
    setSearchedPhrase(e.target.value);
  };

  const handleSearchClicked = () => {
    getSearchComponentData(searchedPhrase);
    setSearchedPhrase("");
  };

  const handleSetMarket = (value) => {
    if (value) {
      return setMarket(value);
    }
    return setMarket(null);
  };

  const renderTransactionWindow = () => {
    return (
      <Snackbar
        open={isSearchedDataFetchedSuccessfully || isSearchedDataFetchedFailed}
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
          {searchedData.length ? "Data was fetch successfully" : "No result found"}
        </Alert>
      </Snackbar>
    );
  };

  try {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <h2 className="search-module-header" style={{ textAlign: "center" }}>
              Search company
            </h2>
          </Grid>
          <Grid container item xs={12} justify="center" alignItems="center">
            <TextField
              id="company-input"
              label="Company name or symbol"
              variant="outlined"
              value={searchedPhrase}
              disabled={textFieldDisabledCondition}
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
              disabled={searchButtonDisabled}
              style={{ margin: "30px 0", transition: "0.3s" }}
              onClick={handleSearchClicked}
            >
              Search
            </Button>
          </Grid>
          <Grid container item xs={12} justify="center" alignItems="center">
            <Autocomplete
              id="filter-by-market-input"
              value={market}
              options={marketOptions}
              getOptionLabel={(marketOption) => marketOption}
              onChange={(event, newValue) => handleSetMarket(newValue)}
              style={{ width: "300px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Filter result by market"
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid container item xs={12} justify="center" alignItems="center">
            {isSearchDataLoading ? (
              <CircularProgress />
            ) : (
              <StockList
                filteredData={filteredData}
                showTransactionWindow={showTransactionWindow}
              />
            )}
          </Grid>
        </Grid>
        {renderTransactionWindow()}
      </>
    );
  } catch (error) {
    return <ErrorComponent message="Search input was crashed. Try refresh page" />;
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
