const { Pool } = require('pg');

const pool = new Pool({
  user: 'jasperchen',
  host: 'localhost',
  database: 'qanda',
  port: 5432
})

module.exports =  pool;