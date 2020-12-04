const Pool = require('pg').Pool
const pool = new Pool({
  user: 'jasperchen',
  host: 'localhost',
  database: 'api',
  password: 'qanda',
  port: 3200,
})