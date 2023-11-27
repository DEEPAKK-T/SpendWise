const jwt = require("jsonwebtoken")


const authenticateJwt = (req, res, next) => {

    const token = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
        return res.writeHead(401, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: 'Unauthorized' }));
    }

    const accessToken = token.split(' ')[1];

    jwt.verify(accessToken, 'iuy7uyiu7yiu', (err, user) => {
        if (err) {
            return res.writeHead(403, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: 'Forbidden' }));
        }

        // Attach the user object to the request for future use in route handlers
        req.user = user;
        next();
    });


}

module.exports = authenticateJwt;