const response = (statusCode, datas, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            datas: datas,
            message: message
        }
    })
}

export default response;