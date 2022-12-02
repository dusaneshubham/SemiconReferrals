const expressAsyncHandler = require("express-async-handler");

const getTokenData = expressAsyncHandler(async (req, res) => {
    const user = req.user;

    if (user) {
        res.json({ message: "Token Data", success: true, data: user, tokenData: req.tokenData });
    } else {
        res.json({ message: "Your token is invalid or expired!", success: false });
    }
});

module.exports = {
    getTokenData
}