import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getTimeSeriesDailyAdjusted,
  getOverview,
  getGlobalQuoteCompany,
  setOverviewDataLoading,
  saveOpenPositions,
  resetOpenPositions,
} from "../../actions/actions";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import Grid from "@material-ui/core/Grid";
import VolumeComponent from "../VolumeComponent/VolumeComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import "../../utils/customStyles.css";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import PositionList from "../PositionList/PositionList";
import utils from "../../utils/utils";

const CustomButton = withStyles({
  root: {
    minWidth: "110px",
    color: "#FFF !important",
    fontWeight: "700",
    padding: "20px 10px",
    fontSize: "16px",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    transition: "0.3s",
    "& div:nth-child(2)": {
      fontSize: "12px",
      fontWeight: "500",
      textTransform: "none",
      transition: "0.3s",
    },
    "@media(min-width: 400px)": {
      minWidth: "140px",
      padding: "12px 10px",
      fontSize: "20px",
      "& div:nth-child(2)": {
        fontSize: "16px",
      },
    },
  },
})(Button);

const getTextAreaAutosizeStyle = (condition) => {
  const textAreaAutosizeStyle = {
    width: "300px",
    minWidth: "250px",
    minHeight: "80px",
    maxWidth: "300px",
    maxHeight: "80px",
    transition: "0.3s",
    height: condition ? "80px" : "0",
    opacity: condition ? "1" : "0",
  };
  return textAreaAutosizeStyle;
};

const getSellErrorMessageStyle = (condition) => {
  const sellErrorMessageStyle = {
    height: condition ? "24px" : "0",
    marginTop: condition ? "15px" : "0",
    transition: "0.3s",
    fontWeight: "600",
    color: "#F00",
  };
  return sellErrorMessageStyle;
};

