const Express = require('express')
const app = new Express()
const cors = require('cors');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('./routes/route_users')
const groups = require('./routes/route_groups')
const groupMembers = require('./routes/route_group_members')
const expenses = require('./routes/route_expenses')
const auth = require('./routes/route_auth')
const cashing = require('./routes/route_cashing')
const upload = require('./upload')

app.use(cors())
app.use(bodyParser.json())

app.use(Express.urlencoded({ extended: false }));
app.use(Express.static('public'));
app.use("/public", Express.static(__dirname + '/public'));

app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/users/profile', upload)
app.use('/api/groups', groups)
app.use('/api/groupMembers', groupMembers)
app.use('/api/expenses', expenses)
app.use('/api/cashing', cashing)

app.listen(7000, () => {
    console.log('Server running on 7000')
})