let data = "10/03/2023"

let inputDate = new Date(data);
let currentDate = new Date();
let difference = inputDate.getTime() - currentDate.getTime();
let daysDifference = difference / (1000 * 3600 * 24);

if (daysDifference > 15) {
  console.log("A data fornecida está mais de 15 dias no futuro");
} else {
  console.log("A data fornecida não está mais de 15 dias no futuro");
}