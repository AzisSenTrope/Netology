const yargs = require('yargs');
const {hideBin} =  require('yargs/helpers');

const CURRENT = 'current';
const SUB = 'sub';
const ADD = 'add';

const ERROR_DATA = 'Не хватает данных';
const ERROR = 'Ошибка';

const DATE = {
    YEAR: 'year',
    MONTH: 'month',
    DATE: 'date',
}

function dateOutput(argv, add = false) {
    if (!argv) {
        console.log(ERROR_DATA);
        return;
    }

    const date = new Date();

    if (argv[DATE.YEAR] || argv[CUT_DATE.YEAR]) {
        console.log(date.getFullYear());

        return;
    }

    if (argv[DATE.MONTH] || argv[CUT_DATE.MONTH]) {
        const count = argv[DATE.MONTH] || argv[CUT_DATE.MONTH];

        if (typeof count === 'number') {
            add ? date.setMonth(date.getMonth() + count) : date.setMonth(date.getMonth() - count);
            console.log(date);

            return;
        }

        console.log(date.getMonth());

        return;
    }

    if (argv[DATE.DATE] || argv[CUT_DATE.DATE]) {
        const count = argv[DATE.DATE] || argv[CUT_DATE.DATE];
        console.log('count ', count);

        if (typeof count === 'number') {
            add ? date.setDate(date.getDate() + count) : date.setDate(date.getDate() - count);
            console.log(date);

            return;
        }

        console.log(date.getDate());
        return;
    }

    return 1;
}

const CUT_DATE = Object.entries(DATE).reduce((result, [key, value]) => {
    result[key] = '-' + value[0];
    return result;
}, {});

const argv = yargs(hideBin(process.argv))
    .option(DATE.YEAR, {
        alias: CUT_DATE.YEAR,
})
    .option(DATE.MONTH, {
        alias: CUT_DATE.MONTH,
    })
    .option(DATE.DATE, {
        alias: CUT_DATE.DATE,
})
    .argv;

console.log('argv ', argv);
console.log('sd ', argv._)

const key = argv?._.length ? argv?._[0] : '';

switch (key) {
    case CURRENT: {
        const currentDate = new Date();

        dateOutput(argv, currentDate);

        console.log(currentDate);

        return;
    }
    case SUB: {
        const result = dateOutput(argv);

        if (result) {
            console.log(ERROR);
            return;
        }

        return;
    }
    case ADD: {
        const result = dateOutput(argv, true);

        if (result) {
            console.log(ERROR);
            return;
        }

        return;
    }
    default: {
        console.log('Неизвестный ключ')
    }

}