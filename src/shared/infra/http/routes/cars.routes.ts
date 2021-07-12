import { Router } from "express"
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsContoller } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsContoller";

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCarSpeificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";
import uploadConfig from "@config/upload";

const carsRoutes = Router();

const createCarController =  new CreateCarController();
const listAvailableCarsContoller = new ListAvailableCarsContoller();
const createCarSpecificationController = new CreateCarSpeificationController();
const uploadCarImagesController = new UploadCarImagesController();


const upload = multer(uploadConfig.upload("./tmp/cars"))

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

carsRoutes.post(
    "/images/:id", 
    ensureAuthenticated, 
    ensureAdmin,
    upload.array("images"),
    uploadCarImagesController.handle
)
export { carsRoutes }
