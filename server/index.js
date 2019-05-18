var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');    
var port = 3003;


app.use(express.static(__dirname + '/../client/dist', {maxAge: 5000})); //sets maxAge to 5sec
app.use('/:id',express.static(__dirname + '/../client/dist', {maxAge: 5000}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const knex = require('../knex/knex.js');
const redisClient = require('./redis.js');

app.get('/house/features/:id',async (req, res) => {
    var id = req.params.id;;
    var idF = id+'_F';
    const cacheData = await redisClient.getAsync(idF);
    if(cacheData !== null){
        res.status(200).send(cacheData);
    } else if((cacheData === null) && !isNaN(id)){
        id = Number(id);
        knex('features').where({house_id: id}).select()
        .then(async (data) => {
            if(data.length === 0){
                res.status(400).send(`House ${id} does not exist`);
            } else {
                await redisClient.setAsync(idF, JSON.stringify(data));
                res.status(200).send(data);
            }
        })
        .catch((err) => {
            res.status(400).send(`Sent bad request for house ${id}`);
        });
    } else {
        res.status(400).send(`Sent invalid parameter: ${id}`);
    }
});

app.get('/house/interior/:id', async (req, res)=>{
    var id = req.params.id;;
    var idI = id+'_I';
    const cacheData = await redisClient.getAsync(idI);
    if(cacheData !== null){
        res.status(200).send(cacheData);
    } else if((cacheData === null) && !isNaN(id)){
        id = Number(id);
        knex('interior_features').where({feature_id: id}).select()
        .then(async (data) => {
            if(data.length === 0){
                res.status(400).send(`House ${id} does not exist`);
            } else {
                await redisClient.setAsync(idI, JSON.stringify(data));
                res.status(200).send(data);
            }
        })
        .catch((err) => {
            res.status(400).send(`Sent bad request for house ${id}`);
        });
    } else {
        res.status(400).send(`Sent invalid parameter: ${id}`);
    }
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
        res.status(400).send('Unable to insert into interior due to incorrect params');
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