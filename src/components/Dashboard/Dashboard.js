import React from "react";
import Card from "@material-ui/core/Card";
import SearchComponent from "../SearchComponent/SearchComponent";
import Grid from "@material-ui/core/Grid";

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
  return (
    <div style={wrapperStyle}>
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
          <SearchComponent />
        </Grid>
      </Card>
    </div>
  );
};

export default Dashboard;
