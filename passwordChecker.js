function getPasswordChecker(password) {
  return function (pass) {
    return password === +pass || false;
  };
}

let passwordChecker = getPasswordChecker(1234);

console.log(passwordChecker(1111));
console.log(passwordChecker(34));
console.log(passwordChecker(1431));
console.log(passwordChecker(1234)); // Ожидаем true
