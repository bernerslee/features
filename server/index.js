var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');    
var port = 3001;

app.use(express.static(__dirname + '/../client/dist', {maxAge: 5000})); //sets maxAge to 5sec
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const knex = require('../knex/knex.js');

app.get('/house/features/:id',(req, res) => {
    var id = Number(req.params.id);
    knex('features').where({house_id: id}).select()
    .then((data) => {
        if(data.length === 0){
            res.status(400).send(`House ${id} does not exist`);
        } else {
            res.status(200).send(data);
        }
    })
    .catch((err) => {
        res.status(400).send(`Sent bad request for house ${id}`);
    });
});

app.get('/house/interior/:id', (req, res)=>{
    var id = Number(req.params.id);
    knex('interior_features').where({feature_id: id}).select()
    .then((data) => {
        if(data.length === 0){
            res.status(400).send(`House ${id} does not exist`);
        } else {
            res.status(200).send(data);
        }
    })
    .catch((err) => {
        res.status(400).send(`Sent bad request for house ${id}`);
    });
});

app.post('/house/features',(req, res)=>{
    var doc = req.body;
    knex('features').insert(doc)
    .then((data) => {
        res.status(200).send({recent:data[0]});
    })
    .catch((err) => {
        res.status(400).send('Unable to insert into features due to incorrect params');
    });
});

app.post('/house/interior',(req, res)=>{
    var doc = req.body;
    knex('interior_features').insert(doc)
    .then((data) => {
        res.status(200).send({recent:data[0]});
    })
    .catch((err) => {
        res.status(400).send('Unable to insert into features due to incorrect params');
    });
});

app.delete('/house/features/:id',(req, res)=>{
    var houseId = req.params.id;
    knex('features').where('house_id', houseId)
    .del().then((data)=>{
        if(data === 0){ 
            res.status(400).send(`feature_${houseId} does not exist, param error`);
        } else {
            var message = `feature_${houseId} was successfully removed`;    
            res.status(200).send(message);
        }
    })
    .catch((err) => {
        res.status(400).send(`Unable to delete feature_${houseId}`);
    });
});

app.delete('/house/interior/:id', (req, res) => {
    var houseId = req.params.id;
    knex('interior_features').where({feature_id: houseId})
    .del().then((data)=>{
        if(data === 0){ 
            res.status(400).send(`interior_${houseId} does not exist, param error`);
        } else {
            var message = `interior_${houseId} was successfully removed`;    
            res.status(200).send(message);
        }
    })
    .catch((err) => {
        res.status(400).send(`Unable to delete feature_${houseId}`);
    });
});

app.put('/house/features/:id', (req, res) => {
    var houseId = req.params.id;
    var update = req.body;
    knex('features').where({house_id: houseId})
    .update(update).then((data)=>{
        if(data < 1){
            res.status(400).send(`feature_${houseId} was not able to updated due to data format error`);
        } else {
            var message = `feature_${houseId} was successfully updated`;    
            res.status(200).send(message);
        }
    })
    .catch((err) => {
        res.status(400).send('Sent bad request');
    });
});

app.put('/house/interior/:id',(req, res)=>{
    var houseId = req.params.id;
    var update = req.body;
    knex('interior_features').where({feature_id: houseId})
    .update(update).then((data)=>{
        if(data < 1){
            res.status(400).send(`interior_${houseId} was not able to updated due to non-existent id`);
        } else {
            var message = `interior_${houseId} was successfully updated`;    
            res.status(200).send(message);
        }
    })
    .catch((err) => {
        res.status(400).send(`interior_${houseId} was not able to updated due to data format error`);
    });
});

app.listen(port, (req, res)=>{
  console.log(`Listening on Port: ${port}`);
});

module.exports = app;