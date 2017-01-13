import {expect, spy} from "chai";
import jsdom from "jsdom-global"
import Canvas from "./canvas";
import Image from "./image";

describe("Canvas component", function () {
    let canvas, wrapper, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {
            new Canvas()
        }).to.not.throw(Error);
    });

    it("has setWidth method, which set width attribute of canvas element", () => {
        canvas = new Canvas();
        const width = 100;

        canvas.setWidth(width);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.width).to.equal(width);
    });

    it("has setHeight method, which set height attribute of canvas element", () => {
        canvas = new Canvas();
        const height = 150;

        canvas.setHeight(height);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.height).to.equal(height);
    });

    it("has setImage method, which pass the Image object into Canvas and returns this", () => {
        canvas = new Canvas();
        canvas.render(wrapper);

        let image = new Image();
        image = image.load("http://i.imgur.com/PJPXonr.jpg");
        return image.then(() => {
            expect(canvas.setImage).to.be.a("function");
            canvas.setImage(image);
            expect(canvas._image).to.equal(image);
        });
    });

    it("has draw method, which draw the Image and returns this", () => {
        const dimensions = {
            width: 1000,
            height: 1000
        };

        canvas = new Canvas();
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);
        canvas.render(wrapper);
        const canvasNode = wrapper.querySelector("canvas");
        let image = new Image();
        image = image.load("http://i.imgur.com/PJPXonr.jpg");
        return image.then(() => {
            const clearRectSpy = spy();
            const drawImageSpy = spy();
            canvas._context = {
                clearRect: clearRectSpy,
                drawImage: drawImageSpy
            };
            expect(clearRectSpy).to.not.have.been.called();
            expect(drawImageSpy).to.not.have.been.called();

            canvas.setImage(image);
            canvas.draw();
            expect(clearRectSpy).to.have.been.called.once.with.exactly(0, 0, dimensions.width, dimensions.height);
            expect(drawImageSpy).to.have.been.called.once.with.exactly(image.element, 0, 0);

        });
    });
});