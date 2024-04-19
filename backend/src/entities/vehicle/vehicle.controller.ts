import IController from "@common/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";
import { Vehicle } from "./vehicle.model";
import VehicleDao from "./vehicle.dao";
import { StatusCodes } from "http-status-codes";

@ApiPath({
    name: 'Vehicle',
    path: '/vehicle'
})
class VehicleController implements IController {
    public path: string = "vehicle";
    public router: Router = Router();

    constructor() {
        this.inicializarRoutes();
    }

    public inicializarRoutes(): void {
        this.router.post(`/${this.path}/`, this.createVehicle);
        this.router.get(`/${this.path}/`, this.getVehicles);
        this.router.get(`/${this.path}/detail/`, this.getVehicleDetail);
        this.router.put(`/${this.path}/`, this.updateVehicle);
        this.router.put(`/${this.path}/status/`, this.updateVehicleStatus);
        this.router.delete(`/${this.path}/`, this.deleteVehicle);
    }


    @ApiOperationPost({
        path: '/',
        parameters: {
            body: {
                properties: {
                    placa: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    noEconomico: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    vim: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    noAsiento: {
                        type: SwaggerDefinitionConstant.NUMBER,
                        required: true
                    },
                    seguro: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    noSeguro: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    marca: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    modelo: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    anio: {
                        type: SwaggerDefinitionConstant.NUMBER,
                        required: true
                    },
                    color: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    }
                }
            }
        },
        responses: {
            '200': {
                description: 'Vehículo creado correctamente.',
                type: SwaggerDefinitionConstant.STRING
            }
        }
    })
    public async createVehicle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vehicle: Vehicle = new Vehicle(req.body);
            await vehicle.validateData(vehicle);
            await VehicleDao.createVehicle(vehicle);
            res.status(StatusCodes.OK).json('Vehículo creado correctamente.');
        } catch (error) {
            next(error);
        }
    }


    @ApiOperationGet({
        path: '/',
        responses: {
            '200': {
                model: 'Vehicle',
                type: SwaggerDefinitionConstant.ARRAY
            }
        }
    })
    public async getVehicles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vehicles: Vehicle[] = await VehicleDao.getVehicles();
            res.status(StatusCodes.OK).json(vehicles);
        } catch (error) {
            next(error);
        }
    }

    @ApiOperationGet({
        path: '/detail',
        parameters: {
            query: {
                'vim': {
                    name: 'vim',
                    type: SwaggerDefinitionConstant.STRING,
                    required: true,
                    description: ''
                }
            }
        },
        responses: {
            '200': {
                model: 'Vehicle',
                type: SwaggerDefinitionConstant.OBJECT
            }
        }
    })
    public async getVehicleDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query: any = req.query;
            const { vim } = query;
            const vehicleDetail: Vehicle = await VehicleDao.getVehicleDetail(vim);
            res.status(StatusCodes.OK).json(vehicleDetail);
        } catch (error) {
            next(error);
        }
    }

    
    @ApiOperationPut({
        path: '/',
        parameters: {
            body: {
                properties: {
                    placa: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    noEconomico: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    vim: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    noAsiento: {
                        type: SwaggerDefinitionConstant.NUMBER,
                        required: true
                    },
                    seguro: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    noSeguro: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    marca: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    modelo: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    },
                    anio: {
                        type: SwaggerDefinitionConstant.NUMBER,
                        required: true
                    },
                    color: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    }
                }
            }
        },
        responses: {
            '200': {
                description: 'Vehículo modificado correctamente.',
                type: SwaggerDefinitionConstant.STRING
            }
        }
    })
    public async updateVehicle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vehicle: Vehicle = new Vehicle(req.body);
            await vehicle.validateData(vehicle);
            await VehicleDao.updateVehicle(vehicle);
            res.status(StatusCodes.OK).json('Vehículo modificado correctamente.');
        } catch (error) {
            next(error);
        }
    }
    
    @ApiOperationPut({
        path: '/status',
        parameters: {
            body: {
                properties: {
                    vim: {
                        type: SwaggerDefinitionConstant.STRING,
                        required: true
                    }
                }
            }
        },
        responses: {
            '200': {
                description: 'Estatus modificado correctamente.',
                type: SwaggerDefinitionConstant.STRING
            }
        }
    })
    public async updateVehicleStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vim: string = req.body.vim;
            await VehicleDao.updateVehicleStatus(vim);
            res.status(StatusCodes.OK).json('Estatus modificado correctamente.');
        } catch (error) {
            next(error)
        }
    }

    @ApiOperationDelete({
        path: '/',
        parameters: {
            query: {
                'vim': {
                    name: 'vim',
                    type: SwaggerDefinitionConstant.STRING,
                    required: true,
                    description: ''
                }
            }
        },
        responses: {
            '200': {
                description: 'Vehículo eliminado correctamente.',
                type: SwaggerDefinitionConstant.STRING
            }
        }
    })
    public async deleteVehicle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query: any = req.query;
            const { vim } = query;
            await VehicleDao.deleteVehicle(vim);
            res.status(StatusCodes.OK).json('Vehículo eliminado correctamente.');
        } catch (error) {
            next(error);
        }
    }
}

export default VehicleController;