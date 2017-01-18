import {expect, spy} from "chai";
import jsdom from "jsdom-global"
import Canvas from "./canvas";
import Image from "./image";
import Element from "./element";
import {getContextMock} from "./../../test/mock";

describe("Canvas component", function () {
    let canvas, wrapper, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
        getContextMock();
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {
            new Canvas()
        }).to.not.throw(Error);
    });

    it("has render method, which set borderRadius, draw background pattern, call render() method from Element class and return this", () => {
        canvas = new Canvas();
        expect(canvas.render).to.be.a("function");

        const createBackgroundPatternSpy = spy();
        const drawBackgroundSpy = spy();
        canvas._createBackgroundPattern = createBackgroundPatternSpy;
        canvas._drawBackground = drawBackgroundSpy;

        let renderedCanvas = canvas.render(wrapper);
        expect(wrapper.querySelectorAll("canvas")).to.have.length(1);
        expect(wrapper.querySelectorAll("canvas")[0].style.borderRadius).to.equal("3px");
        expect(createBackgroundPatternSpy).to.have.been.called.once();
        expect(drawBackgroundSpy).to.have.been.called.once();
        expect(renderedCanvas).to.equal(canvas);
    });

    it("has setWidth method, which set width attribute of canvas element and call _calcFrameSize()", () => {
        canvas = new Canvas();
        const width = 100;

        const calcFrameSizeSpy = spy();
        canvas._calcFrameSize = calcFrameSizeSpy;

        canvas.setWidth(width);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.width).to.equal(width);
        expect(calcFrameSizeSpy).to.have.been.called.once();
    });

    it("has setHeight method, which set height attribute of canvas element and call _calcFrameSize()", () => {
        canvas = new Canvas();
        const height = 150;

        const calcFrameSizeSpy = spy();
        canvas._calcFrameSize = calcFrameSizeSpy;

        canvas.setHeight(height);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.height).to.equal(height);
        expect(calcFrameSizeSpy).to.have.been.called.once();
    });

    it("has setImage method, which pass the Image object into Canvas and returns this", () => {
        canvas = new Canvas();
        canvas.render(wrapper);

        const image = new Image();
        image.element.width = 300;
        image.element.height = 300;
        expect(canvas.setImage).to.be.a("function");
        canvas.setImage(image);
        expect(canvas._image).to.equal(image);
    });

    it("has setImage method, which set to zero last points", () => {
        canvas = new Canvas();
        canvas.render(wrapper);

        const image = new Image();
        canvas._lastPointX = 69;
        canvas._lastPointY = 69;
        canvas._baseX = 69;
        canvas._baseY = 69;

        canvas.setImage(image);
        expect(canvas._lastPointX).to.equal(0);
        expect(canvas._lastPointY).to.equal(0);
        expect(canvas._baseX).to.equal(0);
        expect(canvas._baseY).to.equal(0);
    });

    it("has setImage method, which calculate and set scale", () => {
        canvas = new Canvas();
        canvas.render(wrapper);

        canvas._frameSize = 130;
        let image = new Image();
        image.element.width = 600;
        image.element.height = 300;
        canvas.setImage(image);
        expect(canvas._scale).to.equal(canvas._frameSize / image.element.height);

        canvas._frameSize = 130;
        image = new Image();
        image.element.width = 300;
        image.element.height = 600;
        canvas.setImage(image);
        expect(canvas._scale).to.equal(canvas._frameSize / image.element.width);

        canvas._frameSize = 150;
        image = new Image();
        image.element.width = 50;
        image.element.height = 50;
        canvas.setImage(image);
        expect(canvas._scale).to.equal(1);
    });

    it("has draw method, which call drawImage and initEventListeners methods returns this", () => {
        canvas = new Canvas();
        canvas.setWidth(300);
        canvas.setHeight(300);

        const drawImageSpy = spy();
        canvas._drawImage = drawImageSpy;
        const initEventListenersSpy = spy();
        canvas._initEventListeners = initEventListenersSpy;

        canvas.render(wrapper);

        let image = new Image();
        image.element.width = 1000;
        image.element.height = 500;
        image._checkFormat();
        canvas.setImage(image);
        const drawedCanvas = canvas.draw();

        expect(drawImageSpy).to.have.been.called.once.with.exactly(canvas._cutoutWidth - ((canvas._imageAbsoluteWidth() - canvas._frameSize) / 2), canvas._cutoutHeight);
        expect(initEventListenersSpy).to.have.been.called.once();
        expect(drawedCanvas).to.equal(canvas);

        image = new Image();
        image.element.width = 500;
        image.element.height = 1000;
        image._checkFormat();
        canvas.setImage(image);
        canvas.draw();

        expect(drawImageSpy).to.have.been.called.with.exactly(canvas._cutoutWidth, canvas._cutoutHeight - ((canvas._imageAbsoluteHeight() - canvas._frameSize) / 2));
        expect(initEventListenersSpy).to.have.been.called();
    });

    it("has clear method, which clear canvas 2d context and return this", () => {
        const clearRectSpy = spy();
        HTMLCanvasElement.prototype.getContext = function getContext(contextId) {
            return {
                clearRect: clearRectSpy
            };
        };

        canvas = new Canvas();
        const dimensions = {
            width: 500,
            height: 300,
        };
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);

        const clearedCanvas = canvas.clear();
        expect(clearedCanvas).to.equal(canvas);
        expect(clearRectSpy).to.have.been.called.once.with.exactly(0, 0, dimensions.width, dimensions.height);
    });

    it("has _drawCutout method, which draw the cutout over canvas and return this", () => {
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
            };
        };

        canvas = new Canvas();
        const dimensions = {
            width: 500,
            height: 300,
        };
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);

        const drawerCanvas = canvas._drawCutout();
        expect(drawerCanvas).to.equal(canvas);

        expect(beginPathSpy).to.have.been.called.once();
        expect(rectSpy).to.have.been.called.once.with.exactly(0, 0, dimensions.width, dimensions.height);
        expect(moveToSpy).to.have.been.called.once.with.exactly(canvas._cutoutWidth, canvas._cutoutHeight);
        expect(lineToSpy).to.have.been.called.with.exactly(canvas._cutoutWidth, dimensions.height - canvas._cutoutHeight);
        expect(lineToSpy).to.have.been.called.with.exactly(dimensions.width - canvas._cutoutWidth, dimensions.height - canvas._cutoutHeight);
        expect(lineToSpy).to.have.been.called.with.exactly(dimensions.width - canvas._cutoutWidth, canvas._cutoutHeight);
        expect(lineToSpy).to.have.been.called.with.exactly(canvas._cutoutWidth, canvas._cutoutHeight);
        expect(closePathSpy).to.have.been.called.once();
        expect(fillSpy).to.have.been.called.once();
    });

    it("has _createBackgroundPattern method, which create canvas with pattern and return this", () => {
        const fillRectSpy = spy();
        HTMLCanvasElement.prototype.getContext = function getContext() {
            return {
                fillRect: fillRectSpy
            };
        };

        canvas = new Canvas();
        const dimensions = {
            width: 500,
            height: 300,
        };
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);

        const drawerCanvas = canvas._createBackgroundPattern();
        expect(drawerCanvas).to.equal(canvas);
        expect(canvas._pattern).to.be.an.instanceof(Element);
        expect(fillRectSpy).to.have.been.called.with.exactly(0, 0, 8, 8);
        expect(fillRectSpy).to.have.been.called.with.exactly(8, 0, 8, 8);
        expect(fillRectSpy).to.have.been.called.with.exactly(0, 8, 8, 8);
        expect(fillRectSpy).to.have.been.called.with.exactly(8, 8, 8, 8);
    });

    it("has _drawBackground method, which draw background and return this", () => {
        const createPatternSpy = spy();
        const rectSpy = spy();
        const fillSpy = spy();
        HTMLCanvasElement.prototype.getContext = function getContext() {
            return {
                createPattern: createPatternSpy,
                rect: rectSpy,
                fill: fillSpy,
                fillRect: () => {
                }
            };
        };

        canvas = new Canvas();
        const dimensions = {
            width: 500,
            height: 300,
        };
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);
        canvas._createBackgroundPattern();
        const drawedCanvas = canvas._drawBackground();
        expect(drawedCanvas).to.equal(canvas);
        expect(createPatternSpy).to.have.been.called.once.with.exactly(canvas._pattern.element, "repeat");
        expect(rectSpy).to.have.been.called.once.with.exactly(0, 0, dimensions.width, dimensions.height);
        expect(fillSpy).to.have.been.called.once();
    });

    describe("_initEventListeners method", () => {
        it("adds event listener for mousedown", () => {
            const addEventListenerSpy = spy();
            canvas = new Canvas();
            canvas.element.addEventListener = addEventListenerSpy;
            const dimensions = {
                width: 500,
                height: 300,
            };
            canvas.setWidth(dimensions.width);
            canvas.setHeight(dimensions.height);
            canvas._initEventListeners();
            expect(addEventListenerSpy).to.have.been.called();
        });

        it("adds event listener for mouseup", () => {
            const addEventListenerSpy = spy();
            canvas = new Canvas();
            document.addEventListener = addEventListenerSpy;
            const dimensions = {
                width: 500,
                height: 300,
            };
            canvas.setWidth(dimensions.width);
            canvas.setHeight(dimensions.height);
            canvas._initEventListeners();
            expect(addEventListenerSpy).to.have.been.called.with("mouseup");
        });
    });

    it("has mousedown/touchstart event listener", () => {
        canvas = new Canvas();
        const dimensions = {
            width: 500,
            height: 300,
        };
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);

        const windowToCanvasSpy = spy();
        canvas._windowToCanvas = windowToCanvasSpy;
        canvas._initEventListeners();
        const event = new MouseEvent("mousedown", {
            clientX: 50,
            clientY: 100,
        });
        canvas.element.dispatchEvent(event);
        expect(windowToCanvasSpy).to.have.been.called.with.exactly(50, 100);
    });

    it("has mousemove/touchmove event listener", () => {
        canvas = new Canvas();
        const dimensions = {
            width: 500,
            height: 300,
        };
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);

        const windowToCanvasSpy = spy();
        const drawImageSpy = spy();
        canvas._initEventListeners();
        canvas._windowToCanvas = windowToCanvasSpy;
        canvas._drawImage = drawImageSpy;

        let event = new MouseEvent("mousedown", {
            clientX: 10,
            clientY: 10,
        });
        canvas.element.dispatchEvent(event);

        event = new MouseEvent("mousemove", {
            clientX: 50,
            clientY: 100,
        });
        document.dispatchEvent(event);

        expect(windowToCanvasSpy).to.have.been.called.with.exactly(50, 100);
    });

    it("has mouseup/touchend event listener", () => {
        const removeEventListenerSpy = spy();
        document.removeEventListener = removeEventListenerSpy;

        canvas = new Canvas();
        const dimensions = {
            width: 500,
            height: 300,
        };
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);

        canvas._initEventListeners();
        const event = new MouseEvent("mouseup", {
            clientX: 50,
            clientY: 100,
        });
        document.dispatchEvent(event);
        expect(removeEventListenerSpy).to.have.been.called.with("mousemove");
        expect(removeEventListenerSpy).to.have.been.called.with("touchmove");
    });

    it("has _windowToCanvas method, which translate HTML coordinates to Canvas coordinates.", () => {
        const getBoundingClientRectSpy = spy(() => {
            return {
                bottom: 348,
                height: 340,
                left: 8,
                right: 568,
                top: 8,
                width: 560,
            }
        });

        HTMLCanvasElement.prototype.getContext = function getContext() {
            return {
                canvas: {
                    getBoundingClientRect: getBoundingClientRectSpy
                }
            }
        };

        canvas = new Canvas();
        const dimensions = {
            width: 560,
            height: 340,
        };

        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);

        expect(canvas._windowToCanvas(10, 10)).to.deep.equal({x: 2, y: 2});
        expect(canvas._windowToCanvas(0, 5)).to.deep.equal({x: -8, y: -3});
        expect(getBoundingClientRectSpy).to.have.been.called();
    });

    it("has _imageAbsoluteWidth method, which return absolute width of scaled image", () => {
        canvas = new Canvas();
        canvas._scale = 0.5;
        canvas._image.element.width = 300;
        expect(canvas._imageAbsoluteWidth()).to.equal(canvas._image.element.width * canvas._scale);
    });

    it("has _imageAbsoluteHeight method, which return absolute height of scaled image", () => {
        canvas = new Canvas();
        canvas._scale = 0.5;
        canvas._image.element.height = 69;
        expect(canvas._imageAbsoluteHeight()).to.equal(canvas._image.element.height * canvas._scale);
    });

    it("has drawImage method, which draw an Image and returns this", () => {
        const dimensions = {
            width: 1000,
            height: 1000
        };
        canvas = new Canvas();
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);
        canvas.render(wrapper);

        const image = new Image();
        image.element.width = 600;
        image.element.height = 300;
        image._checkFormat();

        const drawImageSpy = spy();
        const clearSpy = spy();
        const drawBackgroundSpy = spy();
        const drawCutoutSpy = spy();
        canvas._context = {
            drawImage: drawImageSpy
        };
        canvas.clear = clearSpy;
        canvas._drawBackground = drawBackgroundSpy;
        canvas._drawCutout = drawCutoutSpy;

        canvas.setImage(image);
        canvas._drawImage(10, 10);

        expect(clearSpy).to.have.been.called.once();
        expect(drawBackgroundSpy).to.have.been.called.once();
        expect(drawCutoutSpy).to.have.been.called.once();
        expect(drawImageSpy).to.have.been.called.once.with.exactly(image.element,
            canvas._baseX,
            canvas._baseY,
            Math.floor(image.element.width * canvas._scale),
            Math.floor(image.element.height * canvas._scale));
    });
});