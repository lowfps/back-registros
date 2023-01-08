import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class DocumentosController extends ManagerDB {

    public getDocumentos(req: Request, res: Response): Promise<any> {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query: string = 'SELECT * FROM recurso';
        return DocumentosController.executeQuery(query, req, res, 'SELECT');
    }

    public async createDocumentos(req: any, res: Response){
      try {
        const { file } = req.files; 
        const nameFile: any = await uploadFile( req.files );
        console.log(nameFile);
        let typeFile: any = ''; 
        switch (nameFile.extension) {
          case 'docx':
            typeFile = 1
            break;
          case 'pdf':
            typeFile = 2
            break;
          case 'xlsx':
            // Excel
            typeFile = 3
          default:
            break;
        }
        const query: string = 'INSERT INTO recurso(cod_proceso, nombrepublico_recurso, nombreprivado_recurso, tamanno, tipo_recurso) VALUES($1, $2, $3, $4, $5)';
        const parameters = [req.body.cod_proceso, req.body.nombrepublico_recurso, nameFile.nameTmp, file.size, typeFile];
        return DocumentosController.executeQuery(query, parameters, res, 'INSERT');
      } catch (msg) {
        return res.status(400).json({ msg })
      }
    }

    public deleteDocumentos(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.id_documentos))) {
            const query: string = 'DELETE FROM recurso WHERE cod_recurso = $1';
            const parameters = [Number(req.params.id_documentos)];
            return DocumentosController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    public updateDocumentos(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.id_documentos))) {
            delete req.body.id_documentos;
            const query: string = 'UPDATE documentos SET namerol = $2 WHERE codrol = $1';
            const parameters = [Number(req.params.id_documentos), req.body.namerol];
            return DocumentosController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    }
}

const uploadFile = async ( files: any , folder = '' ) => {
  return new Promise(( resolve, reject ) =>{
  
  const { file }  = files;
  const nameCut   = file.name.split('.');
  const extension = nameCut[ nameCut.length-1 ];
  
  // Check Extension File
  const allowExtension = ['pdf', 'docx', 'xlsx'];
  if( !allowExtension.includes( extension ) ) {
    return reject(`La extensión ${extension} no es permitida, extensiones validas: ${allowExtension}`);
  }
  
  const nameTmp = uuidv4() + '.' + extension;
  const uploadPath = path.join(__dirname + '/uploads', folder, nameTmp);
  file.mv(uploadPath, function(err: any) {
      if (err) {
        return reject(err)
      }
      let data = { 
        nameTmp,
        extension,
        uploadPath
      }
      resolve( data )
    });
  });
}

const documentosController = new DocumentosController();
export default documentosController;