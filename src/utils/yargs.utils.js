const yargs = require('yargs/yargs')(process.argv.slice(2))

const argv = yargs
.alias({
    p: 'port',
    m: 'mode',
    db: 'database'
})
.default({
  port: process.env.PORT,
  mode: 'fork', // 'fork' o 'cluster',
  database: 'memoria' // 'memoria', 'mongo' o 'firebase'
})
.argv

module.exports = argv