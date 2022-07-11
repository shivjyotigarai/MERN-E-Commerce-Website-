const notFound = (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: {
      message: err.message,
    },
  });
};
export { notFound, errorHandler };
