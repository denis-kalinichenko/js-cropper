import { expect } from "chai";
import Point from "./point";

describe("Point component",() => {
    let point;

    it("initialises", () => {
        expect(() => {new Point()}).to.not.throw();
    });

    it("creates Point element", () => {
        point = new Point(50, 300);
        expect(point.x).to.equal(50);
        expect(point.y).to.equal(300);
    });
});