import { Grid, TextField } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import utils from "../../utils/utils";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

const cellStyle = {
  border: "1px solid black",
  borderRadius: "5px",
};

const cellStyleInside = {
  borderTop: "1px solid black",
};

const minorTextStyle = {
  fontSize: "12px",
};

const VolumeComponent = ({
  volumeCounter,
  decreaseVolume,
  increaseVolume,
  setVolumeCounter,
  volumeError,
  setVolumeError,
}) => {
  const setVolume = (e) => {
    const currentValue = e.target.value;
    const result = utils.validateVolume(currentValue);

    if (!currentValue) {
      setVolumeCounter(currentValue);
      setVolumeError(true);
    }
    if (!result && currentValue !== "0" && currentValue) {
      setVolumeCounter(currentValue);
      setVolumeError(false);
    }
  };

  try {
    return (
      <Grid container style={cellStyle}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <TextField
              error={volumeError}
              value={volumeCounter}
              onChange={(e) => setVolume(e)}
              inputProps={{ className: "volume-input" }}
              style={{
                backgroundColor: volumeError ? "rgba(255,0,0,0.3)" : "#FFF",
                transition: "0.3s",
              }}
            >
              {volumeCounter}
            </TextField>
          </Grid>
          <Grid item xs={12} style={minorTextStyle}>
            volume
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={6} style={cellStyleInside}>
            <Button onClick={decreaseVolume}>-</Button>
          </Grid>
          <Grid item xs={6} style={cellStyleInside}>
            <Button onClick={increaseVolume}>+</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  } catch (error) {
    return <ErrorComponent message="Volume input was crashed. Try again" />;
  }
};

export default VolumeComponent;
