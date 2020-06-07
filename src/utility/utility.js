export const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules && rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules && rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.isEmail) {
    // eslint-disable-next-line
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
