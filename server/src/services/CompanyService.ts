import { hash } from "bcryptjs";

import { CompanyRepository } from "../repositories/CompanyRepository";

import { Company, NewCompany, CompanyUpdate } from "../database/schema/company";

import { Where } from "../types/query/where";

import { client } from "@/database/client";

import { QueryMany } from "@/types/query";

export class CompanyService {
    private companyRepository = new CompanyRepository(client);

    async findCompanyById(id: string) {
        const where: Where<Company> = { junction: "and", conditions: [{ field: "id", operator: "=", value: id }] };

        return await this.companyRepository.findOne(where);
    }

    async findCompanys(params?: QueryMany<Company>) {
        return await this.companyRepository.findMany(params);
    };

    async createCompany(data: NewCompany) {
        const company: NewCompany = data;

        return await this.companyRepository.create(company);
    }

    async updateCompany(data: CompanyUpdate) {
        const id = data.id!;

        const company: CompanyUpdate = {
            ...data,
            id: undefined,
        };

        return await this.companyRepository.update(id, company);
    }

    async deleteCompany(id: string) {
        return await this.companyRepository.delete(id);
    }
}
