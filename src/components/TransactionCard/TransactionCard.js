import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getIntradayData, getOverview } from "../../actions/actions";

const buttonStyle = {
  color: "#FFF",
  fontWeight: "700",
  fontSize: "20px",
  minWidth: "150px",
};

const minorTextStyle = {
  fontWeight: "16px",
  fontWeight: "500",
};

const TransactionCard = ({
  getIntradayData,
  companySymbol,
  intradayData,
  getOverview,
  overviewData,
}) => {
  useEffect(() => {
    getOverview(companySymbol);
  }, []);

  return (
    <>
      <div>{overviewData["Description"]}</div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button style={{ ...buttonStyle, backgroundColor: "#F00" }}>
          <div>sell</div>
          <div style={minorTextStyle}></div>
        </Button>
        <Button style={{ ...buttonStyle, backgroundColor: "#0F0" }}>
          <div>buy</div>
          <div style={minorTextStyle}></div>
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isIntradayDataFetchedSuccessfully: state.isIntradayDataFetchedSuccessfully,
    isIntradayDataFetchedFailed: state.isIntradayDataFetchedFailed,
    intradayData: state.intradayData,
    overviewData: state.overviewData,
    isSearchDataLoading: state.isSearchDataLoading,
  };
};

const actions = {
  getIntradayData,
  getOverview,
};

export default connect(mapStateToProps, actions)(TransactionCard);
