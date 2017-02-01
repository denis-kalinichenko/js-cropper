import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Generator from "./generator";
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
            new Generator(new FrameMock(), new CanvasMock())
        }).to.not.throw();
    });

    it("has toDataURL method, which return image as DataURL", () => {
        const canvas = new CanvasMock();
        const frame = new FrameMock();
        const generator = new Generator(frame, canvas);

        const toDataURLSpy = spy();

        HTMLCanvasElement.prototype.toDataURL = toDataURLSpy;

        const dataURL = generator.toDataURL();

        const expectedCalls = [
            { name: 'drawImage', arguments: [ canvas.getNode(), 135.5, 25.5, 289, 289, 0, 0, 289, 289 ] }
        ];

        expect(toDataURLSpy).to.have.been.called.once();
        expect(getContextCalls()).to.deep.equal(expectedCalls);
    });
});
