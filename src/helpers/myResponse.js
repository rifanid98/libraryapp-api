module.exports = {
  response: function (res, statusExecution, data, statusCode, message) {
    const result = {};
    result.data = data || "";
    result.statusCode = statusCode || 200;
    result.statusExecution = statusExecution === "success" ? "success" : "fail";

    return res.status(result.statusCode).json({
      statusExecution: result.statusExecution,
      statusCode: statusCode,
      message: message,
      data: result.data
    });
  },
};
