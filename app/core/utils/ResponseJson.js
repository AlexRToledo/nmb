class ResponseJson {
    constructor() {}

    async Json(data, message = "") {
        return {error: false, data: data, message: message}
    }

    async JsonError(data = {}, message = "Error") {
        return {error: true, data: data, message: message}
    }
}

module.exports = ResponseJson;