const jwt = require('jsonwebtoken');

module.exports = {
    generateToken(userInfo) {
        return  jwt.sign({userInfo: userInfo}, "access", { expiresIn: '1h'})
    },

    verifyToken(token) {
        return  jwt.verify(token, "access",  (err, decoded) => {
            if (err) {
                throw new Error('Not valid token');
            } else {
                return  decoded.userInfo;
            }
        });
    }


}