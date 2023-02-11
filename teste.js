function diffInMonths(startDate, endDate) {
  let diff = endDate.getTime() - startDate.getTime();
  let diffInDays = diff / (1000 * 60 * 60 * 24);
  let diffInMonths = diffInDays / 30.4375;
  return diffInMonths;
}

let startDate = new Date("04/02/2023");
console.log(startDate)
let endDate = new Date
console.log(endDate)
let valor = diffInMonths(startDate, endDate);
console.log(valor); // 5.002