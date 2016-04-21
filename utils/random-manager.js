const uniqueRandonNumber = (numRandomNumbers, lowerLimit, upperLimit) => {
  let uniqueNumbers = []

  while (uniqueNumbers.length !== numRandomNumbers) {
    let currentRandomNumbers = this.randomNumberInRange(lowerLimit, upperLimit)

    if (uniqueNumbers.indexOf(currentRandomNumbers) === -1) {
      uniqueNumbers.push(currentRandomNumbers)
    }

    return uniqueNumbers
  }
}

const randomNumberInRange = (lowerLimit, upperLimit) => {
  return Math.floor(Math.random() * (1 + upperLimit - lowerLimit)) + lowerLimit
}

export { uniqueRandonNumber, randomNumberInRange }
