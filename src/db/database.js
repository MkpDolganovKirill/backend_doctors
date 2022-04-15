const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: 'user123',
  host: 'localhost',
  port: 5432,
  database: 'doctor'
});



module.exports = pool;