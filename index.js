const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

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
        range: 'Principal!A:U',
    });
    const rows = res.data.values; 
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    var valores = []
    var linhas_adicionar_data = []

    for (let index = 0; index < rows.length; index++) {
      //manda mensagem e insere a data
        if (rows[index][6] === "TRUE" && rows[index][5] == '') {
            nome = rows[index][7]
            numero = rows[index][9]
            mensagem1 = rows[index][16]
            mensagem2 = rows[index][17]
            mensagem3 = rows[index][18]
            mensagem4 = rows[index][19]
            mensagem5 = rows[index][20]
            linhas_adicionar_data.push(index + 1)
            valores.push([[nome], [numero], [mensagem1], [mensagem2], [mensagem3], [mensagem4], [mensagem5]])
            console.log(valores)
        }
    }


    //WhatsApp

    //
    console.log('Parte do WhatsApp abaixo')
    const qrcode = require('qrcode-terminal');
    const { Client, LocalAuth } = require('whatsapp-web.js');
    const client = new Client({
    authStrategy: new LocalAuth()
    });

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    
    client.on('ready', () => {
        console.log('Login realizado com sucesso!');
        console.log(`Valores a serem adicionados: ${valores}`)
        //Manda mensagem e insere a data
        if (valores != '') {
          var nomes = []
          var telefones = []
          var mensagem1 = []
          var mensagem2 = []
          var mensagem3 = []
          var mensagem4 = []
          var mensagem5 = []
  
          for (let index = 0; index < valores.length; index++) {
              nomes.push(valores[index][0])
              telefones.push(valores[index][1])
              mensagem1.push(valores[index][2])
              mensagem2.push(valores[index][3])
              mensagem3.push(valores[index][4])
              mensagem4.push(valores[index][5])
              mensagem5.push(valores[index][6])
  
              
              
          }
          for (let index = 0; index < telefones.length; index++) {
              numero_enviar = '55' + telefones[index][0].replace(/\D/g, '') + '@c.us'
              console.log(numero_enviar)
              client.sendMessage(numero_enviar, mensagem1[index][0])
              client.sendMessage(numero_enviar, mensagem2[index][0])
              client.sendMessage(numero_enviar, mensagem3[index][0])
              client.sendMessage(numero_enviar, mensagem4[index][0])
              client.sendMessage(numero_enviar, mensagem5[index][0])
  
          }
        }
       
    });
    client.initialize();
    //
    // Inserir VALOR
    for (let index = 0; index < linhas_adicionar_data.length; index++) {
      adiciona_data(linhas_adicionar_data[index])
      
    }
    function adiciona_data(linha){
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
          range: `Principal!F${linha}`,
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

authorize().then(listMajors).catch(console.error);



