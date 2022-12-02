const errorMap = {
  USER_NOT_FOUND: 404,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};