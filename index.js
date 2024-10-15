const myNumbers = [1, 2, 3, 4, 5];

let sum = 0;
for (let i = 0; i < myNumbers.length; i++) {
    const currentNumber = myNumbers[i];
    if (vatAware(currentNumber)) {
        sum += calculateVat(currentNumber);
    }
}

const sum2 = myNumbers
    .filter(vatAware)
    .map(calculateVat)
    .reduce(sumVatOfPositions, 0);

console.log(sum);
console.log(sum2);

function sumVatOfPositions(sum, currentVat) {
  return sum + currentVat;
}

function calculateVat(value) {
    return value * 0.23;
}

function vatAware(value) {
    const threshold = 2;
    return value > threshold;
}


