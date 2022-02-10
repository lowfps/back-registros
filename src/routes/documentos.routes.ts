import { Router } from 'express';
import documentosController from '../controllers/documentos.controller';

class DocumentosRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/', documentosController.getDocumentos);
        this.router.post('/create', documentosController.createDocumentos);
        this.router.delete('/:id_documentos', documentosController.deleteDocumentos);
        this.router.put('/update/:id_documentos', documentosController.updateDocumentos);
    }
}

const rolRoutes = new DocumentosRoutes();
export default rolRoutes.router;