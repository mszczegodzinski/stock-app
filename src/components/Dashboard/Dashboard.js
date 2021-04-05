import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent";
import SweetAlert from "react-bootstrap-sweetalert";
import TransactionCard from "../TransactionCard/TransactionCard";
import { resetOpenPositions } from "../../actions/actions";
import ArrowBack from "@material-ui/icons/ArrowBack";
import utils from "../../utils/utils";

const wrapperStyle = {
  padding: "20px",
  backgroundColor: "#BBB",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexGrow: "1",
};

const cardStyle = {
  marginBottom: "25px",
  opacity: "0",
  maxWidth: "500px",
  width: "100%",
};

const searchModuleStyle = {
  padding: "0 20px 40px 20px",
  opacity: "0",
  maxWidth: "500px",
  boxSizing: "border-box",
  width: "100%",
};

const Dashboard = ({ resetOpenPositions }) => {
  const [transactionWindow, setTransactionWindow] = useState(null);

  useEffect(() => {
    resetOpenPositions();
  }, []);

  const showTransactionWindow = (company) => {
    const companySymbol = company["1. symbol"];
    setTransactionWindow(
      <SweetAlert
        title=""
        onConfirm={() => setTransactionWindow(null)}
        onCancel={() => setTransactionWindow(null)}
        showConfirm={false}
        style={{ margin: "0 !important" }}
      >
        <TransactionCard
          companySymbol={companySymbol}
          title={`${company["1. symbol"]}, ${company["2. name"]}`}
        />
      </SweetAlert>
    );
  };

  try {
    return (
      <div style={wrapperStyle}>
        {transactionWindow}
        <Grid container style={{ maxWidth: "500px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button style={{ fontSize: "16px", fontWeight: "700" }}>
              <ArrowBack />
              Back
            </Button>
          </Link>
        </Grid>
        <Card className="app-header" style={cardStyle}>
          <Grid container>
            <Grid {...utils.getGridCenteredProps(12)}>
              <h1 style={{ textAlign: "center" }}>Stock App</h1>
            </Grid>
          </Grid>
        </Card>
        <Card className="search-module-card" style={searchModuleStyle}>
          <Grid container>
            <SearchComponent showTransactionWindow={showTransactionWindow} />
          </Grid>
        </Card>
      </div>
    );
  } catch (error) {
    return <ErrorComponent message="Dashboard was crashed. Try refresh page" />;
  }
};

const actions = {
  resetOpenPositions,
};

export default connect(null, actions)(Dashboard);
