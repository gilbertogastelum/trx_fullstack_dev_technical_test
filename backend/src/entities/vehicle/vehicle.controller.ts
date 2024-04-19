import IController from "@common/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import { ApiPath } from "swagger-express-ts";


@ApiPath({
    name: 'Vehicle',
    path: 'vehicle'
})
class VehicleController implements IController {
    public path: string = "vehicle";
    public router: Router = Router();

    constructor() {
        this.inicializarRoutes();
    }

    public inicializarRoutes(): void {
        this.router.get(`/${this.path}/`, this.getVehicles);
    }

    public async getVehicles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            //TOOD
        } catch (error) {
            next(error);
        }
    }
}

export default VehicleController;