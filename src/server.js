const http = require('http');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

const SUCCESS = 200
const ERROR_TOKEN = 101;

function httpServer(url, request) {
    http
        .get(url, (result) => {
            const {statusCode} = result;

            switch (statusCode) {
                case SUCCESS: {
                    result.setEncoding('utf-8');

                    let response = '';

                    result.on('data', (res) => response += res);
                    result.on('end', () => {
                        const weather = JSON.parse(response);
                        console.log(`Текущая погода в городе (${request}) следуюшая: `, weather)
                    })
                        .on('error', (error) => {
                            console.log('error ', error);
                        });
                    return;
                }
                case ERROR_TOKEN: {
                    console.log('error token ', statusCode);
                    return;
                }
                default: {
                    console.log('someone code ', statusCode);
                }
            }
        });
}

const {city, token} = require('../config');
const argv = yargs(hideBin(process.argv))
    .option('c', {
        alias: 'city',
        type: 'string',
        default: city,
    })
    .argv;

const request = argv.city;

const url = `http://api.weatherstack.com/current?access_key=${token}&query=${request}`;

httpServer(url, request);