import { CompanyService } from "@/services/CompanyService";

import { NewCompany, Company, CompanyUpdate } from "@/database/schema/company";

import { TRPCProtectedRequest, TRPCPublicRequest } from "@/trpc/types";

import { IdentifierSchema, CreateSchema, PatchSchema } from "@/validation/CompanyValidation";

import { WhereSortSchemaSchema } from "@/validation/WhereValidation";

export class CompanyController {
    private companyService = new CompanyService();

    async findCompanyById(req: TRPCProtectedRequest<IdentifierSchema>) {
        try {
            const { id } = req.input;
            return await this.companyService.findCompanyById(id);
        } catch (error) {
            throw error;
        }
    }

    async findCompanys(req: TRPCProtectedRequest<WhereSortSchemaSchema>) {
        try {
            return await this.companyService.findCompanys();
        } catch (error) {
            throw error;
        }
    }

    async createCompany(req: TRPCPublicRequest<CreateSchema>) {
        try {
            const newCompany: NewCompany = req.input;

            return await this.companyService.createCompany(newCompany);
        } catch (error) {
            throw error;
        }
    }

    async updateCompany(req: TRPCProtectedRequest<PatchSchema>) {
        try {
            const companyUpdate: CompanyUpdate = req.input;

            return await this.companyService.updateCompany(companyUpdate);
        } catch (error) {
            throw error;
        }
    }

    async deleteCompany(req: TRPCProtectedRequest<IdentifierSchema>) {
        try {
            const { id } = req.input;

            return await this.companyService.deleteCompany(id);
        } catch (error) {
            throw error;
        }
    }
}
