import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Frame from "./frame";
import Element from "./../components/element";
import Size from "./size";
import Point from "./point";

describe("Frame component",() => {
    let frame, cleanJsdom;
    const frameProportion = 0.85;

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
        frame.update(element._node);
        expect(frame._size).to.equal((element._node.width > element._node.height) ? element._node.height * frameProportion : element._node.width * frameProportion);
        expect(frame._origin).to.deep.equal({ x: (element._node.width - frame._size) / 2, y: (element._node.height - frame._size) / 2 });
    });

    it("has getRect method, which return a rectangle properties", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element._node);
        expect(frame.getRect().origin).to.be.an.instanceOf(Point);
        expect(frame.getRect().size).to.be.an.instanceOf(Size);
    });

    it("has getMinX method, which return the smallest value of the x-coordinate for the rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element._node);
        expect(frame.getMinX()).to.equal(frame._origin.x);
    });

    it("has getMaxX method, which return the largest value of the x-coordinate for the rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element._node);
        expect(frame.getMaxX()).to.equal(frame._origin.x + frame._size);
    });

    it("has getMinY method, which return the smallest value of the y-coordinate for the rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element._node);
        expect(frame.getMinY()).to.equal(frame._origin.y);
    });

    it("has getMaxY method, which return the largest value of the y-coordinate for the rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element._node);
        expect(frame.getMaxY()).to.equal(frame._origin.y + frame._size);
    });

    it("has getMidX method, which return the x-coordinate that establishes the center of a rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element._node);
        expect(frame.getMidX()).to.equal(frame._origin.x + (frame._size / 2));
    });

    it("has getMidY method, which return the y-coordinate that establishes the center of a rectangle", () => {
        frame = new Frame();
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);
        frame.update(element._node);
        expect(frame.getMidY()).to.equal(frame._origin.y + (frame._size / 2));
    });
});