import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pizza_ordering_service',
  password: 'mysecretpassword',
  port: 5432,
});
export default pool;
