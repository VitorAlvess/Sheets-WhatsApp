





function duplicanumerosporcausadonove (Numero){
  var numero = Numero.replace(/\D/g, '');
  // Verificar se o número tem 11 dígitos
  if (numero.length >= 13) {
    if (numero.substring(0, 2) === "55") {
      // Remove os dois primeiros dígitos
      numero = numero.substring(2);
      console.log("Número válido após remoção dos dígitos iniciais: " + numero);      
    }
  }
     
  
  
 
  var copia_numero = numero
  if (numero.substring(2, 4) === "99") {
    numero = numero.substring(0, 2) + numero.substring(4);
 
    
  }
  if (numero.substring(2, 4) != "99") {
    numero = numero.substring(0, 2) + "9" + numero.substring(2);
    
    
  }
  
  console.log("Número de telefone atualizado: " + numero);
  console.log("Número de telefone antigo: " + copia_numero);

  return { resultado1: copia_numero, resultado2: numero };
  
}
let { resultado1, resultado2} = duplicanumerosporcausadonove('45119945274604')

console.log(resultado1); // 10
console.log(resultado2); // 20