const {getUser} = require("../service/auth")

async function restrictToLoggedInUserOnly(req,res,next) {
    const userId = req.cookies.uid;

    if(!userId) return res.redirect('/login');
    const user = await getUser(userId)

    if(!user) return res.redirect('/login');

    req.user = user;
    next();
}

async function alreadyLoggedIn(req,res,next) {
    const userId = req.cookies.uid;
    const user = await getUser(userId);
    if(user) return res.redirect('/dashboard');
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    alreadyLoggedIn
}