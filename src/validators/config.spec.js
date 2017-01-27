import { expect } from "chai";
import validateConfig from "./config";

describe("Config validator", () => {
    it("does not throws Error if config is object", () => {
        expect(() => {validateConfig({})}).to.not.throw();
    });

    it("throws Error if config is invalid or not passed", () => {
        expect(() => {validateConfig()}).to.throw("Config is not passed or invalid.");
        expect(() => {validateConfig(null)}).to.throw("Config is not passed or invalid.");
        expect(() => {validateConfig(NaN)}).to.throw("Config is not passed or invalid.");
        expect(() => {validateConfig("string")}).to.throw("Invalid config.");
        expect(() => {validateConfig([])}).to.throw("Invalid config.");
        expect(() => {validateConfig(1)}).to.throw("Invalid config.");
        expect(() => {validateConfig(Infinity)}).to.throw("Invalid config.");
        expect(() => {validateConfig(true)}).to.throw("Invalid config.");
        expect(() => {validateConfig(() => {}) }).to.throw("Invalid config.");
    });
});