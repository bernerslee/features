const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');
const data = require('../database/index');
const features = require('../database/createMockData');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/../client/dist', {maxAge: 5000}));

app.get('/house/features/:id', (req, res) => {
  data.getFeatures(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/:id', (req, res) => {
  data.getFeatures(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/house/interior/:id', (req, res) => {
  data.getInterior(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// app.get('/house/features/:id', (req, res) => {
//   data.getBedBaths(req.params.id, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

