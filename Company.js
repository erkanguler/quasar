export default class Company {
    name
    id
    static #counter = 0

    constructor(name) {
        this.name = name
        this.id = ++Company.#counter
    }

}
