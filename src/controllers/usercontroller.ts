import { query, Request, Response } from 'express';
import ManagerDB from '../config/managerdb';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController extends ManagerDB {

    public getUsers(req: Request, res: Response): Promise<any> {
        const query: string = 'SELECT * FROM usuario';
        return UserController.executeQuery(query, req, res, 'SELECT');
    }

    public createUser(req: Request, res: Response): Promise<any> {
        //! delete req.body.token;
        const data = bcrypt.hashSync(req.body.clave_usuario, 10);
        const query: string = 'INSERT INTO usuario(cod_usuario, cod_rol, nombre_usuario, correo_usuario, clave_usuario) VALUES($1, $2, $3, $4, $5)';
        const parameters = [req.body.cod_usuario, req.body.cod_rol, req.body.nombre_usuario, req.body.correo_usuario, data];
        // return UserController.executeQuery(query, parameters, res, 'INSERT');
        return UserController.executeQuery(query, parameters, res, 'INSERT-USER');
    }


    public deleteUser(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.cod_usuario))) {
            const query: string = 'DELETE FROM usuario WHERE cod_usuario = $1';
            const parameters = [Number(req.params.cod_usuario)]
            return UserController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    public updateUser(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.cod_usuario))) {
            delete req.body.coduser;
            const query: string = 'UPDATE usuario SET codrol=$2, corre_usuario=$3, clave_usuario=$4 WHERE cod_usuario=$1';
            const parameters = [Number(req.params.cod_usuario), req.body.codrol, req.body.corre_usuario, req.body.clave_usuario];
            return UserController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    public login(){

        

    }




}

const userController = new UserController();
export default userController;