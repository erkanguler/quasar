import { describe, expect, test, afterAll, vi } from 'vitest'
import UserSet from './UserSet'

const userSet = new UserSet()

test('Check if there is any user', () => {
    const result = userSet.getSize()
    expect(result).toStrictEqual(0)
})

test('Add a user', () => {
    expect(userSet.getSize()).toStrictEqual(0)
    let emma = userSet.addUserByName('Emma')
    expect(userSet.getSize()).toBe(1)
    expect(userSet.getUserByName('Emma')).toEqual(emma)
})

test('Check if user exists', () => {
    const result = userSet.doesUserExist('Emma')
    expect(result).toStrictEqual(true)
})

test('Get user by name', () => {
    const emma = userSet.getUserByName('Emma')

    if (!emma) {
        throw new Error(`Expecting a value but got "${emma}"`)
    }

    expect(emma.name).toBe('Emma')
})

test('Try to get non-existing user by name', () => {
    const anna = userSet.getUserByName('Anna')
    expect(anna).toStrictEqual(undefined)
})

test('Add a second user', () => {
    expect(userSet.getSize()).toStrictEqual(1)
    let anna = userSet.addUserByName('Anna')
    expect(userSet.getSize()).toBe(2)
    expect(userSet.getUserByName('Anna')).toEqual(anna)
})

describe('Mock console.log', () => {
    const mock = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    afterAll(() => {
        mock.mockReset()
    })

    test('Print all users', () => {
        const emma = { 'name': 'Emma', 'id': 1 }
        const anna = { 'name': 'Anna', 'id': 2 }

        userSet.printUsers()
        expect(mock).toHaveBeenNthCalledWith(1, emma)
        expect(mock).toHaveBeenNthCalledWith(2, anna)
    })
})

test('Add 1,000,000 users', () => {
    for (let index = 0; index < 1000000; index++) {
        userSet.addUserByName(`User${index}`)
    }
})