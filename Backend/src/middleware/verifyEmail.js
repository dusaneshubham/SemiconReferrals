const { decrypt } = require("./encrypt-decrypt");
const jwt = require('jsonwebtoken');

const verifyEmail = async (req, res) => {
    let { token } = req.body;
    const result = await jwt.verify(token, process.env.SECRETKEY);
    if (result) {
        res.json({ type: result.type, data: result.data, success: true });
    } else {
        res.json({ message: "Your token is invalid or expired!", success: false });
    }
};

module.exports = verifyEmail;