numero_enviar = '(11) 99190-9436'
mensagem = 'teste'
array_mensagens = [  [    [ '(11) 99190-9436' ],
[      'Mensagem caso a pessoa tenha sido aprovada durante a entrevista'    ], ['Mensagens 1'], ['Mensagens 2'], ['Mensagens 3']
],
[    [ '(21) 99876-5432' ],
[      'Mensagem de confirmação de agendamento de entrevista'    ], ['Mensagens 1']
],
[    [ '(31) 98765-4321' ],
[      'Mensagem informando sobre próximas etapas do processo seletivo'    ] , ['Mensagens 1']
],
[    [ '(41) 95555-4444' ],
[      'Mensagem de agradecimento pelo interesse na vaga'    ], ['Mensagens 1'] , ['Mensagens 2']
],
[    [ '(51) 99999-8888' ],
[      'Mensagem informando sobre a necessidade de realizar um teste prático'    ] , ['Mensagens 1']
]
]
function whats(mensagem, numero_enviar) {

    const qrcode = require('qrcode-terminal');
    const { Client, LocalAuth } = require('whatsapp-web.js');
    const client = new Client({
        authStrategy: new LocalAuth()
    });


    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
        numero = '55' + numero_enviar.replace(/\D/g, '') + '@c.us'
        console.log(numero)
        client.sendMessage(numero, mensagem)

    });
    client.on('message', message => {
        if(message.body === '!ping') {
            client.sendMessage(message.from, 'pong');
        }
    });
     
    client.initialize(); 
}

// whats(mensagem, numero_enviar)


console.log(array_mensagens.length)
for (let index = 0; index < array_mensagens.length; index++) {
    for (let index_dentro = 0; index_dentro < array_mensagens[index].length; index_dentro++) {
        
        const element = array_mensagens[index][index_dentro];
        console.log(element)
        
    }
    // if (index > 0) {
    //     console.log(`Mensagem:${element[index]}`)
        
    // }
    
}
