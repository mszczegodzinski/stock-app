import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Grid from "@material-ui/core/Grid";
import utils from "../../utils/utils";
import { FixedSizeList } from "react-window";

const positionElementStyle = {
  fontSize: "14px",
  textAlign: "left",
  fontWeight: "500",
};

const PositionList = ({
  showPositionInfo,
  allOpenPositionsFiltered,
  saveOpenPositions,
  allOpenPositions,
  companySymbol,
}) => {
  const maxPositionsOnPage = 4;

  const handleCheckPosition = (e) => {
    const currentClickedIndex = parseInt(e.target.name);
    const positionToCompareIndex = allOpenPositions.findIndex(
      (el) => el["isChecked"] === true && el["symbol"] === companySymbol
    );
    const positionToCompare = allOpenPositions.find(
      (el) => el["isChecked"] === true && el["symbol"] === companySymbol
    );
    // disable checkbox for all positions:
    const result = allOpenPositions.map((el) => {
      el.isChecked = false;
      return el;
    });
    // if was clicked the same checkbox again:
    if (currentClickedIndex === positionToCompareIndex) {
      return saveOpenPositions([...result]);
    }
    // enable checkbox for specific position:
    result[currentClickedIndex]["isChecked"] = true;
    saveOpenPositions([...result]);
  };

  const renderPositionListHeader = () => {
    return (
      <Grid
        container
        justify="flex-start"
        style={{
          margin: showPositionInfo ? "15px 0 0 0" : "0",
          height: showPositionInfo ? "39px" : "0",
          fontWeight: "700",
          transition: "0.3s",
        }}
      >
        Open Positions:
      </Grid>
    );
  };

  const renderRows = () => {
    const res = allOpenPositions.map((el, i) => {
      return (
        <Grid
          {...utils.getGridCenteredProps(12)}
          style={positionElementStyle}
          key={`position-element-${i}`}
        >
          <Grid item xs={2}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              color="default"
              onChange={(e) => handleCheckPosition(e)}
              checked={allOpenPositions[i]["isChecked"]}
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
    });
    return res;
  };

  const renderSwipeableList = () => {
    const elHeight = 38;
    const currentSize =
      allOpenPositions.length < maxPositionsOnPage ? allOpenPositions.length * elHeight : 152;
    return (
      <FixedSizeList
        height={showPositionInfo ? currentSize : 0}
        itemSize={allOpenPositions.length}
        itemCount={1}
        style={{ width: "100%" }}
      >
        {renderRows}
      </FixedSizeList>
    );
  };

  try {
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
        {renderPositionListHeader()}
        {renderSwipeableList()}
      </Grid>
    );
  } catch (error) {
    return <ErrorComponent message="Position list was crashed. Try again" />;
  }
};

export default PositionList;
