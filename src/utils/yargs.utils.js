const yargs = require('yargs/yargs')(process.argv.slice(2))

    .default({
        port: process.env.PORT || 8080,
        mode: 'fork',
        database: 'mongo'
    })
    .alias({
        database: 'db',
        mode: 'm',
        port: 'p'
    })

module.exports = yargs.argv