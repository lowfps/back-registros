import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class Programa extends ManagerDB {

    public getPrograma(req: Request, res: Response): Promise<any> {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query: string = 'SELECT * FROM programa';
        return Programa.executeQuery(query, req, res, 'SELECT');
    }

    public createPrograma(req: Request, res: Response): Promise<any> {
        const query: string = 'INSERT INTO programa(cod_programa, nombre_programa, fechacreacion_programa) VALUES($1, $2, $3)';
        const parameters = [req.body.cod_programa, req.body.nombre_programa, req.body.fechacreacion_programa];
        return Programa.executeQuery(query, parameters, res, 'INSERT');
    }

    public deletePrograma(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.cod_programa))) {
            const query: string = 'DELETE FROM programa WHERE cod_programa = $1';
            const parameters = [Number(req.params.cod_programa)];
            return Programa.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    // public updateFuncionUsuario(req: Request, res: Response): Promise<any> {
    //     if (!isNaN(Number(req.params.codRol))) {
    //         delete req.body.codrol;
    //         const query: string = 'UPDATE rol SET namerol = $2 WHERE codrol = $1';
    //         const parameters = [Number(req.params.codRol), req.body.namerol];
    //         return Programa.executeQuery(query, parameters, res, 'UPDATE');
    //     }
    //     return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    // }
}

const programaController = new Programa();
export default programaController;