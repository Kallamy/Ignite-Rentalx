import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should de able to list all available cars", async () => {
        
        const car = await carsRepositoryInMemory.create({
            name: "Car",
            description: "Car description",
            daily_rate: 110.0,
            licence_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand",
        });

        expect(cars).toEqual([car]);
    });

    it("shoud be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 110.0,
            licence_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    })

    it("shoud be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 110.0,
            licence_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "12345",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    })

})