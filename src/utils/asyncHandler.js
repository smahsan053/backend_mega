const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// alternative code
/*
// higher order function - takes function as parameter & returns
const asyncHandler = (fn) => {
  () => {};
};
*/
/*
// wrapper of below code
// where next is to use middlewares one after another
// app.get('/', (err,req, res,next) => {
//   res.send('hello world')
// })

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(err.code || 500).json({
      success: false,
      message: err.message,
    });
  }
};
*/
