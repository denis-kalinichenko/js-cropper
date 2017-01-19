import { expect } from "chai";
import Size from "./size";

describe("Size component",() => {
    let size;

    it("initialises", () => {
        expect(() => {new Size()}).to.not.throw(Error);
    });

    it("creates Size element", () => {
        size = new Size(50, 300);
        expect(size.w).to.equal(50);
        expect(size.h).to.equal(300);
    });
});