const pg = require("pg");
const pool = new pg.Client(`${process.env.SERVER_DB_CONNECTION}`);

pool.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  pool.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
  });
});

module.exports = pool;
