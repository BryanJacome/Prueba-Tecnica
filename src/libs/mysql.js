import { createConnection } from 'mysql2/promise';

export async function getConnection() {
    const connection = await createConnection({
        host: 'localhost',
        user: 'root',
        password: 'pass',
        port: 3306,
        database: 'pruebacrud'
    });
    return connection;
}
