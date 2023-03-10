const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });
const fs = require("fs");

function guessTheNumber(number, i = 0) {
  rl.question("Угадайте число: ", (answer) => {
    i++;
    let a;
    if (+answer > number) {
      a = `Загаданное число меньше. Попытка ${i}`;
    } else if (+answer < number) {
      a = `Загаданное число больше. Попытка ${i}`;
    } else if (isNaN(+answer)) {
      a = `Ошибочка! Вы ввели не число. Попытка ${i}`;
    } else if (+answer === number) {
      a = `Ура! Вы угадали число с ${i} попытки.`;
      fs.writeFile("log.txt", `${answer}\n${a}\n`, { flag: "a" }, (err) => {
        console.log(
          "Файл log.txt тоже записан! Можете посмотреть лог игры в каталоге программы."
        );
      });
      console.log(a);
      rl.close();
      return;
    }
    console.log(a);
    fs.writeFile("log.txt", `${answer}\n${a}\n`, { flag: "a" }, (err) => {
      if (err) {
        console.log("Ошибочка c записью файла");
      }
    });
    guessTheNumber(115, i);
  });
}

guessTheNumber(115);
