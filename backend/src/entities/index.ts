import { Router } from "express";
import VehicleController from "./vehicle/vehicle.controller";



class BaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.use(new VehicleController().router);
    }
}

export default BaseRouter;