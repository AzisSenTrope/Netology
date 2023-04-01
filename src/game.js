const yargs = require('yargs');
const {hideBin} =  require('yargs/helpers');
const {stdin: input, stdout: output} = require('process');
const readline = require('readline');
const fs = require("fs");

const MAX = 2;
const NUMBER = Math.floor(Math.random() * MAX) + 1;

const WIN = 'WIN\n';
const LOST = 'LOST\n'

const argv = yargs(hideBin(process.argv)).argv._;

if (!argv.length) {
    console.log("ERROR");
    return;
}

const RL = readline.createInterface({input, output});
const writeStr = fs.createWriteStream(argv[0], {'flags': 'a+'});

RL.question('Отгадайте число от 1 до 2: ', (answerPerson) => {
    const answer = Number(answerPerson);

    if (NUMBER === answer) {
        console.log('Вы выиграли!');
        writeStr.write(WIN);
    } else {
        console.log('Вы проиграли!');
        writeStr.write(LOST);
    }

    writeStr.end();
    RL.close();
});
