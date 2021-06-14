import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPaylod {
    sub: string;
}
export async function ensureAuthenticated(request: Request, reponse: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;


    if(!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    const [, token] = authHeader.split(" ");

    try { 
        const { sub: user_id } = verify(
            token, 
            "ea1521a7a0769553d1fc27cc1b0ce612"
            ) as IPaylod;
        
        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("user does not exist!", 401);
        }

        request.user = {
            id: user_id
        }

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
    

}