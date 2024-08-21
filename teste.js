function obterDataAtual() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = dataAtual.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

console.log(obterDataAtual())
console.log(obterDataAtual() == '21/08/2024')