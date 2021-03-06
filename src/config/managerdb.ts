import { Response } from 'express';
import pool from './connectiondb';
import jwt from 'jsonwebtoken';

class ManagerDB {
    protected static async executeQuery(sql: string, parameters: any, res: Response, type: string): Promise < any > {
        //? pool.query(sql, parameters).then(out => {
        pool.result(sql, parameters).then(out => {
            switch (type.toUpperCase()) {
                case 'SELECT':
                    res.status(200).json(out.rows);
                    break;
                case 'INSERT':
                    res.status(200).json({ 'mensaje': 'Registro creado', 'id': out.rows });
                    break;
                case 'DELETE':
                    out.rowCount > 0
                        ? res.status(200).json({ 'mensaje': 'Usuario eliminado', 'Registros afectados': out.rowCount })
                        : res.status(400).json({ 'mensaje': 'Usuario no existe' });
                    break;
                case 'UPDATE':
                    out.rowCount > 0
                        ? res.status(200).json({ 'mensaje': 'Registro actualizado', 'Registros afectados': out.rowCount })
                        : res.status(400).json({ 'mensaje': 'Usuario no existe' });
                    break;
                case 'INSERT-USER':
                    const token = jwt.sign({ 'cod_usuario': out, 'correo_usuario': parameters.correo_usuario }, 'privatekey');
                    res.status(200).json({ 'token': token });
                    break;
                default:
                    res.status(400).json({ 'answer': 'Service not implemented <--' });
                    break;
            }
        })
    }
}

export default ManagerDB;