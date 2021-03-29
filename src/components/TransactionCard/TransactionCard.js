import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getIntradayData, getOverview } from "../../actions/actions";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import Grid from "@material-ui/core/Grid";
import "../../utils/customStyles.css";

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
  title,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  useEffect(() => {
    getOverview(companySymbol);
  }, []);

  const toggleShowDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          transform: "translateX(48px)",
        }}
      >
        <h2 style={{ marginTop: "0" }}>{title}</h2>
        <Button
          onClick={toggleShowDescription}
          style={{ marginBottom: "20px" }}
        >
          <InfoOutlined style={{ color: "#2196f3" }} />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize
          rowsMax={5}
          value={
            overviewData["Description"]
              ? overviewData["Description"]
              : "This API is limited. Try again soon"
          }
          style={{
            width: "300px",
            maxWidth: "350px",
            maxHeight: "100px",
            transition: "0.3s",
            height: isDescriptionVisible ? "80px" : "0",
            opacity: isDescriptionVisible ? "1" : "0",
            marginBottom: "20px",
          }}
        />
      </Grid>
      <Grid container justify="space-around">
        <Button style={{ ...buttonStyle, backgroundColor: "#F00" }}>
          <div>sell</div>
          <div style={minorTextStyle}></div>
        </Button>
        <Button style={{ ...buttonStyle, backgroundColor: "#32c972" }}>
          <div>buy</div>
          <div style={minorTextStyle}></div>
        </Button>
      </Grid>
    </Grid>
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
