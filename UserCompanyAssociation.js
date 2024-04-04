import CompanySet from "./CompanySet.js"

export default class UserCompanyAssociation {
    #association
    #userSet
    #companySet

    constructor(userSet, companySet) {
        this.#userSet = userSet
        this.#companySet = companySet
        this.#association = new Map()
    }

    #attachUserToCompany(userId, companyId) {
        if (!this.hasCompanyAssociation(companyId)) {
            this.#association.set(companyId, { companyId, users: [userId] })

            return true
        }

        if (this.doesUserExist(companyId, userId)) {
            return false
        }

        this.#association.get(companyId).users.push(userId)

        return true
    }

    hasCompanyAssociation(companyId) {
        return this.#association.has(companyId)
    }

    doesUserExist(companyId, userId) {
        return this.#association.get(companyId).users.includes(userId)
    }

    getAssociationByCompanyId(companyId) {
        return this.#association.get(companyId)
    }

    printAllAssociations() {
        const associations = this.#association.values()
        let association = associations.next()

        while (!association.done) {
            console.log(association.value)
            association = associations.next()
        }
    }

    getAssociations() {
        return Array.from(this.#association.entries())
    }

    getSize() {
        return this.#association.size
    }

    validateUserAndCompany() {
        if (this.#userSet.isEmpty() && this.#companySet.isEmpty()) {
            throw new Error('--- Please, add a user and a company first!')
        }
        if (this.#userSet.isEmpty()) {
            throw new Error('--- Please, add a user first to attach her to a company!')
        }
        if (this.#companySet.isEmpty()) {
            throw new Error('--- Please, add a company first to attach a user to it!')
        }
    }

    attachUserToCompany(existingUsername, existingCompanyName) {
        const user = this.#userSet.getUserByName(existingUsername)
        const company = this.#companySet.getCompanyByName(existingCompanyName)
        const result = this.#attachUserToCompany(user.id, company.id)

        if (!result) {
            throw new Error(`--- You already attached ${user.name} to ${company.name}.`)
        }

        return true
    }

    printUsersAndCompanies() {
        this.#userSet.printUsers()
        this.#companySet.printCompanies()
    }

    clear() {
        this.#association.clear()
    }
}
