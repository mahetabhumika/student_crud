const LoginModel = require('../model/login_model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const register = async (req, res) => {
    if (!req.body.userName) {
        res.status(400).send({
            message: "First Name is required!!!"
        });
    } else if (!req.body.email) {
        res.status(400).send({
            message: "Last Name is required!!!"
        });
    } else if (!req.body.password) {
        res.status(400).send({
            message: "Password is required!!!"
        });
    } else {
        const result = await LoginModel.findOne({
            email: req.body.email,

        });
        console.log("Result==========", result);
        if (result) {
            res.status(404).send({
                message: "This email alreday exists!!!"
            });
        } else {
            const user = new LoginModel({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,

            });
            await user.save().then(data => {

                res.send({
                    message: "User created successfully!!",

                    user: data
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        }
    }
};
const sendEmail = async (req, res) => {
    // if (!req.body.email) {
    //     res.status(400).send({
    //         message: "Email is required!!!"
    //     });
    // } else {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bhumika.rejoice064@gmail.com',
                pass: 'Bhumika@333',
            },
        });
        const { to, subject, text, html } = req.body;
        const responseEmail = await transporter.sendMail({
            from: 'bhumika.rejoice064@gmail.com',
            to,
            subject,
            text,
            html,
        });
        res.status(200).json({ responseEmail });
    } catch (err) {
        res.status(400).json({ err });
    }
    // }
};

const login = async (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Email is required!!!"
        });
    } else if (!req.body.password) {
        res.status(400).send({
            message: "Password is required!!!"
        });
    } else {
        const result = await LoginModel.findOne({
            email: req.body.email,
        });

        console.log("Result==========", result);
        if (!result) {
            res.status(404).send({
                message: "This email not register in database!!!"
            });
        } else {
            const tokenPayload = {
                _id: result.id,
            };

            const accessToken = jwt.sign(tokenPayload, 'SECRET');
            var data = await LoginModel.findOneAndUpdate({
                userName: result.userName,
                email: result.email,
                password: result.password,
                token: accessToken,
            });
            console.log("jfhdk", data);
            res.send({
                message: "Login successfully!!",
                token: accessToken,
                user: result
            });
        }
    }
};

module.exports = {
    register,
    login,
    sendEmail,
};