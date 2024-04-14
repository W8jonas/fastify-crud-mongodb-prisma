import {sum} from './index'

describe('Teste inicial', () => {

    test('soma dois números pares', () => {
        expect(sum(5, 5)).toBe(10);
    })
})
