const withAuth = (req, res, next) => {
    if (!req.session.logedIn) {
        res.redirect('/login')
    } else {
        next();
    }
}

module.exports = withAuth;