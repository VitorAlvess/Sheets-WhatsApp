const nodemailer = require('nodemailer')

function mandar_email_duas_tentaivas_sem_resposta(nome, email){
  mensagem = `Oi, [Nome da pessoa] aqui é da Associação PiPA🪁 

  Como não obtive respostas, estou finalizando sua candidatura. Caso ainda tenha interesse em participar conosco, veja as vagas de voluntariado abertas no momento em: https://atados.com.br/ong/pipa/vagas e se inscreva no processo novamente.
  
  Um abraço,
  
  Equipe PiPA 🪁`



  
  const data = require('./email.json');
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'vitorsantosalves2012@gm', // generated ethereal user
        pass: 'pmbo zddk iwav erpt', // generated ethereal password
      },
  });
  console.log(mensagem)
  email = email.toString()
  mensagem = mensagem.toString();
  // mensagem = mensagem.replace("[Primeiro nome]", nome.split(" ")[0])
  mensagem = mensagem.replace("[Nome da pessoa]", nome.split(" ")[0])

  titulo = "Voluntariado - Vai voar no PiPA com a gente?"
    // send mail with defined transport object
  // let info = await 
  transporter.sendMail({
  from: '"PiPA 🪁" <opipa@opipa.org>', // sender address
  to: email, // list of receivers
  subject: titulo, // Subject line
  text: `${mensagem}`, // plain text body
  // html: `${mensagem}`, // html body
  })
  .then(() => console.log('Email Enviado'))
  .catch((err) => console.log('Erro ao enviar o email', err))
}



mandar_email_duas_tentaivas_sem_resposta("Teste", "vitorsantosalves2012@gmail.com")