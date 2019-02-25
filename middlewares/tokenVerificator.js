import jwt from 'jsonwebtoken';
import { DEFAULT } from '../config/defaultSetting';
import { mainRout as userPath } from '../routes/users';
import { mainRout as productPath } from '../routes/products';

const key = process.env.SECRET_KEY || DEFAULT.key;
const verifiedRoutes = [userPath, productPath];

const tokenVerificator = (req, res, next) => {
    isRoutVerified(req) ? verify(req, res, next) : next();
}

const verify = (req, res, next) => {
    const token = req.headers['x-access-token'];
    jwt.verify(token, key, function (err, decoded) {
        if (err) {
            res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        } else {
            next();
        }
    });
}

const isRoutVerified = (req) => {
    return verifiedRoutes.some(rout => req.originalUrl.startsWith(rout))
}

export default tokenVerificator;
