import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Cutout from "./cutout";
import Canvas from "./canvas";
import Frame from "./../objects/frame";

describe("Cutout component",() => {
    let cutout, cleanJsdom;

    beforeEach(function() {
        cleanJsdom = jsdom();
    });

    afterEach(function() {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {
            new Cutout(new Frame(), new Canvas())
        }).to.not.throw();
    });

    it("has draw method, which draw the cutout over canvas", () => {
        const beginPathSpy = spy();
        const rectSpy = spy();
        const moveToSpy = spy();
        const lineToSpy = spy();
        const closePathSpy = spy();
        const fillSpy = spy();
        HTMLCanvasElement.prototype.getContext = function getContext() {
            return {
                beginPath: beginPathSpy,
                rect: rectSpy,
                moveTo: moveToSpy,
                lineTo: lineToSpy,
                closePath: closePathSpy,
                fill: fillSpy,
                fillRect: () => {}
            };
        };

        const canvas = new Canvas();
        const dimensions = {
            width: 500,
            height: 300,
        };
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);

        const frame = new Frame();
        frame.update(canvas.element);

        cutout = new Cutout(frame, canvas);
        cutout.draw();

        expect(beginPathSpy).to.have.been.called.once();
        expect(rectSpy).to.have.been.called.once.with.exactly(0, 0, dimensions.width, dimensions.height);
        expect(moveToSpy).to.have.been.called.once.with.exactly(frame.getMinX(), frame.getMinY());
        expect(lineToSpy).to.have.been.called.with.exactly(frame.getMinX(), frame.getMaxY());
        expect(lineToSpy).to.have.been.called.with.exactly(frame.getMaxX(), frame.getMaxY());
        expect(lineToSpy).to.have.been.called.with.exactly(frame.getMaxX(), frame.getMinY());
        expect(lineToSpy).to.have.been.called.with.exactly(frame.getMinX(), frame.getMinY());
        expect(closePathSpy).to.have.been.called.once();
        expect(fillSpy).to.have.been.called.once();
    });
});
