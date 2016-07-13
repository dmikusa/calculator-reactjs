jest.disableAutomock()
import * as funcs from '../Operations'

describe('check calculator functions', () => {
    it('should add two numbers', () => {
        expect(funcs.add(1, 1)).toBe(2);
    });
    it('should subtract two numbers', () => {
        expect(funcs.subtract(2, 1)).toBe(1);
    });
    it('should multiply two numbers', () => {
        expect(funcs.multiply(2, 2)).toBe(4);
    });
    it('should divide two numbers', () => {
        expect(funcs.divide(8, 2)).toBe(4);
    });
    it('should negate a number', () => {
        expect(funcs.negate(5)).toBe(-5);
        expect(funcs.negate(-5)).toBe(5);
    });
    it('should return the percent value of a number', () => {
        expect(funcs.percent(65)).toBe(0.65);
        expect(funcs.percent(57)).toBe(0.57);
    });
});
