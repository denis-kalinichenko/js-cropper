import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Generator from "./generator";
import Canvas from "./canvas";
import Frame from "./../objects/frame";
import Image from "./image";
import { getContextMock } from "./../../test/mock";

describe("Cutout component",() => {
    let cleanJsdom;

    beforeEach(function() {
        cleanJsdom = jsdom();
        getContextMock();
    });

    afterEach(function() {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {
            new Generator(new Frame(), new Canvas())
        }).to.not.throw();
    });

    it("has toDataURL method, which return image as DataURL", () => {
        const canvas = new Canvas();
        const frame = new Frame();
        const generator = new Generator(frame, canvas);

        const image = new Image();
        image.setWidth(600);
        image.setHeight(300);

        canvas.setImage(image);

        const drawImageSpy = spy();
        const toDataURLSpy = spy();

        HTMLCanvasElement.prototype.toDataURL = toDataURLSpy;
        HTMLCanvasElement.prototype.getContext = function getContext() {
            return {
                drawImage: drawImageSpy
            };
        };

        const dataURL = generator.toDataURL();

        expect(toDataURLSpy).to.have.been.called.once();
        expect(drawImageSpy).to.have.been.called.once.with.exactly(
            canvas.getNode(),
            frame.getMinX(),
            frame.getMinY(),
            frame.getRect().size.width,
            frame.getRect().size.height,
            0, 0,
            frame.getRect().size.width,
            frame.getRect().size.height
        );
    });
});
