import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Frame from "./frame";
import Element from "./../components/element";
import Size from "./size";
import Point from "./point";

describe("Frame component",() => {
    let frame, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {new Frame()}).to.not.throw(Error);
    });

    it("has update method, which update size and coordinates of rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element.getNode());
        expect(frame._size).to.equal(289);
        expect(frame._origin).to.deep.equal({ x: 135.5, y: 25.5 });
    });

    it("has getRect method, which return a rectangle properties", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element.getNode());
        expect(frame.getRect().origin).to.be.an.instanceOf(Point);
        expect(frame.getRect().size).to.be.an.instanceOf(Size);
    });

    it("has getMinX method, which return the smallest value of the x-coordinate for the rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element.getNode());
        expect(frame.getMinX()).to.equal(135.5);
    });

    it("has getMaxX method, which return the largest value of the x-coordinate for the rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element.getNode());
        expect(frame.getMaxX()).to.equal(424.5);
    });

    it("has getMinY method, which return the smallest value of the y-coordinate for the rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element.getNode());
        expect(frame.getMinY()).to.equal(25.5);
    });

    it("has getMaxY method, which return the largest value of the y-coordinate for the rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element.getNode());
        expect(frame.getMaxY()).to.equal(314.5);
    });

    it("has getMidX method, which return the x-coordinate that establishes the center of a rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element.getNode());
        expect(frame.getMidX()).to.equal(280);
    });

    it("has getMidY method, which return the y-coordinate that establishes the center of a rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element.getNode());
        expect(frame.getMidY()).to.equal(170);
    });
});