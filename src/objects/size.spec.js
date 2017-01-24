import { expect } from "chai";
import Size from "./size";

describe("Size component",() => {
    it("initialises", () => {
        expect(() => {new Size()}).to.not.throw();
    });

    it("creates Size element", () => {
        const size = new Size(50, 300);
        expect(size.width).to.equal(50);
        expect(size.height).to.equal(300);
    });
});