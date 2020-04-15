const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.tranz-life.com",
    port: 465,
    secure: true,
    auth: {
        user: 'no-reply@tranz-life.com',
        pass: 'Activity123'
    }
});

const sendEmail = async ({ to, cc, subject, body }) => {

    let info = await transporter.sendMail({
        from: '"vField Tranz-Life" <no-reply@tranz-life.com>',
        to: to,
        cc: cc,
        subject: subject,
        text: body
      });
    
      console.log("Message sent: %s", info);

}

module.exports = { sendEmail }