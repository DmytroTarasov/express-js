export function requestTime(req, res, next) {
    req.requestTime = new Date();
    next();
}
