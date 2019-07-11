// Config settings.
const path = require('path')
module.exports = {
    client: 'mysql',

    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'payshare'
    },
    migrations: {
        tableName: 'migrations',
        diretory: path.resolve(__dirname, './migrations'),
    },
    useNullasDefault: true
}