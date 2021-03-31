import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import SearchComponent from "../SearchComponent/SearchComponent";
import Grid from "@material-ui/core/Grid";
import SweetAlert from "react-bootstrap-sweetalert";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import TransactionCard from "../TransactionCard/TransactionCard";

const wrapperStyle = {
  padding: "20px 30px",
  backgroundColor: "#BBB",
  position: "relative",
};

const cardStyle = {
  marginBottom: "25px",
  opacity: "0",
};

const Dashboard = () => {
  const [transactionWindow, setTransactionWindow] = useState(null);

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
        <Card className="app-header" style={cardStyle}>
          <Grid container>
            <Grid item xs={12}>
              <h1 style={{ textAlign: "center" }}>Stock app</h1>
            </Grid>
          </Grid>
        </Card>
        <Card
          className="search-module-card"
          style={{ padding: "0 20px 40px 20px", opacity: "0" }}
        >
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

export default Dashboard;
