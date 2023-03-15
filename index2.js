
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

function sheets(){
    const fs = require('fs').promises;
    const path = require('path');
    const process = require('process');
    const {authenticate} = require('@google-cloud/local-auth');
    const {google} = require('googleapis');
    var valores = []
    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = path.join(process.cwd(), 'token.json');
    const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

    /**
     * Reads previously authorized credentials from the save file.
     *
     * @return {Promise<OAuth2Client|null>}
     */
    async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
    }

    /**
     * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
     *
     * @param {OAuth2Client} client
     * @return {Promise<void>}
     */
    async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
    }

    /**
     * Load or request or authorization to call APIs.
     *
     */
    async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
    }

    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    async function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1Jnl_PqlDJRxemLOlDP2aFawoDNo9EHG_Ma43ZvcfOyY',
        range: 'Principal!A:Z',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    rows.forEach((row, index) => {
        if (row[6] == 'TRUE') {
            if (row[16] == 'Carregando…') {
                console.log('Existe algum problema no carregamento de dados da API do google sheets')
                return
            }
            if (row[5] == '') {
              
                nome = row[7]
                numero = row[9]
                mensagem1 = row[16]
                mensagem1 = mensagem1.replace("[primeiro nome]", nome.split(" ")[0])
                mensagem2 = row[17]
                mensagem3 = row[18]
                valores.push([[numero], [mensagem1], [mensagem2], [mensagem3]])
                coluna = "F"
                adicionar_data(coluna,index + 1)
               
            }

            if (row[4] == "Marcar entrevista" && row[3] == '') {
                nome = row[7]
                numero = row[9]
                mensagem4 = row[19]
                mensagem4 = mensagem4.replace("[primeiro nome]", nome.split(" ")[0])
                valores.push([[numero],[mensagem4]])
                coluna = "D"
                adicionar_data(coluna,index + 1)   
            }

            if (row[4] == "Incompatível com a vaga" && row[0] == '') {
                nome = row[7]
                numero = row[9]
                mensagem5 = row[20]
                mensagem5 = mensagem5.replace("[primeiro nome]", nome.split(" ")[0])
                valores.push([[numero],[mensagem5]])
                coluna = "A"
                texto = 'Reprovado(a) e informado(a)'
                adicionar_texto(coluna, index + 1, texto)
              }

              if (row[5] != '' && row[4] == '') {
                let data_planilha = row[5]
                let currentDate = new Date();
                let dataArray = data_planilha.split("/");
                let novaData = new Date(dataArray[2], dataArray[1] - 1, dataArray[0]);
                let diferenca = Math.floor((currentDate.getTime() - novaData.getTime()) / (1000 * 3600 * 24));
                if (diferenca > 7) {
                //   console.log("A data fornecida está mais de 7 dias no passado");
                    nome = row[7]
                    numero = row[9]
                    mensagem6 = row[21]
                    texto = "Primeira semana sem responder"
                    coluna = "E"
                    mensagem6 = mensagem6.replace("[primeiro nome]", nome.split(" ")[0])
                    adicionar_texto(coluna, index + 1, texto)
                    valores.push([[numero],[mensagem6]])
                //   linha_adicionar_cinza.push(index + 1)
                //   console.log(valores_cinza)
                } 
              }
              
              if (row[5] != '' && row[4] == 'Primeira semana sem responder') {
                let data_planilha = row[5]
                let currentDate = new Date();
                let dataArray = data_planilha.split("/");
                let novaData = new Date(dataArray[2], dataArray[1] - 1, dataArray[0]);
                let diferenca = Math.floor((currentDate.getTime() - novaData.getTime()) / (1000 * 3600 * 24));
                if (diferenca > 21) {
                //   console.log("A data fornecida está mais de 21 dias no passado");
                    nome = row[7]
                    numero = row[9]
                    mensagem7 = row[22]
                    texto = "Terceira semana sem responder"
                    coluna = "E"
                    mensagem7 = mensagem7.replace("[primeiro nome]", nome.split(" ")[0])
                    adicionar_texto(coluna, index + 1, texto)

                    adicionar_texto('A', index + 1, 'Duas tentativas sem resposta')
                    valores.push([[numero],[mensagem7]])
                } 
              }

              if (row[2] == "Realizada" && row[0] == 'Aprovado(a)' && row[1] == '') {
                nome = row[7]
                numero = row[9]
                mensagem8 = row[23]
                mensagem8 = mensagem8.replace("[Primeiro nome]", nome.split(" ")[0])
                valores.push([[numero],[mensagem8]])
                adicionar_data('B', index + 1)
              }

              if (row[2] == "Aguardando agendamento" && row[3] != '') {
                let data_planilha = row[3]
                let currentDate = new Date();
                let dataArray = data_planilha.split("/");
                let novaData = new Date(dataArray[2], dataArray[1] - 1, dataArray[0]);
                let diferenca = Math.floor((currentDate.getTime() - novaData.getTime()) / (1000 * 3600 * 24));
                if (diferenca > 14) {
                    numero = row[9]
                    nome = row[7]
                    mensagem9 = row[24]
                    mensagem9 = mensagem9.replace("[Primeiro nome]", nome.split(" ")[0])
                    mensagem9 = mensagem9.replace("[primeiro nome]", nome.split(" ")[0])

                    valores.push([[numero],[mensagem9]])
                    adicionar_texto("C", index + 1, "Mensagem enviada de aguardando agendamento")
                }
              }

              if (row[2] == "Faltou primeira vez") {
                nome = row[7]
                numero = row[9]
                mensagem10 = row[25]
                mensagem10 = mensagem10.replace("[Primeiro nome]", nome.split(" ")[0])
                mensagem10 = mensagem10.replace("[primeiro nome]", nome.split(" ")[0])
                valores.push([[numero],[mensagem10]])
                adicionar_texto("C", index + 1, "Agendada segunda vez")    
            }

            if (row[2] == "Faltou segunda vez" && row[0] != 'Duas faltas no agendamento') {
                nome = row[7]
                numero = row[9]
                mensagem11 = row[26]
                mensagem11 = mensagem11.replace("[Primeiro nome]", nome.split(" ")[0])
                mensagem11 = mensagem11.replace("[primeiro nome]", nome.split(" ")[0])
                valores.push([[numero],[mensagem11]])
                adicionar_texto("A", index + 1, "Duas faltas no agendamento")    
            }
        }

      });
      return valores
        function adicionar_data(coluna,linha){
        let data = new Date();
        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let ano = data.getFullYear();
        dataAtual = dia + '/' + mes + '/' + ano;
        let values = [
          [
          dataAtual
          ],
        ];
        const resource = {
          values,
        };
    
        try {
          const result = sheets.spreadsheets.values.update({
            spreadsheetId: '1Jnl_PqlDJRxemLOlDP2aFawoDNo9EHG_Ma43ZvcfOyY',
            range: `Principal!${coluna+linha}`,
            valueInputOption: 'RAW',
            resource,
          });
    
          return result;
        } catch (err) {
          // TODO (Developer) - Handle exception
          throw err;
      }
        }


        function adicionar_texto(coluna,linha,texto){
        
        let values = [
          [
          texto
          ],
        ];
        const resource = {
          values,
        };
    
        try {
          const result = sheets.spreadsheets.values.update({
            spreadsheetId: '1Jnl_PqlDJRxemLOlDP2aFawoDNo9EHG_Ma43ZvcfOyY',
            range: `Principal!${coluna+linha}`,
            valueInputOption: 'RAW',
            resource,
          });
    
          return result;
        } catch (err) {
          // TODO (Developer) - Handle exception
          throw err;
      }

        }
    }

    
    return authorize().then(listMajors).catch(console.error)
}

