const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
require('dotenv').config({ path: './config/.env' });


/*
const db = require('./models');

////// Routers //////

//USERS|AUTH
const usersRouter = require('./routes/Users.routes');
app.use('/auth', usersRouter);

//Static Images Folder
app.use('/Images', express.static('./Images'));

db.sequelize.sync().then(() => {
    app.listen(3002, () => {
        console.log('Server running on port 3002');
    });
});
*/
