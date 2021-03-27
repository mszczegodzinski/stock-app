import Grid from "@material-ui/core/Grid";
import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <h3 style={{ textAlign: "center", marginBottom: "30px" }}>{message}</h3>
    </Grid>
  );
};

export default ErrorComponent;
