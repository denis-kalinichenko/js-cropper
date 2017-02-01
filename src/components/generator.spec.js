import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Generator from "./generator";
import Frame from "./../objects/frame";
import Image from "./image";
import { ContextMock, getContextCalls, CanvasMock, FrameMock } from "./../../test/mock";

describe("Generator component",() => {
    let cleanJsdom;

    beforeEach(function() {
        cleanJsdom = jsdom();
        Generator.__Rewire__("Context", ContextMock);
    });

    afterEach(function() {
        cleanJsdom();
        Generator.__ResetDependency__("Context");
    });

    it("initialises", () => {
        expect(() => {
            new Generator(new Frame(), new CanvasMock())
        }).to.not.throw();
    });

    it("has toDataURL method, which return image as DataURL", () => {
        const canvas = new CanvasMock();
        const frame = new Frame();
        const generator = new Generator(frame, canvas);

        const image = new Image();
        image.setWidth(600);
        image.setHeight(300);

        canvas.setImage(image);

        const toDataURLSpy = spy();

        HTMLCanvasElement.prototype.toDataURL = toDataURLSpy;

        const dataURL = generator.toDataURL();

        expect(toDataURLSpy).to.have.been.called.once();

        const expectedCalls = [
            { name: 'drawImage', arguments: [ {}, 0, 0, 0, 0, 0, 0, 0, 0 ] }
        ];

        expect(getContextCalls()).to.deep.equal(expectedCalls);
    });
});
