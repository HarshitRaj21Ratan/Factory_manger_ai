export const sendSuccess = (res, data, statusCode = 200, message = 'Success') => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};
