module.exports = (app) => {
  app.get('/healthcheck', (req, res, next) => {
    try {
      res.send({ isSuccess: true });
    } catch (error) {
      next(error);
    }
  });
};
