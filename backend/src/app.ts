import express, { Application } from 'express';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import BaseRouter from './entities';
import * as swagger from 'swagger-express-ts';
import morganMiddleware from './middlewares/http-logger.middleware';
import cors from 'cors';
import helmet from 'helmet';

class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.inicializarMiddlewares();

        if (process.env.NODE_ENV === 'production') {
            this.inicializarHelmet();
        } else {
            this.inicializarSwagger();
            this.inicializarCors();
        }
        this.incializarControllers();
        this.inicializarErrorHandlers();
    }

    /**
     * @description Incializa los middlewares para nuestra aplicación
     */
    private inicializarMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(morganMiddleware);
    }

    /**
     * @description Inicializa las rutas de nuestra API
     */
    private incializarControllers(): void {
        const baseRouter = new BaseRouter();
        this.app.use('/traxi/api', baseRouter.router);
    }

    /**
     * @description Hacer uso de Cors en nuestra aplicación (solo en desarrollo)
     */
    private inicializarCors(): void {
        this.app.use(cors());
    }

    /**
     * @description Incializar helmet para establecer cabeceras http para mejorar la seguridad de la aplicación (en producción)
     */
    private inicializarHelmet(): void {
        this.app.use(helmet());
    }

    /**
     * @description Inicializar nuestros middlewares para manejar los errores
     */
    private inicializarErrorHandlers(): void {
        this.app.use(errorHandler);
        this.app.use(notFoundHandler);
    }

    /**
     * @description Inicializar swagger para la documentación de nuestra API
     */
    private inicializarSwagger(): void {
        this.app.use('/api-docs/swagger', express.static('swagger'));
        this.app.use(
            '/api-docs/swagger/assets',
            express.static('node_modules/swagger-ui-dist')
        );

        this.app.use(
            swagger.express({
                definition: {
                    externalDocs: {
                        url: 'https://traxi.mx/'
                    },
                    info: {
                        title: 'TRAXI',
                        version: '1.0.0'
                    },
                    responses: {
                        200: {
                            description: 'Petición procesada correctamente.'
                        },
                        500: {
                            description: 'Error interno del servidor.',
                            type: swagger.SwaggerDefinitionConstant.STRING
                        }
                    },
                    basePath: "/traxi/api/"
                }
            })
        );
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Aplicación inicializada en el puerto ${this.port}`);
        });
    }
}

export default App;