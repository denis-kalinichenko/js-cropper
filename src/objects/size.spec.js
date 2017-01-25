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

    it("creates Size, even if arguments are not passed", () => {
        const size = new Size();
        expect(size.width).to.equal(0);
        expect(size.height).to.equal(0);
    });
});