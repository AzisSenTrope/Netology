#!/usr/bin/env node

const readline = require('readline');

const MAX = 100;
const MIN = 0;
const NUMBER = Math.floor((Math.random() * MAX) - MIN);

const BEGIN = `Загадано число в диапазоне от ${MIN} до ${MAX}\n`
const MORE = 'Больше\n';
const LESS = 'Меньше\n';
const WIN = 'Отгадано число ';

const { stdin: input, stdout: output } = require('process');

const RL = readline.createInterface({ input, output });

function game(answerSystem) {
    RL.question(answerSystem, (answerPerson) => {
        const answer = Number(answerPerson);

        if (NUMBER === answer) {
            console.log(WIN + answer);
            RL.close();
        }

        if (NUMBER > answer) {
            game(MORE)
        }
        if (NUMBER < answer) {
            game(LESS)
        }

    });
}

game(BEGIN);
