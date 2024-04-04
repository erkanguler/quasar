const ENTER_A_USERNAME = "Enter a username: "
const ENTER_A_COMPANY_NAME = "Enter a company name: "

export default class UI {
    #userSet
    #companySet
    #prompt

    constructor(userSet, companySet, prompt) {
        this.#userSet = userSet
        this.#companySet = companySet
        this.#prompt = prompt
    }

    getUsername() {
        let userName = this.#prompt(ENTER_A_USERNAME).trim()

        while (userName.length < 1) {
            userName = this.#prompt(ENTER_A_USERNAME).trim()
        }

        if (this.#userSet.doesUserExist(userName)) {
            throw new Error('--- The user with that name exists. Please, enter another one!')
        }

        return userName
    }

    getExistingUsername() {
        let uName = this.#prompt(ENTER_A_USERNAME).trim()

        while (!this.#userSet.doesUserExist(uName)) {
            console.log('Please, enter a correct user name!')
            uName = this.#prompt(ENTER_A_USERNAME).trim()
        }

        return uName
    }

    getCompanyName() {
        let companyName = this.#prompt(ENTER_A_COMPANY_NAME).trim()

        while (companyName.length < 1) {
            companyName = this.#prompt(ENTER_A_COMPANY_NAME).trim()
        }

        return companyName
    }

    getExistingCompanyName() {
        let cName = this.#prompt(ENTER_A_COMPANY_NAME).trim()

        while (!this.#companySet.doesCompanyExist(cName)) {
            console.log('Please, enter a correct company name!')
            cName = this.#prompt(ENTER_A_COMPANY_NAME).trim()
        }

        return cName
    }

}
