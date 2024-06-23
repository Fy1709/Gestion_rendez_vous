import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Fynomena1709',
    database: 'appointment'
};

export const getDbConnection = async () => {
    return mysql.createConnection(dbConfig);
};
