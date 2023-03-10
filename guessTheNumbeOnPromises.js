const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });
const fs = require("node:fs/promises");

function guessTheNumber(number, i = 0) {
  const question = new Promise((resolve) =>
    rl.question("Угадайте число: ", (input) => resolve(input))
  );

  question.then((answer) => {
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
      (async () => {
        await fs.writeFile("log.txt", `${answer}\n${a}\n`, { flag: "a" });
        console.log(
          "Файл log.txt тоже записан! Можете посмотреть лог игры в каталоге программы."
        );
      })();
      console.log(a);
      rl.close();
      return;
    }

    console.log(a);
    (async () => {
      await fs
        .writeFile("log.txt", `${answer}\n${a}\n`, { flag: "a" })
        .catch((err) => {
          if (err) {
            console.log("Ошибочка c записью файла");
          }
        });
    })();
    guessTheNumber(115, i);
  });
}

guessTheNumber(115);
