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
        range: 'Principal!A:AD',
    });
    const rows = res.data.values; 
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    var valores_rosa_claro = []
    var linha_adicionar_rosa_claro = []
    var valores_verde = []
    var linha_adicionar_verde = []
    var valores_verde_escuro = []
    var linha_adicionar_verde_escuro = []
    var valores_vermelho = []
    var linha_adicionar_vermelho = []
    var valores_cinza = []
    var linha_adicionar_cinza = []
    var valores_cinza_forte = []
    var linha_adicionar_cinza_forte = []
    var valores_ciano = []
    var linha_adicionar_ciano = []
    var valores_branco = []
    var linha_adicionar_branco = []

    // alterar o valor de 4 para  rows.length
    for (let index = 0; index < 5; index++) { 
      

      if (rows[index][6] === "TRUE" && rows[index][5] == '') {
          nome = rows[index][7]
          numero = rows[index][9]
          mensagem1 = rows[index][16]
          mensagem2 = rows[index][17]
          mensagem3 = rows[index][18]
          linha_adicionar_rosa_claro.push(index + 1)
          valores_rosa_claro.push([[nome], [numero], [mensagem1], [mensagem2], [mensagem3]])
          console.log(valores_rosa_claro)
      }
      if (rows[index][4] == "Marcar entrevista" && rows[index][3] == '') {
          numero = rows[index][9]
          mensagem4 = rows[index][19]
          valores_verde.push([[numero],[mensagem4]])
          linha_adicionar_verde.push(index + 1)
          console.log(valores_verde)
      }
      if (rows[index][4] == "Incompat??vel com a vaga" && rows[index][0] == '') {
        numero = rows[index][9]
        mensagem5 = rows[index][20]
        valores_vermelho.push([[numero],[mensagem5]])
        linha_adicionar_vermelho.push(index + 1)
        console.log(valores_vermelho)
      }

      
      if (rows[index][5][0] == '??' && rows[index][4] == '' ){
        
        let data_planilha = rows[index][5].substring(1)
        let currentDate = new Date();
        let dataArray = data_planilha.split("/");
        let novaData = new Date(dataArray[2], dataArray[1] - 1, dataArray[0]);
        let diferenca = Math.floor((currentDate.getTime() - novaData.getTime()) / (1000 * 3600 * 24));
        if (diferenca > 14) {
          console.log("A data fornecida est?? mais de 14 dias no passado");
          numero = rows[index][9]
          mensagem7 = rows[index][22]
          valores_cinza_forte.push([[numero],[mensagem7]])
          linha_adicionar_cinza_forte.push(index + 1)
          console.log(valores_cinza_forte)
        } 
      }

      if (rows[index][2] == "Realizada" && rows[index][0] == 'Aprovado(a)') {
        numero = rows[index][9]
        mensagem4 = rows[index][23]
        valores_ciano.push([[numero],[mensagem4]])
        linha_adicionar_ciano.push(index + 1)
        console.log(valores_ciano)
      }

      if (rows[index][2] == "Aguardando agendamento" && rows[index][3] != '') {
        let data_planilha = rows[index][3]
        let currentDate = new Date();
        let dataArray = data_planilha.split("/");
        let novaData = new Date(dataArray[2], dataArray[1] - 1, dataArray[0]);
        let diferenca = Math.floor((currentDate.getTime() - novaData.getTime()) / (1000 * 3600 * 24));
        if (diferenca > 14) {
          numero = rows[index][9]
          mensagem9 = rows[index][23]
          valores_verde_escuro.push([[numero],[mensagem9]])
          linha_adicionar_verde_escuro.push(index + 1)
          console.log(valores_verde_escuro)
        }
      }

      if (rows[index][2] == "Faltou primeira vez") {
        numero = rows[index][9]
        mensagem10 = rows[index][24]
        valores_branco.push([[numero],[mensagem10]])
        linha_adicionar_branco.push(index + 1)
        console.log(valores_branco)


    }



    //WhatsApp

    //
    console.log('Carregando o WhatsApp....')
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
        console.log(`valores_rosa_claro a serem adicionados: ${valores_rosa_claro}`)
        console.log(`valores_verde a serem adicionados: ${valores_verde}`)
        console.log(`valores_vermelho a serem adicionados: ${valores_vermelho}`)
        console.log(`valores_cinza a serem adicionados: ${valores_cinza}`)
        console.log(`valores_cinza forte a serem adicionados: ${valores_cinza_forte}`)
        console.log(`valores_cinza a serem adicionados: ${valores_ciano}`)
        //Manda mensagem e insere a data
        if (valores_rosa_claro != '') {
          let nomes = []
          let telefones = []
          let mensagem1 = []
          let mensagem2 = []
          let mensagem3 = []
          let mensagem4 = []
          let mensagem5 = []
  
          for (let index = 0; index < valores_rosa_claro.length; index++) {
              nomes.push(valores_rosa_claro[index][0])
              telefones.push(valores_rosa_claro[index][1])
              mensagem1.push(valores_rosa_claro[index][2])
              mensagem2.push(valores_rosa_claro[index][3])
              mensagem3.push(valores_rosa_claro[index][4])
              mensagem4.push(valores_rosa_claro[index][5])
              mensagem5.push(valores_rosa_claro[index][6])
  
              
              
          }
          for (let index = 0; index < telefones.length; index++) {
              numero_enviar = '55' + telefones[index][0].replace(/\D/g, '') + '@c.us'
              console.log(numero_enviar)
              client.sendMessage(numero_enviar, mensagem1[index][0])
              client.sendMessage(numero_enviar, mensagem2[index][0])
              client.sendMessage(numero_enviar, mensagem3[index][0])
  
          }
        }
        if (valores_verde != '') {
          let telefones = []
          let mensagem4 = []
      
  
          for (let index = 0; index < valores_verde.length; index++) {
              telefones.push(valores_verde[index][0])
              mensagem4.push(valores_verde[index][1])

          }
          for (let index = 0; index < telefones.length; index++) {
              numero_enviar = '55' + telefones[index][0].replace(/\D/g, '') + '@c.us'
              console.log(`${numero_enviar} Mensagem verde `)
              client.sendMessage(numero_enviar, mensagem4[index][0])
          }
        }
        if (valores_vermelho != '') {
          let telefones = []
          let mensagem5 = []
      
  
          for (let index = 0; index < valores_vermelho.length; index++) {
              telefones.push(valores_vermelho[index][0])
              mensagem5.push(valores_vermelho[index][1])

          }
          for (let index = 0; index < telefones.length; index++) {
              numero_enviar = '55' + telefones[index][0].replace(/\D/g, '') + '@c.us'
              console.log(`${numero_enviar} Mensagem vermelho `)
              client.sendMessage(numero_enviar, mensagem5[index][0])
          }
        }
        if (valores_cinza != '') {
          let telefones = []
          let mensagem6 = []
      
  
          for (let index = 0; index < valores_cinza.length; index++) {
              telefones.push(valores_cinza[index][0])
              mensagem6.push(valores_cinza[index][1])

          }
          for (let index = 0; index < telefones.length; index++) {
              numero_enviar = '55' + telefones[index][0].replace(/\D/g, '') + '@c.us'
              console.log(`${numero_enviar} Mensagem vermelho `)
              client.sendMessage(numero_enviar, mensagem6[index][0])
          }
        }

        if (valores_cinza_forte != '') {
          let telefones = []
          let mensagem7 = []
      
  
          for (let index = 0; index < valores_cinza_forte.length; index++) {
              telefones.push(valores_cinza_forte[index][0])
              mensagem7.push(valores_cinza_forte[index][1])

          }
          for (let index = 0; index < telefones.length; index++) {
              numero_enviar = '55' + telefones[index][0].replace(/\D/g, '') + '@c.us'
              console.log(`${numero_enviar} Mensagem vermelho `)
              client.sendMessage(numero_enviar, mensagem7[index][0])
          }
        }

        if (valores_ciano != '') {
          let telefones = []
          let mensagem8 = []
      
  
          for (let index = 0; index < valores_ciano.length; index++) {
              telefones.push(valores_ciano[index][0])
              mensagem8.push(valores_ciano[index][1])

          }
          for (let index = 0; index < telefones.length; index++) {
              numero_enviar = '55' + telefones[index][0].replace(/\D/g, '') + '@c.us'
              console.log(`${numero_enviar} Mensagem ciano `)
              client.sendMessage(numero_enviar, mensagem8[index][0])
          }
        }


        if (valores_branco != '') {
          let telefones = []
          let mensagem10 = []
      
  
          for (let index = 0; index < valores_branco.length; index++) {
              telefones.push(valores_branco[index][0])
              mensagem10.push(valores_branco[index][1])

          }
          for (let index = 0; index < telefones.length; index++) {
              numero_enviar = '55' + telefones[index][0].replace(/\D/g, '') + '@c.us'
              console.log(`${numero_enviar} Mensagem Branco `)
              client.sendMessage(numero_enviar, mensagem5[index][0])
          }
        }
       
    });
    client.initialize();
    //
    // Inserir VALOR
    for (let index = 0; index < linha_adicionar_rosa_claro.length; index++) {
      adicionar_data_rosa_claro(linha_adicionar_rosa_claro[index])
    }
    for (let index = 0; index < linha_adicionar_verde.length; index++) {
      adicionar_data_verde(linha_adicionar_verde[index])
      adicionar_aguardar_agendamento(linha_adicionar_verde[index])
    }

    for (let index = 0; index < linha_adicionar_vermelho.length; index++) {
      adicionar_data_vermelho(linha_adicionar_vermelho[index])
    }

    for (let index = 0; index < linha_adicionar_cinza.length; index++) {
      adicionar_data_cinza(linha_adicionar_cinza[index])
    }

    for (let index = 0; index < linha_adicionar_cinza_forte.length; index++) {
      adicionar_data_cinza_forte(linha_adicionar_cinza_forte[index])
      adicionar_duastentativas(linha_adicionar_cinza_forte[index])
    }

    for (let index = 0; index < linha_adicionar_ciano.length; index++) {
      adicionar_data_ciano(linha_adicionar_ciano[index])
    }
    for (let index = 0; index < linha_adicionar_branco.length; index++) {
      adicionar_agenda_segunda_vez(linha_adicionar_branco[index])
    }
  
    
    function adicionar_data_vermelho(linha){
      
      let values = [
        [
        'Reprovado(a) e informado(a)'
        ],
      ];
      const resource = {
        values,
      };

      try {
        const result = sheets.spreadsheets.values.update({
          spreadsheetId: '1Jnl_PqlDJRxemLOlDP2aFawoDNo9EHG_Ma43ZvcfOyY',
          range: `Principal!A${linha}`,
          valueInputOption: 'RAW',
          resource,
        });
  
        return result;
      } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
    }

    function adicionar_data_rosa_claro(linha){
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

    function adicionar_data_verde(linha){
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
          range: `Principal!D${linha}`,
          valueInputOption: 'RAW',
          resource,
        });
  
        return result;
      } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
    }

    function adicionar_data_cinza(linha){
      let data = new Date();
      let dia = String(data.getDate()).padStart(2, '0');
      let mes = String(data.getMonth() + 1).padStart(2, '0');
      let ano = data.getFullYear();
      dataAtual = '??' + dia + '/' + mes + '/' + ano;
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

    function adicionar_data_cinza_forte(linha){
      let data = new Date();
      let dia = String(data.getDate()).padStart(2, '0');
      let mes = String(data.getMonth() + 1).padStart(2, '0');
      let ano = data.getFullYear();
      dataAtual = '??' + dia + '/' + mes + '/' + ano;
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

    function adicionar_duastentativas(linha){
      
      let values = [
        [
        'Duas tentativas sem resposta'
        ],
      ];
      const resource = {
        values,
      };

      try {
        const result = sheets.spreadsheets.values.update({
          spreadsheetId: '1Jnl_PqlDJRxemLOlDP2aFawoDNo9EHG_Ma43ZvcfOyY',
          range: `Principal!A${linha}`,
          valueInputOption: 'RAW',
          resource,
        });
  
        return result;
      } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
    }


    function adicionar_aguardar_agendamento(linha){
      
      let values = [
        [
        'Aguardando agendamento'
        ],
      ];
      const resource = {
        values,
      };

      try {
        const result = sheets.spreadsheets.values.update({
          spreadsheetId: '1Jnl_PqlDJRxemLOlDP2aFawoDNo9EHG_Ma43ZvcfOyY',
          range: `Principal!C${linha}`,
          valueInputOption: 'RAW',
          resource,
        });
  
        return result;
      } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
    }

    function adicionar_data_ciano(linha){
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
          range: `Principal!B${linha}`,
          valueInputOption: 'RAW',
          resource,
        });
  
        return result;
      } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
    }

    function adicionar_agenda_segunda_vez(linha){
      
      let values = [
        [
        'Agendada segunda vez'
        ],
      ];
      const resource = {
        values,
      };

      try {
        const result = sheets.spreadsheets.values.update({
          spreadsheetId: '1Jnl_PqlDJRxemLOlDP2aFawoDNo9EHG_Ma43ZvcfOyY',
          range: `Principal!C${linha}`,
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
}

authorize().then(listMajors).catch(console.error);