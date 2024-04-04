import Company from "./Company.js"

export default class CompanySet {
    #companies

    constructor() {
        this.#companies = new Map()
    }

    addCompanyByName(companyName) {
        const company = new Company(companyName)
        this.#companies.set(companyName, company)

        return company
    }

    doesCompanyExist(companyName) {
        return this.#companies.has(companyName)
    }

    getCompanyByName(name) {
        return this.#companies.get(name)
    }

    printCompanies() {
        const companies = this.#companies.values()
        let company = companies.next()

        while (!company.done) {
            console.log(company.value)
            company = companies.next()
        }
    }

    getCompanies() {
        return this.#companies.values()
    }

    isEmpty() {
        return this.#companies.size === 0
    }

    getSize() {
        return this.#companies.size
    }

    clear() {
        this.#companies.clear()
    }
}
