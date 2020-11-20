const http = require('http');
const port = process.env.PORT || 3000;
const pg = require('pg');


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>MTLG server running whooop</h1>');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});


pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   console.log(err+"!!!!!!!!!!!!!!!");
  client.query('SELECT * FROM your_table', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});