import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
// @ts-ignore
import * as cors from "cors";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER, // add credentials locally
        pass: process.env.SMTP_PASSWORD, // add credentials locally
    },
});

export const sendMail = functions.https.onRequest((req, res) => {
    const corsOptions = {
        origin: 'https://beer.gigu.io'
    };

    cors(corsOptions)(req, res, () => {
        const { from, to, subject, html } = req.body;

        const mailOptions: any = {
            to: to,
            from: from,
            subject,
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.send(error.toString());
            }
            return res.send("Email sent: " + info.response);
        });
    });
});
