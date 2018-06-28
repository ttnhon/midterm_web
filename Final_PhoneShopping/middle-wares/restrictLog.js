module.exports = (req, res, next) => {
    if (req.session.isLogged === true) {
        var url = '/';
        if (req.headers.referer) {
            url = req.headers.referer;
        }
        res.redirect();
    } else {
        next();
    }
}