function getPasswordChecker(password) {
  return function (pass) {
    return password === +pass || false;
  };
}

let passwordChecker = getPasswordChecker(1234);

console.log(passwordChecker(process.argv[2]));
