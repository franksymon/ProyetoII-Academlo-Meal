const catchAsync = controllerFn => {
  return (req, res, next) => {
    controllerFn(req, res, next).catch(err => next(err));
  };
};

module.exports = { catchAsync };
