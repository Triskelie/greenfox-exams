export default (error, req, res, next) => {
  let errorMessage = error.message;
  if (error.httpStatusCode !== undefined) {
    res.status(error.httpStatusCode);
  } else {
    errorMessage = 'Something went wrong, sorry for the inconvenience';
    res.status(500);
  }
  res.json({
    result: errorMessage,
  });
  next();
};
