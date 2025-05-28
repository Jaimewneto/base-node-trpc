import { CompanyService } from "@/services/CompanyService";

import { Where } from "@/types/query/where";

import { NewCompany, Company, CompanyUpdate } from "@/database/schema/company";

export class CompanyController {
    private companyService = new CompanyService();

    async findCompanyById(id: string) {
        try {
            return await this.companyService.findCompanyById(id);
        } catch (error) {
            throw error;
        }
    }

    async findCompanys({ where }: { where?: Where<Company> }) {
        try {
            return await this.companyService.findCompanys();
        } catch (error) {
            throw error;
        }
    }

    async createCompany(input: NewCompany) {
        try {
            return await this.companyService.createCompany(input);
        } catch (error) {
            throw error;
        }
    }

    async updateCompany(id: string, input: CompanyUpdate) {
        try {
            return await this.companyService.updateCompany(id, input);
        } catch (error) {
            throw error;
        }
    }

    async deleteCompany(id: string) {
        try {
            return await this.companyService.deleteCompany(id);
        } catch (error) {
            throw error;
        }
    }
}
