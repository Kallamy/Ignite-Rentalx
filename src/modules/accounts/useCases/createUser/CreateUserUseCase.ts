import { hash } from "bcryptjs"
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({
        name, 
        email, 
        password, 
        driver_licence
    }: ICreateUserDTO): Promise<void>{

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new AppError("User already exists");
        }


        const paswordHash = await hash(password, 8);

        await this.usersRepository.create({
            name, 
            email, 
            password: paswordHash,
            driver_licence
        });
    }

}

export { CreateUserUseCase } 