const nodemailer = require('nodemailer');
require('dotenv/config');

function EnviarEmail() {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "",
            pass: ""
        },
        tls:{
            ciphers:'SSLv3'
        }
    });
    
    transporter.sendMail({
        from: " <>",
        to: "",
        subject: "Aquivo nos uploads recente",
        text: "Arqui",
        html: "<a href='http://uploadsctprice.com/home'>Ver</a>"
    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    })
}

module.exports = EnviarEmail;
