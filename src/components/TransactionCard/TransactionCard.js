import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getTimeSeriesDailyAdjusted,
  getOverview,
  getGlobalQuoteCompany,
} from "../../actions/actions";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import Grid from "@material-ui/core/Grid";
import VolumeComponent from "../VolumeComponent/VolumeComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import "../../utils/customStyles.css";
import { withStyles } from "@material-ui/core/styles";

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

const textAreaAutosize = {
  width: "300px",
  maxWidth: "350px",
  maxHeight: "100px",
  transition: "0.3s",
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
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  let [volumeCounter, setVolumeCounter] = useState(1);
  const [volumeError, setVolumeError] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [openPositions, setOpenPositions] = useState([]);
  const [sellErrorMessage, setSellErrorMessage] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");
  const [totalStockVolume, setTotalStockVolume] = useState(0);
  const [showPositionInfo, setShowPositionInfo] = useState(false);
  const [positionsInfo, setPositionsInfo] = useState("");
  const disabledButton = !isGlobalQuoteFetchSuccessfully || volumeError || apiError;

  useEffect(() => {
    getOverview(companySymbol);
    // getTimeSeriesDailyAdjusted(companySymbol);
    getGlobalQuoteCompany(companySymbol);
  }, []);

  useEffect(() => {
    if (globalQuote["Note"] || overviewData["Note"]) {
      return setApiError(true);
    }
    return setApiError(false);
  }, [globalQuote]);

  useEffect(() => {
    setShowPositionInfo(true);
  }, [totalStockVolume]);

  const toggleShowDescription = () => {
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
    setOpenPositions([
      ...openPositions,
      {
        symbol: companySymbol,
        price: parsedPrice,
        volume: volumeCounter,
        totalPosition: parsedPrice * volumeCounter,
      },
    ]);
    setTransactionMessage(`${volumeCounter} stocks of ${companySymbol} were bought`);
    const currentVolume = totalStockVolume + volumeCounter;
    setTotalStockVolume(currentVolume);
    setPositionsInfo(`Your positions: ${companySymbol} volume: ${currentVolume}`);
  };

  const handleClosePosition = (price) => {
    if (!totalStockVolume) {
      return setSellErrorMessage("No stock of this company");
    }

    if (totalStockVolume < volumeCounter) {
      return setSellErrorMessage("Not enough stocks of this company");
    }

    const currentVolume = totalStockVolume - volumeCounter;
    setTotalStockVolume(currentVolume);
    setTransactionMessage(`${volumeCounter} stocks of ${companySymbol} were sold`);
    setPositionsInfo(`Your positions: ${companySymbol} volume: ${currentVolume}`);
    return setSellErrorMessage("");
  };

  const renderCardHeader = () => {
    return (
      <Grid container item xs={12} justify="center" style={{ marginBottom: "20px" }}>
        <h2 className="transaction-card-header" style={{ fontWeight: "500", margin: "0" }}>
          {title}
        </h2>
        <Button onClick={toggleShowDescription}>
          <InfoOutlined style={{ color: "#2196f3" }} />
        </Button>
      </Grid>
    );
  };

  const renderTextArea = () => {
    return (
      <Grid container item xs={12}>
        <TextareaAutosize
          rowsMax={5}
          value={
            isOverviewDataFetchedSuccessfully
              ? overviewData["Description"]
              : "This API is limited. Try again soon"
          }
          style={{
            ...textAreaAutosize,
            height: isDescriptionVisible ? "80px" : "0",
            opacity: isDescriptionVisible ? "1" : "0",
          }}
        />
      </Grid>
    );
  };

  const renderApiWarning = () => {
    return apiError ? (
      <Grid container justify="center">
        <div style={{ margin: "20px 0" }}>This API is limited. Try again soon</div>
      </Grid>
    ) : null;
  };

  const renderSellButton = () => {
    return (
      <Grid container item xs={4} justify="center" alignItems="center">
        <CustomButton
          disabled={disabledButton}
          style={{ backgroundColor: disabledButton ? "#777" : "#F00" }}
          onClick={() => handleClosePosition(globalQuote["Global Quote"]["05. price"])}
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
      <Grid container item xs={3}>
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
      <Grid container item xs={4} justify="center" alignItems="center">
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

  const renderTransactionMessage = () => {
    return (
      <>
        <Grid container justify="center">
          <div style={{ margin: "20px 0" }}>
            {sellErrorMessage.length ? sellErrorMessage : transactionMessage}
          </div>
        </Grid>
        {showPositionInfo ? (
          <Grid container justify="center">
            <div style={{ margin: "20px 0" }}>{positionsInfo}</div>
          </Grid>
        ) : null}
      </>
    );
  };

  try {
    return (
      <Grid container>
        {renderCardHeader()}
        {renderTextArea()}
        {renderApiWarning()}
        {renderTransactionMessage()}
        <Grid container justify="space-between" alignItems="center" style={{ marginTop: "20px" }}>
          {renderSellButton()}
          {renderVolumeComponent()}
          {renderBuyButton()}
        </Grid>
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
  };
};

const actions = {
  getTimeSeriesDailyAdjusted,
  getOverview,
  getGlobalQuoteCompany,
};

export default connect(mapStateToProps, actions)(TransactionCard);
