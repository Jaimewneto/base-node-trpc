import { hash } from "bcryptjs";

import { CompanyRepository } from "../repositories/CompanyRepository";

import { Company, NewCompany, CompanyUpdate } from "../database/schema/company";

import { Where } from "../types/where";

import { client } from "@/database/client";

export class CompanyService {
    private companyRepository = new CompanyRepository(client);

    async findCompanyById(id: string) {
        const where: Where<Company> = { junction: "and", conditions: [{ field: "id", operator: "=", value: id }] };

        return await this.companyRepository.findOne(where);
    }

    async findCompanys() {
        return await this.companyRepository.findMany();
    };

    async createCompany(data: NewCompany) {
        return await this.companyRepository.create(data);
    }

    async updateCompany(id: string, data: CompanyUpdate) {
        return await this.companyRepository.update(id, data);
    }

    async deleteCompany(id: string) {
        return await this.companyRepository.delete(id);
    }
}
