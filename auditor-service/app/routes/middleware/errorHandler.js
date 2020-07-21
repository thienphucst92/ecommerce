function catchApiError(app) {
  app.use((err, req, res, next) => {
    logger.info('API error', { error: err.stack || err.message || err });
    res.status(422).send({
      isSuccess: false,
      error: err.message,
    });
    if (next) {
      next();
    }
  });
}

module.exports = catchApiError;
