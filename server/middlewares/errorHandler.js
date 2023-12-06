// Not Error Handler

const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error)
};

// Error Handler

const handleError = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode
  let message = err.message
  if (err.name === 'CastError' && err.kind === 'ObjectId'){
    statusCode = 404;
    message = 'Resource not found'
  }
  res.status(statusCode);
  res.json({
    status: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err?.stack,
  });
};

module.exports = { handleError, notFound}
