import { expect } from "chai";
import validateDimension from "./dimension";

describe("Dimension validator", () => {
    it("throws Error if dimension is invalid or not passed", () => {
        expect(() => {validateDimension()}).to.throw("Dimension is not passed or invalid.");
        expect(() => {validateDimension(NaN)}).to.throw("Dimension is not passed or invalid.");
        expect(() => {validateDimension(null)}).to.throw("Dimension is not passed or invalid.");
        expect(() => {validateDimension("string")}).to.throw("Invalid dimension.");
        expect(() => {validateDimension({})}).to.throw("Invalid dimension.");
        expect(() => {validateDimension([])}).to.throw("Invalid dimension.");
        expect(() => {validateDimension(Infinity)}).to.throw("Invalid dimension.");
        expect(() => {validateDimension(true)}).to.throw("Invalid dimension.");
        expect(() => {validateDimension(() => {}) }).to.throw("Invalid dimension.");
        expect(() => {validateDimension(-1)}).to.throw("Invalid dimension.");
    });

    it("returns valid dimension", () => {
        expect(validateDimension(500)).to.equal(500);
    });
});