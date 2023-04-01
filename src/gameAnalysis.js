const yargs = require('yargs');
const {hideBin} =  require('yargs/helpers');
const readline = require('readline');
const fs = require("fs");

const WIN = 'WIN';
const LOST = 'LOST'

const argv = yargs(hideBin(process.argv)).argv._;
let partiesCount = 0;
let winCount = 0;
let lostCount = 0;

if (!argv.length) {
    console.log("ERROR");
    return;
}

const file = readline.createInterface({
    input: fs.createReadStream(argv[0]),
    output: process.stdout,
    terminal: false
});

file.on('line', (line) => {
    partiesCount++;
    if (WIN === line) {
        winCount++;
    }
    if (LOST === line) {
        lostCount++;
    }
});

file.on('close', () => {
    console.log('Общее количество партий: ', partiesCount);
    console.log('Количество выигранных партий: ', winCount);
    console.log('Количество проигранных партий: ', lostCount);
    console.log('Процентное соотношение выигранных партий: ', winCount / lostCount);
});
