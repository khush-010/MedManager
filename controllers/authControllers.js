const User = require("../models/user")
const {hashPassword,checkPassword} = require("./bcryptController")
const {setUser} = require('../service/auth')

async function loadLoginPage(req,res){
    res.render("login",{ messages: req.flash('error') })
}

async function loginUser(req,res){
    const { email,password } = req.body;
    try {
        const user = await User.findOne({ email })
        if(user==null){
            req.flash('error','User Not found')
            res.redirect('/login')
            return;
        }

        const isMatch = await checkPassword(password,user.password)
        if(isMatch){
            const token = setUser(user)
            res.cookie("uid",token)
            res.redirect('/dashboard')
        }else{
            req.flash('error','Invalid Password.')
            res.redirect('/login')
        }

    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred');
        res.redirect('/login');
    }

}

async function loadSignUpPage(req,res) {
    res.render("signup",{ messages: req.flash('error')})
}

async function signupUser(req,res) {
    const {first_name,last_name,email,password,confirm_password } = req.body;
    if (password !== confirm_password) {
        req.flash('error', 'Password does not match with Confirm Password');
        return res.redirect('/signup');
    }

    try {
        const hashedPassword = await hashPassword(password);
        await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword  
        });
        const user = await User.findOne({ email })
        const token = setUser(user)
        res.cookie("uid",token)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred while signing up');
        res.redirect('/signup');
    }
}

async function logoutUser(req,res) {
    res.clearCookie("uid")
    return res.redirect('/')
}

module.exports = {
    loadLoginPage,
    loginUser,
    loadSignUpPage,
    signupUser,
    logoutUser,
}