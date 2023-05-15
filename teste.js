const nodemailer = require('nodemailer')



function mandar_email(nome, mensagem, vaga, telefone){

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'daniel.mariano@opipa.org', // generated ethereal user
          pass: 'dbzqshuightfemxn', // generated ethereal password
        },
    });
    mensagem = mensagem.replace("[Primeiro nome]", nome.split(" ")[0])
    mensagem = mensagem.replace("[primeiro nome]", nome.split(" ")[0])
    mensagem = mensagem.replace("[número telefone informado]", telefone)
    titulo = "Vaga de Voluntariado - [ Nome da vaga ]"
    titulo = titulo.replace("[ Nome da vaga ]", vaga)
      // send mail with defined transport object
    // let info = await 
    transporter.sendMail({
    from: '"OPiPA 🪁" <daniel.mariano@opipa.org>', // sender address
    to: "vitorsantosalves2014@gmail.com", // list of receivers
    subject: titulo, // Subject line
    text: `${mensagem}`, // plain text body
    // html: `${mensagem}`, // html body
    })
    .then(() => console.log('Email Enviado'))
    .catch((err) => console.log('Erro ao enviar o email', err))
}








enviar = `Oi, [primeiro nome]. Como está? 

Aqui é da Associação PiPA🪁 

Estamos te enviando este e-mail porque tentamos contato pelo WhatsApp [número telefone informado] e não recebemos respostas. 

Caso o número informado esteja errado, ou você não tenha WhatsApp, poderia nos informar para facilitar o contato?

De todo modo, você se interessou em nossa vaga de voluntariado ""[Nome da vaga na linha 1 desta planilha, neste caso seria Vaga Teste]"" - [LINK da Vaga no Atados] , para a função de ""[NOME DA FUNÇÃO NA ABA PRINCIPAL DESTA PLANILHA]"" . É motivo de muita alegria saber que você se interessa em apoiar ações de nossa organização que atua na periferia de São Paulo 😁

O próximo passo para sua candidatura é responder ao formulário a seguir e, nos próximos dias, ter atenção ao seu e-mail. Recomendo que antes de responder olhe novamente a vaga lá no site do Atados. Vamos lá? 

Formulário inicial: https://bityli.com/candidatura-voluntariado-pipa  

Qualquer dúvida, só me chamar 😉`

mandar_email('José Victor', enviar)