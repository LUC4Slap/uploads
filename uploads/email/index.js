const nodemailer = require('nodemailer');
require('dotenv/config');

function EnviarEmail() {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "lucas.almeida@ctprice.com.br",
            pass: "lucasalmeida12"
        },
        tls:{
            ciphers:'SSLv3'
        }
    });
    
    transporter.sendMail({
        from: "Lucas Almeida <lucas.almeida@ctprice.com.br>",
        to: "luciano.queiroz@ctprice.com.br, lilian.moraes@ctprice.com.br",
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