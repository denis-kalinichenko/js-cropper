import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Context from "./context";
import Element from "./../components/element";

describe("Context component",() => {
    let cleanJsdom,
        nativeContext,
        fillRectSpy,
        createPatternSpy,
        rectSpy,
        fillSpy,
        beginPathSpy,
        moveToSpy,
        lineToSpy,
        closePathSpy,
        clearRectSpy,
        drawImageSpy;

    beforeEach(function () {
        cleanJsdom = jsdom();

        cleanJsdom = spy();
        fillRectSpy = spy();
        createPatternSpy = spy();
        rectSpy = spy();
        fillSpy = spy();
        beginPathSpy = spy();
        moveToSpy = spy();
        lineToSpy = spy();
        closePathSpy = spy();
        clearRectSpy = spy();
        drawImageSpy = spy();

        HTMLCanvasElement.prototype.getContext = () => {
            return {
                fillRect: fillRectSpy,
                createPattern: createPatternSpy,
                rect: rectSpy,
                fill: fillSpy,
                beginPath: beginPathSpy,
                moveTo: moveToSpy,
                lineTo: lineToSpy,
                closePath: closePathSpy,
                clearRect: clearRectSpy,
                drawImage: drawImageSpy,
            };
        };

        const canvas = new Element("canvas");
        nativeContext = canvas.getContext2d();
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {new Context()}).to.not.throw();
    });

    it("has fillRect() method, which draws a filled rectangle", () => {
        const context = new Context(nativeContext);
        context.fillRect(10, 20, 30, 40);
        expect(context.fillRect).to.be.a("function");
        expect(fillRectSpy).to.have.been.called.once.with.exactly(10, 20, 30, 40);
    });

    it("has fillStyle() method, which sets a fillStyle property", () => {
        const context = new Context(nativeContext);
        context.fillStyle("#FFFFFF");
        expect(context.fillStyle).to.be.a("function");
        expect(nativeContext.fillStyle).to.equal("#FFFFFF");
    });

    it("has createPattern() method, which creates a pattern using the specified image", () => {
        const context = new Context(nativeContext);
        const image = new Element("img");
        context.createPattern(image.getNode(), "repeat");
        expect(context.createPattern).to.be.a("function");
        expect(createPatternSpy).to.have.been.called.once.with.exactly(image.getNode(), "repeat");
    });

    it("has rect() method, which creates a path for a rectangle", () => {
        const context = new Context(nativeContext);
        context.rect(10, 20, 30, 40);
        expect(context.rect).to.be.a("function");
        expect(rectSpy).to.have.been.called.once.with.exactly(10, 20, 30, 40);
    });

    it("has fill() method, which fills the current or given path with the current fill style", () => {
        const context = new Context(nativeContext);
        context.fill();
        expect(context.fill).to.be.a("function");
        expect(fillSpy).to.have.been.called.once();
    });

    it("has beginPath() method, which starts a new path by emptying the list of sub-paths", () => {
        const context = new Context(nativeContext);
        context.beginPath();
        expect(context.beginPath).to.be.a("function");
        expect(beginPathSpy).to.have.been.called.once();
    });

    it("has moveTo() method, which moves the starting point of a new sub-path to the (x, y) coordinates", () => {
        const context = new Context(nativeContext);
        context.moveTo(69, 69);
        expect(context.moveTo).to.be.a("function");
        expect(moveToSpy).to.have.been.called.once.with.exactly(69, 69);
    });

    it("has lineTo() method, which connects last point in the sub-path to x, y coordinates with straight line", () => {
        const context = new Context(nativeContext);
        context.lineTo(69, 69);
        expect(context.lineTo).to.be.a("function");
        expect(lineToSpy).to.have.been.called.once.with.exactly(69, 69);
    });

    it("has closePath() method, which causes the point of the pen to move back to start of current sub-path.", () => {
        const context = new Context(nativeContext);
        context.closePath();
        expect(context.closePath).to.be.a("function");
        expect(closePathSpy).to.have.been.called.once();
    });

    it("has clearRect() method, which connects last point in the sub-path to x, y coordinates with straight line", () => {
        const context = new Context(nativeContext);
        context.clearRect(10, 20, 30, 40);
        expect(context.clearRect).to.be.a("function");
        expect(clearRectSpy).to.have.been.called.once.with.exactly(10, 20, 30, 40);
    });

    it("has drawImage() method, which provides different ways to draw an image onto the canvas", () => {
        const context = new Context(nativeContext);
        const image = new Element("img");
        context.drawImage(image.getNode(), 10, 20, 30, 40);
        expect(context.drawImage).to.be.a("function");
        expect(drawImageSpy).to.have.been.called.once.with.exactly(image.getNode(), 10, 20, 30, 40);
    });
});