const TransactionCard = ({
  companySymbol,
  getOverview,
  overviewData,
  title,
  isTimeSeriesDailyAdjustedFetchedSuccessfully,
  isTimeSeriesDailyAdjustedFetchedFailed,
  timesSeriesDailyAdjusted,
  getTimeSeriesDailyAdjusted,
  getGlobalQuoteCompany,
  isGlobalQuoteFetchSuccessfully,
  isGlobalQuoteFetchFailed,
  globalQuote,
  isOverviewDataFetchedSuccessfully,
  setOverviewDataLoading,
  isOverviewDataLoading,
  saveOpenPositions,
  allOpenPositions,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  let [volumeCounter, setVolumeCounter] = useState(1);
  const [volumeError, setVolumeError] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [sellErrorMessage, setSellErrorMessage] = useState("");
  const [showPositionInfo, setShowPositionInfo] = useState(allOpenPositions.length ? true : false);
  const disabledButton = !isGlobalQuoteFetchSuccessfully || volumeError || apiError;
  const [allOpenPositionsFiltered, setAllOpenPositionsFiltered] = useState([]);

  useEffect(() => {
    // getTimeSeriesDailyAdjusted(companySymbol);
    getGlobalQuoteCompany(companySymbol);
  }, []);

  useEffect(() => {
    const filteredPositions = allOpenPositions.filter(({ symbol }) => symbol === companySymbol);
    setAllOpenPositionsFiltered(filteredPositions);
  }, [allOpenPositions]);

  useEffect(() => {
    if (globalQuote["Note"] || overviewData["Note"]) {
      return setApiError(true);
    }
    return setApiError(false);
  }, [globalQuote]);

  useEffect(() => {
    if (allOpenPositionsFiltered.length) {
      return setShowPositionInfo(true);
    }
    return setShowPositionInfo(false);
  }, [allOpenPositionsFiltered]);

  useEffect(() => {
    if (sellErrorMessage) {
      const sellErrorMessageTimeout = setTimeout(() => {
        setSellErrorMessage("");
      }, 5000);
      return () => {
        clearTimeout(sellErrorMessageTimeout);
      };
    }
  }, [sellErrorMessage]);

  const toggleShowDescription = () => {
    if (companySymbol !== overviewData["Symbol"]) {
      getOverview(companySymbol);
    }
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const calculateSellPrice = (price) => {
    if (price) {
      const priceNumber = parseFloat(price);
      const result = (priceNumber - 0.1).toFixed(4);
      return result;
    }
  };

  const handleOpenPosition = (price) => {
    const parsedPrice = parseFloat(price);
    saveOpenPositions([
      ...allOpenPositions,
      {
        symbol: companySymbol,
        price: parsedPrice,
        volume: volumeCounter,
        isChecked: false,
      },
    ]);
  };

  const handleClosePosition = (price) => {
    const checkedPositionIndex = allOpenPositionsFiltered.findIndex(
      ({ isChecked }) => isChecked === true
    );
    const checkedPosition = allOpenPositionsFiltered[checkedPositionIndex];
    if (!allOpenPositionsFiltered.length) {
      return setSellErrorMessage("No stocks to sell");
    }

    if (checkedPositionIndex === -1) {
      return setSellErrorMessage("No position checked");
    }

    if (checkedPosition.symbol !== companySymbol) {
      return setSellErrorMessage("Invalid position checked");
    }

    if (checkedPosition["volume"] < volumeCounter) {
      return setSellErrorMessage("Not enough stocks to sell");
    }

    // reset error message:
    setSellErrorMessage("");
    // subtract volume from picked position:
    const mappedResult = allOpenPositionsFiltered.map((el) => {
      if (el.isChecked) {
        checkedPosition["volume"] -= volumeCounter;
        return checkedPosition;
      }
      return el;
    });
    // delete positions which current volume is zero:
    if (!checkedPosition["volume"]) {
      const filteredPositions = allOpenPositions.filter(({ volume }) => volume !== 0);
      return saveOpenPositions([...filteredPositions]);
    }
    return saveOpenPositions([...mappedResult]);
  };

  const renderCardHeader = () => {
    return (
      <Grid {...utils.getGridCenteredProps(12)} style={{ marginBottom: "20px" }}>
        <h2 className="transaction-card-header" style={{ fontWeight: "500", margin: "0" }}>
          {title}
        </h2>
        <Button onClick={toggleShowDescription} disabled={apiError}>
          <InfoOutlined style={{ color: "#2196f3" }} />
        </Button>
      </Grid>
    );
  };

  const renderTextArea = () => {
    return (
      <Grid
        {...utils.getGridCenteredProps(12)}
        style={{
          height: isDescriptionVisible ? "80px" : "0",
          transition: "0.3s",
        }}
      >
        {isOverviewDataLoading ? (
          <CircularProgress />
        ) : (
          <TextareaAutosize
            rowsMax={5}
            value={
              isOverviewDataFetchedSuccessfully
                ? overviewData["Description"]
                : "This API is limited. Try again in one minute."
            }
            style={getTextAreaAutosizeStyle(isDescriptionVisible)}
          />
        )}
      </Grid>
    );
  };

  const renderApiWarning = () => {
    return (
      <>
        {apiError ? (
          <Grid container justify="center">
            <div style={{ margin: "20px 0" }}>This API is limited. Try again in one minute.</div>
          </Grid>
        ) : null}
      </>
    );
  };

  const renderSellButton = () => {
    return (
      <Grid {...utils.getGridCenteredProps(4)}>
        <CustomButton
          disabled={disabledButton}
          style={{ backgroundColor: disabledButton ? "#777" : "#F00" }}
          onClick={() => handleClosePosition()}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              sell
            </Grid>
            <Grid item xs={12}>
              {!isGlobalQuoteFetchSuccessfully
                ? "Loading..."
                : globalQuote["Note"]
                ? "---"
                : calculateSellPrice(globalQuote["Global Quote"]["05. price"])}
            </Grid>
          </Grid>
        </CustomButton>
      </Grid>
    );
  };

  const renderVolumeComponent = () => {
    return (
      <Grid {...utils.getGridCenteredProps(3)}>
        <VolumeComponent
          volumeCounter={volumeCounter}
          setVolumeCounter={setVolumeCounter}
          volumeError={volumeError}
          setVolumeError={setVolumeError}
        />
      </Grid>
    );
  };

  const renderBuyButton = () => {
    return (
      <Grid {...utils.getGridCenteredProps(4)}>
        <CustomButton
          style={{ backgroundColor: disabledButton ? "#777" : "#32c972" }}
          disabled={disabledButton}
          onClick={() => handleOpenPosition(globalQuote["Global Quote"]["05. price"])}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              buy
            </Grid>
            <Grid item xs={12}>
              {!isGlobalQuoteFetchSuccessfully
                ? "Loading..."
                : globalQuote["Note"]
                ? "---"
                : globalQuote["Global Quote"]["05. price"]}
            </Grid>
          </Grid>
        </CustomButton>
      </Grid>
    );
  };

  const renderSellErrorMessage = () => {
    return (
      <Grid
        {...utils.getGridCenteredProps(12)}
        style={getSellErrorMessageStyle(sellErrorMessage.length)}
      >
        {sellErrorMessage}
      </Grid>
    );
  };

  try {
    return (
      <Grid container>
        {renderCardHeader()}
        {renderTextArea()}
        {renderApiWarning()}
        <Grid container justify="space-between" alignItems="center" style={{ marginTop: "20px" }}>
          {renderSellButton()}
          {renderVolumeComponent()}
          {renderBuyButton()}
        </Grid>
        {renderSellErrorMessage()}
        <PositionList
          showPositionInfo={showPositionInfo}
          allOpenPositionsFiltered={allOpenPositionsFiltered}
          saveOpenPositions={saveOpenPositions}
          allOpenPositions={allOpenPositions}
        />
      </Grid>
    );
  } catch (error) {
    return <ErrorComponent message="Transaction card was crashed. Try again" />;
  }
};

const mapStateToProps = (state) => {
  return {
    isTimeSeriesDailyAdjustedFetchedSuccessfully:
      state.isTimeSeriesDailyAdjustedFetchedSuccessfully,
    isTimeSeriesDailyAdjustedFetchedFailed: state.isTimeSeriesDailyAdjustedFetchedFailed,
    timesSeriesDailyAdjusted: state.timesSeriesDailyAdjusted,
    overviewData: state.overviewData,
    globalQuote: state.globalQuote,
    isGlobalQuoteFetchSuccessfully: state.isGlobalQuoteFetchSuccessfully,
    isGlobalQuoteFetchFailed: state.isGlobalQuoteFetchFailed,
    isOverviewDataFetchedSuccessfully: state.isOverviewDataFetchedSuccessfully,
    isOverviewDataLoading: state.isOverviewDataLoading,
    allOpenPositions: state.allOpenPositions,
  };
};

const actions = {
  getTimeSeriesDailyAdjusted,
  getOverview,
  getGlobalQuoteCompany,
  setOverviewDataLoading,
  saveOpenPositions,
  resetOpenPositions,
};

export default connect(mapStateToProps, actions)(TransactionCard);
