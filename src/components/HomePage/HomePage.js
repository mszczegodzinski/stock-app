import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import utils from "../../utils/utils";
import "../../utils/customStyles.css";

const wrapperStyle = {
  padding: "40px",
  backgroundColor: "#BBB",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: "1",
  textAlign: "center",
};

const cardStyle = {
  margin: "20px",
  padding: "20px",
  opacity: "0",
  maxWidth: "500px",
  width: "100%",
};

const HomePage = () => {
  try {
    return (
      <div style={wrapperStyle}>
        <Card className="welcome-card" style={cardStyle}>
          <h1 style={{ margin: "0" }}>Welcome in Stock App</h1>
          <Grid {...utils.getGridCenteredProps(12)} style={{ margin: "25px 0" }}>
            <Typography>Stock App is a simple demo app which can be used to trade.</Typography>
            <Typography>Have a good time!</Typography>
          </Grid>
          <Grid {...utils.getGridCenteredProps(12)} style={{ margin: "25px 0 10px 0" }}>
            <Button variant="outlined">
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  color: "#333",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                go to app
              </Link>
            </Button>
          </Grid>
        </Card>
      </div>
    );
  } catch (error) {
    return <ErrorComponent message="Home page was crashed. Try refresh page or come back soon" />;
  }
};

export default HomePage;
