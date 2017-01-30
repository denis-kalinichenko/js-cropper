import { expect } from "chai";
import validateCallback from "./callback";

describe("Callback validator", () => {
    it("does not throws Error if config is function or not passed", () => {
        expect(() => {validateCallback(() => {})}).to.not.throw();
        expect(() => {validateCallback()}).to.not.throw();
        expect(() => {validateCallback(null)}).to.not.throw();
    });

    it("throws Error if callback is invalid or not passed", () => {
        expect(() => {validateCallback("string")}).to.throw("Invalid callback.");
        expect(() => {validateCallback([])}).to.throw("Invalid callback.");
        expect(() => {validateCallback(1)}).to.throw("Invalid callback.");
        expect(() => {validateCallback(Infinity)}).to.throw("Invalid callback.");
        expect(() => {validateCallback(true)}).to.throw("Invalid callback.");
    });
});