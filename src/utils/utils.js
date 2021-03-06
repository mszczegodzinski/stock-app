const validateInput = (value) => {
  const incorrectSigns = ["/", "<", ">"];
  const isValueIncorrect = incorrectSigns.some((el) => value.includes(el));
  if (isValueIncorrect) {
    return true;
  }
  if (!value) {
    return true;
  }
  return false;
};

const validateVolume = (value) => {
  const regex = /^[0-9]{0,3}$/;
  const isIncorrectValue = regex.test(value);

  if (!isIncorrectValue) {
    return true;
  }
  return false;
};

const getGridCenteredProps = (width) => {
  const gridCenteredProps = {
    container: true,
    item: true,
    xs: width,
    justify: "center",
    alignItems: "center",
  };
  return gridCenteredProps;
};

const utils = {
  validateInput,
  validateVolume,
  getGridCenteredProps,
};

export default utils;
