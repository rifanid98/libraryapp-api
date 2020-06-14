module.exports = {
  response: function (res = {}, status_execution = "", data = {}, status_code = 0, message = "") {
    const result = {};
    result.data = data || "";
    result.status_code = status_code || 200;
    result.status_execution = status_execution === "success" ? "success" : "failed";

    return res.status(result.status_code).json({
      status_execution: result.status_execution,
      status_code: status_code,
      message: message,
      data: result.data
    });
  },
};
