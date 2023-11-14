const { google } = require('googleapis');
const credentials = require('./credentials.json'); // Substitua pelo caminho para o seu arquivo JSON de credenciais

async function moverDadosParaCelulaAoLado() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1QjpkQAybClkH1Bq9lf-qrNIgJGRB7ZRiHeG07Iae6Ik';
  const sheetName = 'Envios de Mensagem';
  const linha = 3; // Número da linha a ser movida

  // Consultar a planilha
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${linha}:${linha}`,
  });

  const rowValues = response.data.values[0];
  const novaCelula = String.fromCharCode(rowValues.length + 66); // Obter a letra da nova célula com base no número de colunas

  // Mover dados para a célula ao lado
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!${novaCelula}${linha}`,
    valueInputOption: 'RAW',
    resource: {
      values: [rowValues],
    },
  });

  console.log('Dados movidos com sucesso para a célula ao lado');
}

moverDadosParaCelulaAoLado()
  .catch(console.error);