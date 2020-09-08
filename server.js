var express = require('express')
var cors = require('cors')
var fs = require('fs')
var bodyParser = require('body-parser')

var mysql = require('mysql')

var morgan = require('morgan')

var app = express()

const PORT = 3000;

app.use(cors());
app.use(morgan('tiny'))
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Successfully loaded basic server app for ngx-musketeer-client!')
})

app.post('/test-connection', function(req, res) {
    let conn = req.body;
    console.log('Received body: ', JSON.stringify(conn));

    if(!conn || !conn.type) {
        res.status(400).send({ message: 'Invalid connection params'});
        return;
    }

    switch(conn.type) {
        case 'mysql':
            var connection = mysql.createConnection({
                host: conn.host,
                user: conn.user || '',
                password: conn.password || ''
            });

            connection.connect((err) => {
                if(err) res.status(400).send({ error: err });
                else {
                    connection.end();
                    res.status(200).send({ status: 'connected'});
                }
            });
            break;

        default: res.sendStatus(400);
    }
})

app.post('/connection/:driver/databases', function(req, res) {

    let driver = req.params.driver;

    let conn = req.body;
    console.log('Received body: ', JSON.stringify(conn));

    if(!conn || !conn.type) {
        res.status(400).send({ message: 'Invalid connection params'});
        return;
    }

    switch(conn.type) {
        case 'mysql':
            var connection = mysql.createConnection({
                host: conn.host,
                user: conn.user || '',
                password: conn.password || ''
            });

            connection.connect((err) => {
                if(err) res.status(400).send({ error: err });
                else {
                    connection.query('show databases', (err, rows, fields) => {
                        if(err) res.status(400).send({ error: err });
                        else {
                            let databases = rows.map((row) => { return { name: row['Database'] } });
                            connection.end();
                            res.status(200).send(databases)
                        }
                    });
                }
            });
            break;

        default: res.sendStatus(400);
    }
})

app.post('/connection/:driver/databases/:db/tables', function(req, res) {

    let driver = req.params.driver;
    let database = req.params.db;

    let conn = req.body;
    console.log('Received body: ', JSON.stringify(conn));

    if(!conn || !conn.type) {
        res.status(400).send({ message: 'Invalid connection params'});
        return;
    }

    switch(conn.type) {
        case 'mysql':
            var connection = mysql.createConnection({
                host: conn.host,
                user: conn.user || '',
                password: conn.password || '',
                database: conn.database
            });

            connection.connect((err) => {
                if(err) res.status(400).send({ error: err });
                else {
                    connection.query('show tables', (err, rows, fields) => {
                        if(err) res.status(400).send({ error: err });
                        else {
                            let tables = rows.map((row) => { return { name: row[`Tables_in_${ database }`] } });
                            connection.end();
                            res.status(200).send(tables)
                        }
                    });
                }
            });
            break;

        default: res.sendStatus(400);
    }
})

app.post('/connection/:driver/databases/:db/tables/:table', function(req, res) {

    let driver = req.params.driver;
    let database = req.params.db;
    let table = req.params.table;

    let conn = req.body;
    console.log('Received body: ', JSON.stringify(conn));

    if(!conn || !conn.type) {
        res.status(400).send({ message: 'Invalid connection params'});
        return;
    }

    switch(conn.type) {
        case 'mysql':
            var connection = mysql.createConnection({
                host: conn.host,
                user: conn.user || '',
                password: conn.password || '',
                database: conn.database
            });

            connection.connect((err) => {
                if(err) res.status(400).send({ error: err });
                else {
                    connection.query(`SELECT * FROM ${ table } LIMIT 10`, (err, rows, fields) => {
                        if(err) res.status(400).send({ error: err });
                        else {
                            connection.end();
                            res.status(200).send(rows);
                        }
                    });
                }
            });
            break;

        default: res.sendStatus(400);
    }
})

app.listen(PORT, function() {
    console.log(`Listening on port ${ PORT }`);
})