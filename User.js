export default class User {
    name
    id
    static #counter = 0

    constructor(name) {
        this.name = name
        this.id = ++User.#counter
    }

}
