import { Router } from "express"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsContoller } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsContoller";

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCarSpeificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController =  new CreateCarController();
const listAvailableCarsContoller = new ListAvailableCarsContoller();
const createCarSpecificationController = new CreateCarSpeificationController();

carsRoutes.post(
    "/", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarController.handle
);

carsRoutes.get("/available",  listAvailableCarsContoller.handle);

carsRoutes.post(
    "/specifications/:id", 
        ensureAuthenticated, 
        ensureAdmin, 
        createCarSpecificationController.handle
    );

export { carsRoutes }
