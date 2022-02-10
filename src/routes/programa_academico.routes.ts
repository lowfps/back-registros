import { Router } from 'express';
import programaController from '../controllers/programa.controller';

class Programa {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/', programaController.getPrograma);
        this.router.post('/create', programaController.createPrograma);
        this.router.delete('/:cod_programa', programaController.deletePrograma);
        // this.router.put('/update/:codRol', programaController.updateFuncionUsuario);
    }
}

const proAcaRoutes = new Programa();
export default proAcaRoutes.router;