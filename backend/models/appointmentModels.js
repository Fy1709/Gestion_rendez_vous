import { getDbConnection } from '../database/server.js';

export const getAllAppointments = async () => {
    const connection = await getDbConnection();
    const [rows] = await connection.execute('SELECT * FROM client');
    await connection.end();
    return rows;
};

export const createAppointment = async (name, date, hour) => {
    const connection = await getDbConnection();
    const [result] = await connection.execute('INSERT INTO client (name, date, hour) VALUES (?, ?, ?)', [name, date, hour]);
    await connection.end();
    return result.insertId;
};

export const updateAppointment = async (id, name, date, hour) => {
    const connection = await getDbConnection();
    await connection.execute('UPDATE client SET name = ?, date = ?, hour = ? WHERE idclient = ?', [name, date, hour, id]);
    await connection.end();
};

export const deleteAppointment = async (id) => {
    const connection = await getDbConnection();
    await connection.execute('DELETE FROM client WHERE idclient = ?', [id]);
    await connection.end();
};