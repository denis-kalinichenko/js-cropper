import { expect } from "chai";
import Element from "./element";

describe("Base element component",() => {
    let element;

    beforeEach(() => {
        element = new Element();
    });

    it("initialises", () => {
        expect(element).to.not.equal(undefined);
    });
});