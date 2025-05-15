
module.exports = ex = {};

ex.response = function (res, result) {
	if (result != null && result != undefined && result != "")
		result = JSON.parse(JSON.stringify(result));
	res.status(200);
	res.json(result);
};

ex.error = function (res, errContent, errCode, data) {
	res.status(errCode);
	res.json({ error: errContent, code: errCode, data_error: (data && typeof data == "object" ? { ...data } : null) });
};

ex.success = function (res, data, message = null, code = 200) {
	if (data != null && data != undefined && data != "")
		data = JSON.parse(JSON.stringify(data));
	res.json({ error: null, code: code, data: data, message: message });
};
