async function responseHandler(statusCode, message, data) {
  return {
    success: true,
    code: statusCode,
    message,
    data,
  };
}

export { responseHandler };
