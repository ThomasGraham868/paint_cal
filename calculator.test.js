const mathOperations = require('./calculator');

describe("calculator tests", () => {
    test('adding 3 + 5 should return 8', () => {
        expect(mathOperations.sum(3, 5)).toBe(8);
    })
})