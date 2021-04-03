import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import utils from "../../utils/utils";

const positionElementStyle = {
  fontSize: "14px",
  textAlign: "left",
  fontWeight: "500",
};

const PositionList = ({ openPositions, showPositionInfo, setOpenPositions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const maxPositionsOnPage = 4;

  useEffect(() => {
    const pagesQuantity =
      openPositions.length % maxPositionsOnPage === 0
        ? Math.floor(openPositions.length / maxPositionsOnPage)
        : Math.floor(openPositions.length / maxPositionsOnPage) + 1;

    if (pagesQuantity !== pages) {
      setPages(pagesQuantity);
      setCurrentPage(pagesQuantity);
    }
  }, [openPositions]);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleCheckPosition = (e) => {
    const currentClickedIndex = parseInt(e.target.name);
    const positionToCompareIndex = openPositions.findIndex((el) => el["isChecked"] === true);

    // disable checkbox for all positions:
    const result = openPositions.map((el) => {
      el.isChecked = false;
      return el;
    });
    // if was clicked the same checkbox again:
    if (currentClickedIndex === positionToCompareIndex) {
      return setOpenPositions([...result]);
    }
    // enable checkbox for specific position:
    result[currentClickedIndex]["isChecked"] = true;
    setOpenPositions([...result]);
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

  const renderPositionList = () => {
    const minRange = currentPage * maxPositionsOnPage - maxPositionsOnPage;
    const maxRange = currentPage * maxPositionsOnPage;
    return (
      <Grid container direction="row">
        {openPositions.map((el, i) => {
          if (i > minRange - 1 && i < maxRange) {
            return (
              <Grid
                {...utils.getGridCenteredProps(12)}
                style={positionElementStyle}
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
          }
        })}
      </Grid>
    );
  };

  const renderPagination = () => {
    if (openPositions.length <= maxPositionsOnPage) {
      return null;
    }
    return <Pagination count={pages} page={currentPage} onChange={handleChangePage} />;
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
        {renderPositionList()}
        {renderPagination()}
      </Grid>
    );
  } catch (error) {
    return <ErrorComponent message="Position list was crashed. Try again" />;
  }
};

export default PositionList;
