const handleSuccess = (res, data, message) => {
  return res.send({
    code: 1,
    message: message,
    data: data,
  });
};

const handleError = (res, message, status) => {
  if (status) {
    res.status(status);
  }
  return res.send({
    code: 2,
    message: message,
  });
};

module.exports = {
  handleSuccess,
  handleError,
};
