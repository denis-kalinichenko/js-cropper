import { expect } from "chai";
import Point from "./point";

describe("Point component",() => {
    it("initialises", () => {
        expect(() => {new Point()}).to.not.throw();
    });

    it("creates Point element", () => {
        const point = new Point(50, 300);
        expect(point.x).to.equal(50);
        expect(point.y).to.equal(300);
    });

    it("creates Point, even if arguments are not passed", () => {
        const point = new Point();
        expect(point.x).to.equal(0);
        expect(point.y).to.equal(0);
    });
});