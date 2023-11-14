const ABC = [
  ['Oi, José. Aqui é da Associação PiPA, gostaria de te trazer uma informação sobre um de nossos projetos'],
  ['O Educa ViVA ainda está parado porque não temos conseguido verba'],
  ['Você poderia divulgar essa postagem para seus amigos e familiares? Quem sabe, eles, assim como você, gostariam de nos ajudar nesse lindo projeto'],
  [''],
  [''],
  ['']
];


function limpardados(mensagem){

  var resultado = mensagem.filter(item => item[0] !== '');
  var texto = resultado.map(item => item[0]).join('\n\n');
  let dataHoraAtual = new Date();
  let dataAtual = dataHoraAtual.toLocaleDateString();
  let horaAtual = dataHoraAtual.toLocaleTimeString();
  let textohoras = `Mensagens enviada às ${horaAtual} do dia ${dataAtual}`
  let textofinal = `${textohoras} \n\n${texto}` 
  
  return textofinal
}

console.log(limpardados(ABC))