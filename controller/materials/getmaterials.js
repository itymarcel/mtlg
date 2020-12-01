var express = require('express');
var router = express.Router();
const config = require('../../config');

router.get('/getallmaterials', (request, response) => {
  config.pool.query('SELECT * FROM materials')
    .then(result => response.json(result.rows))
    .catch(e => console.error(e.stack))
});

router.post('/getmaterials', (request, response) => {
  console.log(request.body);
  config.pool.query('SELECT * FROM materials')
    .then(result => {
      const filteredReturn = result.rows.filter(row => {
        return request.body.materialUuids.includes(row.uuid);
      });
      response.json(filteredReturn);
    })
    .catch(e => console.error(e.stack))
});

module.exports = router;
