import { describe, expect, test, afterAll, vi } from 'vitest'
import CompanySet from './CompanySet'

const companySet = new CompanySet()

test('Check if there is any company', () => {
    const result = companySet.getSize()
    expect(result).toStrictEqual(0)
})

test('Add a company', () => {
    expect(companySet.getSize()).toStrictEqual(0)
    let company = companySet.addCompanyByName('Volvo')
    expect(companySet.getSize()).toBe(1)
    expect(companySet.getCompanyByName('Volvo')).toEqual(company)
})

test('Check if company exists', () => {
    const result = companySet.doesCompanyExist('Volvo')
    expect(result).toStrictEqual(true)
})

test('Get company by name', () => {
    const volvo = companySet.getCompanyByName('Volvo')

    if (!volvo) {
        throw new Error(`Expecting a value but got "${volvo}"`)
    }

    expect(volvo.name).toBe('Volvo')
})

test('Try to get non-existing company by name', () => {
    const ford = companySet.getCompanyByName('Ford')
    expect(ford).toStrictEqual(undefined)
})

test('Add a company', () => {
    let company = companySet.addCompanyByName('Ford')
})

describe('Mock console.log', () => {
    const mock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    afterAll(() => {
        mock.mockReset()
    })

    test('Print all companies', () => {
        const volvo = { 'name': 'Volvo', 'id': 1 }
        const ford = { 'name': 'Ford', 'id': 2 }

        companySet.printCompanies()
        expect(mock).toHaveBeenNthCalledWith(1, volvo)
        expect(mock).toHaveBeenNthCalledWith(2, ford)
    })
})

test('Add 1,000,000 companies', () => {
    for (let index = 0; index < 1000000; index++) {
        companySet.addCompanyByName(`Ford${index}`)
    }
})

