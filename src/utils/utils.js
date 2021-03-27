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

const utils = {
  validateInput,
};

export default utils;
