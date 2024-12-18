require('dotenv').config();

async function loadWelcomePage(req,res) {
    res.render("welcomeHome",{ activePage: 'home' })
}

async function loadAboutPage(req,res) {
    res.render("about",{ activePage: 'about' })
}

async function loadContactUsPage(req,res) {
    res.render("contact-us",{ activePage: 'contact-us' })
}

async function loadHowItWorksPage(req,res) {
    res.render("how-it-works",{ activePage: 'how-it-works' })
}

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Use 587 for TLS, 465 for SSL
    secure: false, // Set true for port 465, false for other ports
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});


async function contactFormSubmission(req, res) {
    try {
        const { name, email, message } = req.body;

        const mailOptions = {
            from: process.env.USER,
            to: process.env.USER,
            subject: 'New Contact Us Message',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        const info = await transporter.sendMail(mailOptions);

        req.flash('success', 'Message sent successfully!');
        return res.redirect('/contact-us');
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Failed to send the message. Please try again later.');
    }
}



module.exports = {
    loadWelcomePage,
    loadAboutPage,
    loadContactUsPage,
    loadHowItWorksPage,
    contactFormSubmission
}