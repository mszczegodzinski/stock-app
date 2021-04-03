import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getTimeSeriesDailyAdjusted,
  getOverview,
  getGlobalQuoteCompany,
  setOverviewDataLoading,
} from "../../actions/actions";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import Grid from "@material-ui/core/Grid";
import VolumeComponent from "../VolumeComponent/VolumeComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import "../../utils/customStyles.css";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

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

const textAreaAutosizeStyle = {
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
  setOverviewDataLoading,
  isOverviewDataLoading,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  let [volumeCounter, setVolumeCounter] = useState(1);
  const [volumeError, setVolumeError] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [openPositions, setOpenPositions] = useState([]);
  const [sellErrorMessage, setSellErrorMessage] = useState("");
  const [showPositionInfo, setShowPositionInfo] = useState(false);
  const disabledButton = !isGlobalQuoteFetchSuccessfully || volumeError || apiError;

  useEffect(() => {
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
    if (openPositions.length) {
      return setShowPositionInfo(true);
    }
    return setShowPositionInfo(false);
  }, [openPositions]);

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
    setOpenPositions([
      ...openPositions,
      {
        symbol: companySymbol,
        price: parsedPrice,
        volume: volumeCounter,
        isChecked: false,
      },
    ]);
  };

  const handleClosePosition = (price) => {
    const checkedPositionIndex = openPositions.findIndex(({ isChecked }) => isChecked === true);
    const checkedPosition = openPositions[checkedPositionIndex];
    if (checkedPositionIndex === -1) {
      return setSellErrorMessage("No position checked");
    }

    if (checkedPosition["volume"] < volumeCounter) {
      return setSellErrorMessage("Not enough stocks to sell");
    }

    setSellErrorMessage("");
    const mappedResult = openPositions.map((el) => {
      if (el.isChecked) {
        checkedPosition["volume"] -= volumeCounter;
        return checkedPosition;
      }
      return el;
    });

    if (!checkedPosition["volume"]) {
      // filter position if it's quantity is 0
      const filteredPositions = openPositions.filter(({ volume }) => volume !== 0);
      return setOpenPositions([...filteredPositions]);
    }
    return setOpenPositions([...mappedResult]);
  };

  const handleCheckPosition = (e) => {
    const currentClickedIndex = parseInt(e.target.name);
    // disable checkboxes in all positions:
    const result = openPositions.map((el) => {
      el.isChecked = false;
      return el;
    });
    // enable checkbox in specific position:
    result[currentClickedIndex]["isChecked"] = true;
    setOpenPositions([...result]);
  };

  const renderCardHeader = () => {
    return (
      <Grid container item xs={12} justify="center" style={{ marginBottom: "20px" }}>
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
        container
        item
        xs={12}
        justify="center"
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
            style={{
              ...textAreaAutosizeStyle,
              height: isDescriptionVisible ? "80px" : "0",
              opacity: isDescriptionVisible ? "1" : "0",
            }}
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
      <Grid container item xs={4} justify="center" alignItems="center">
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

  const renderSellErrorMessage = () => {
    return (
      <Grid
        container
        justify="center"
        style={{
          height: sellErrorMessage.length ? "24px" : "0",
          marginTop: "10px",
          transition: "0.3s",
          fontWeight: "600",
          color: "#F00",
        }}
      >
        <div style={{ margin: "5px 0" }}>{sellErrorMessage}</div>
      </Grid>
    );
  };

  const renderCurrentPositions = () => {
    return (
      <Grid
        container
        justify="flex-start"
        style={{
          transition: "0.3s",
          minHeight: showPositionInfo ? "100px" : "0",
          opacity: showPositionInfo ? "1" : "0",
        }}
      >
        <Grid
          container
          justify="flex-start"
          style={{
            height: showPositionInfo ? "39px" : "0",
            fontWeight: "700",
            margin: "15px 0 0 0",
            transition: "0.3s",
          }}
        >
          Open Positions:
        </Grid>
        <Grid container direction="row">
          {openPositions.map((el, i) => {
            return (
              <Grid
                container
                item
                xs={12}
                justify="center"
                alignItems="center"
                style={{
                  fontSize: "14px",
                  textAlign: "left",
                  fontWeight: "500",
                }}
                className="show-position"
                key={`position-element-${i}`}
              >
                <Grid item xs={2}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    color="default"
                    onChange={(e) => handleCheckPosition(e)}
                    checked={openPositions[i]["isChecked"]}
                    name={`${i}`}
                  />
                </Grid>
                <Grid item xs={5}>
                  {el.symbol}
                </Grid>
                <Grid item xs={2}>
                  {el.volume}
                </Grid>
                <Grid item xs={3}>
                  {el.price}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
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
        {renderCurrentPositions()}
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
  };
};

const actions = {
  getTimeSeriesDailyAdjusted,
  getOverview,
  getGlobalQuoteCompany,
  setOverviewDataLoading,
};

export default connect(mapStateToProps, actions)(TransactionCard);
