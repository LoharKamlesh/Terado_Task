const AppError = require("../utils/appError");

exports.createOne = (Model) => async (req, res, next) => {
  try {
    ///creating documents
    //1) const newTour= new Tour();
    // newTour.save()

    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    return next(new AppError(`${err}`, 404));
  }
};
