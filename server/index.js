var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');    
var port = 3003;


app.use(express.static(__dirname + '/../client/dist', {maxAge: 5000})); //sets maxAge to 5sec
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const knex = require('../knex/knex.js');

app.get('/house/features/:id',(req, res) => {
    console.log(req.params[id]);
    knex('features').where({house_id: 9999990}).select()
    .then((data) => {
        console.log(data);
        res.status(200).send({data});
    })
    .catch((err) => {
        res.status(400).send('Sent bad request');
    });
});

app.get('/house/interior/:id',(req, res)=>{
    console.log(req.params[id]);
    knex('interior').where({feature_id: 9999990}).select()
    .then((data) => {
        console.log(data);
        res.status(200).send({data});
    })
    .catch((err) => {
        res.status(400).send('Sent bad request');
    });
});

app.post('/house/features/:id',(req, res)=>{
    var doc = req.body.data; 
    knex('features').insert(doc)
    .then((data) => {
        var message = `feature_${houseId} was successfully inserted`;    
        res.status(200).send(message);
    })
    .catch((err) => {
        res.status(400).send('Sent bad request');
    });
});

app.post('/house/interior/:id',(req, res)=>{
    var doc = req.body.data; 
    knex('interior').insert(doc)
    .then((data) => {
        var message = `interior_${houseId} was successfully inserted`;    
        res.status(200).send(message);
    })
    .catch((err) => {
        res.status(400).send('Sent bad request');
    });
});

app.delete('/house/features/:id',(req, res)=>{
    var houseId = req.params.id;
    knex('feature').where({house_id: houseId})
    .del().then((data)=>{
        var message = `feature_${houseId} was successfully removed`;    
        res.status(200).send(message);
    })
    .catch((err) => {
        res.status(400).send('Sent bad request');
    });
});

app.delete('/house/interior/:id', (req, res) => {
    var houseId = req.params.id;
    knex('interior').where({feature_id: houseId})
    .del().then((data)=>{
        var message = `interior_${houseId} was successfully removed`;    
        res.status(200).send(message);
    })
    .catch((err) => {
        res.status(400).send('Sent bad request');
    });
});

app.put('/house/features/:id', (req, res) => {
    var houseId = req.params.id
    var update = req.body.update;
    knex('feature').where({house_id: houseId})
    .update(update).then((data)=>{
        console.log(data);
        var message = `feature_${houseId} was successfully updated`;    
        res.status(200).send(message);
    })
    .catch((err) => {
        res.status(400).send('Sent bad request');
    });
});

app.put('/house/interior/:id',(req, res)=>{
    var houseId = req.params.id
    var update = req.body.update;
    knex('interior').where({feature_id: houseId})
    .update(update).then((data)=>{
        console.log(data);
        var message = `interior_${houseId} was successfully updated`;    
        res.status(200).send(message);
    })
    .catch((err) => {
        res.status(400).send('Sent bad request');
    });
});

app.listen(port, (req, res)=>{
  console.log(`Listening on Port: ${port}`);
});

module.exports = app;