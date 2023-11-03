import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization.replace(/Bearer\s?/ig, '');
    if (token !== 'null') {
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            next();
        } catch (error) {
            console.log(error);
            res.json({ message: 'Error while checking authorization' })
        }
    }

}