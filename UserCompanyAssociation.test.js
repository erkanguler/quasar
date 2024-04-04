import { describe, expect, test, afterAll, vi } from 'vitest'
import UserCompanyAssociation from './UserCompanyAssociation'
import UserSet from './UserSet'
import CompanySet from './CompanySet'

const userSet = new UserSet()
const companySet = new CompanySet()
const association = new UserCompanyAssociation(userSet, companySet)
const userId1 = 1
const userId2 = 2
const companyId = 1
const existingUsername = 'Emma'
const existingUsername2 = 'Anna'
const existingCompanyName = 'Volvo'


describe('Testing association of user-company', () => {

    test('Check if there is any association', () => {
        expect(association.getSize()).toStrictEqual(0)
    })

    test('Attach a user to a company', () => {
        userSet.addUserByName(existingUsername)
        companySet.addCompanyByName(existingCompanyName)

        const result = association.attachUserToCompany(existingUsername, existingCompanyName)
        expect(result).toStrictEqual(true)
        expect(association.getSize()).toBe(1)

        const company = association.getAssociationByCompanyId(companyId)
        expect(company.companyId).toBe(companyId)
        expect(company.users[0]).toBe(userId1)
    })

    test('Attach a second user to the same company', () => {
        userSet.addUserByName(existingUsername2)
        const result = association.attachUserToCompany(existingUsername2, existingCompanyName)
        expect(result).toStrictEqual(true)

        expect(association.getSize()).toBe(1)
        const company = association.getAssociationByCompanyId(companyId)
        expect(company.companyId).toBe(companyId)
        expect(company.users.length).toBe(2)
        expect(company.users[1]).toBe(userId2)
    })

    test('Try to attach same user to the same company', () => {
        expect(() => {
            association.attachUserToCompany(existingUsername, existingCompanyName)
        }).toThrow(`--- You already attached ${existingUsername} to ${existingCompanyName}.`)

        expect(association.getSize()).toBe(1)
        const company = association.getAssociationByCompanyId(companyId)
        expect(company.companyId).toBe(companyId)
        expect(company.users[0]).toBe(userId1)
    })

    test('Has this company any association', () => {
        let result = association.hasCompanyAssociation(companyId)
        expect(result).toStrictEqual(true)
    })

    describe('Mock console.log', () => {
        const mock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

        afterAll(() => {
            mock.mockReset()
        })

        test('Print all associations', () => {
            association.printAllAssociations()
            expect(mock).toHaveBeenLastCalledWith({ 'companyId': companyId, 'users': [userId1, userId2] })
        })
    })

    test('Create 1,000,000 users and companies and then attach each user to each company', () => {
        let user = null
        let company = null
        const size = 1000000

        for (let index = 0; index < size; index++) {
            user = userSet.addUserByName(`user${index}`)
            company = companySet.addCompanyByName(`company${index}`)
            association.attachUserToCompany(user.name, company.name)
        }

        expect(association.getSize()).toBe(size + 1)
    })

})