sheets().then((valores) => {
    console.log(valores); // aqui você pode fazer o que quiser com a variável ar
    if (valores == '') {
        console.log('Sem dados')
    }
    else{

        whats(valores)
        

    }
  });



 function whats(todas_acoes) {

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
        formatado = []
        const messagePromises = [];

        for (let index = 0; index < todas_acoes.length; index++) {
            for (let index_dentro = 0; index_dentro < todas_acoes[index].length; index_dentro++) {
                array = []
                if (index_dentro == 0) {
                    var numero = todas_acoes[index][index_dentro]
                 
                }
                else{
                    const element = todas_acoes[index][index_dentro];
                    // console.log(`numero: ${numero}`)
                    // console.log(element)
                    numero_enviar = '55' + String(numero).replace(/\D/g, '') + '@c.us'
                    formatado.push([numero_enviar, element[0]])
                    
                    
                }   
            }
        }
        console.log(formatado)
        for (let enviar = 0; enviar < formatado.length; enviar++) {

            messagePromises.push(client.sendMessage(formatado[enviar][0], '')) //para não bugar a ordem de envio
            messagePromises.push(client.sendMessage(formatado[enviar][0],formatado[enviar][1]))
            console.log(formatado[enviar][0],formatado[enviar][1])
        }
        
        Promise.allSettled(messagePromises)
        .then(() => {
          console.log('Todas as mensagens foram enviadas!');
          // Aguarde 2 minutos antes de encerrar a instância do WhatsApp Web
          setTimeout(() => {
            client.destroy();
          }, 120000);
        })
        .catch((error) => {
          console.error('Erro ao enviar mensagem:', error);
          // Aguarde 2 minutos antes de encerrar a instância do WhatsApp Web
          setTimeout(() => {
            client.destroy();
          }, 120000);
        });





    });
    client.on('message', message => {
        if(message.body === '!ping') {
            client.sendMessage(message.from, 'pong');
        }
    });
     
    client.initialize(); 
}






console.log('FINALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
// console.log(sheets())
// // whats(array_mensagens)




