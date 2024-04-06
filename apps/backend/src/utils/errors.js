export const createError = (message, statusCode = 500, data = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = data;
  throw error;
};

export const handleError = (error, next) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  next(error);
};
