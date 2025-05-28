import { router, protectedProcedure } from "../..";

import { CompanyController } from "@/controllers/CompanyController";

import { CompanyValidation } from "@/validation/CompanyValidation";
import { WhereSortValidation } from "@/validation/WhereValidation";

const companyController = new CompanyController();

export const companyRouter = router({
    getCompany: protectedProcedure
        .input(CompanyValidation.identifierSchema)
        .query((req) => companyController.findCompanyById(req)),

    getCompanys: protectedProcedure
        .input(WhereSortValidation.WhereSortSchema || undefined)
        .query((req) => companyController.findCompanys(req)),

    createCompany: protectedProcedure
        .input(CompanyValidation.createSchema)
        .mutation((req) => companyController.createCompany(req)),

    updateCompany: protectedProcedure
        .input(CompanyValidation.patchSchema)
        .mutation((req) => companyController.updateCompany(req)),

    deleteCompany: protectedProcedure
        .input(CompanyValidation.identifierSchema)
        .mutation((req) => companyController.deleteCompany(req)),
});
