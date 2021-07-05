import { Router } from "express"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsContoller } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsContoller";

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController =  new CreateCarController();
const listAvailableCarsContoller = new ListAvailableCarsContoller();

carsRoutes.post(
    "/", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarController.handle
);

carsRoutes.get("/available",  listAvailableCarsContoller.handle);

export { carsRoutes }
