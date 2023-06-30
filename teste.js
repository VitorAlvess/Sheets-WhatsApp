function removerDigitoTelefone(numero) {
  // Remove os caracteres não numéricos do número de telefone
  const numeroLimpo = numero.replace(/\D/g, '');

  // Verifica se o número tem o formato esperado
  if (numeroLimpo.length !== 11) {
    console.log('Número de telefone inválido. Certifique-se de que o número tenha 11 dígitos.');
    return numero;
  }

  // Remove o "9" na terceira posição
  const numeroAlterado = numeroLimpo.slice(0, 2) + numeroLimpo.slice(3);

  // Retorna o número alterado com o formato "(XX) XXXXX-XXXX"
  return `(${numeroAlterado.slice(0, 2)}) ${numeroAlterado.slice(2, 7)}-${numeroAlterado.slice(7)}`;
}

// Exemplo de uso
const numeroTelefone = "(11) 99761-0618";
const numeroAlterado = removerDigitoTelefone(numeroTelefone);
console.log(numeroAlterado);