const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            // console.log({token});
            const decoded = jwt.verify(token.split(" ")[1], 'masai474');
            // console.log({decoded});
            if (decoded) {
                req.body.author = decoded.author;
                req.body.authorId = decoded.authorId
                next()
            }
            else {
                res.status(200).send({ msg: "Wrong credentials" })
            }
        } catch (error) {
            res.status(400).send({ "err": error.message })
        }
    }
    else {
        res.send({ msg: "Please Login" })
    }
}


module.exports = {
    auth
}