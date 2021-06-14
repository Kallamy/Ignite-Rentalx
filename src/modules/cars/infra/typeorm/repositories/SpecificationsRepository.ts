import { getRepository, Repository } from "typeorm"

import { 
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name,
        });
        return specification;
    }   
}

export { SpecificationsRepository }

/* class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }
    
    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new  Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });
        
        this.specifications.push(specification);
    }

    findByName(name: string): Specification {
       const specification = this.specifications.find(
           (specification) => specification.name === name
        );
        return specification;
    }   
} */
