import {expect, spy} from "chai";
import jsdom from "jsdom-global"
import Canvas from "./canvas";
import Image from "./image";
import Point from "./../objects/point";
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
        }).to.not.throw();
    });

    it("has render method, which set borderRadius, draw background pattern, call render() method from Element class and return this", () => {
        canvas = new Canvas();
        expect(canvas.render).to.be.a("function");

        const drawBackgroundSpy = spy();
        canvas._drawBackground = drawBackgroundSpy;

        let renderedCanvas = canvas.render(wrapper);
        expect(wrapper.querySelectorAll("canvas")).to.have.length(1);
        expect(wrapper.querySelectorAll("canvas")[0].style.borderRadius).to.equal("3px");
        expect(drawBackgroundSpy).to.have.been.called.once();
        expect(renderedCanvas).to.equal(canvas);
    });

    it("has setWidth method, which set width attribute of canvas element and call update() frame", () => {
        canvas = new Canvas();
        const width = 100;

        const updateFrameSpy = spy();
        canvas._frame.update = updateFrameSpy;

        canvas.setWidth(width);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.width).to.equal(width);
        expect(updateFrameSpy).to.have.been.called.once.with.exactly(canvas.getNode());
    });

    it("has setHeight method, which set height attribute of canvas element and call update() frame", () => {
        canvas = new Canvas();
        const height = 150;

        const updateFrameSpy = spy();
        canvas._frame.update = updateFrameSpy;

        canvas.setHeight(height);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.height).to.equal(height);
        expect(updateFrameSpy).to.have.been.called.once.with.exactly(canvas.getNode());
    });

    it("has setImage method, which pass the Image object into Canvas, reset points, call scaleToFit() and returns this", () => {
        canvas = new Canvas();
        canvas.render(wrapper);

        const image = new Image();
        image.setWidth(300);
        image.setHeight(300);
        expect(canvas.setImage).to.be.a("function");

        const resetPointSpy = spy();
        canvas._resetPoints = resetPointSpy;

        const scaleToFitSpy = spy();
        image.scaleToFit = scaleToFitSpy;

        canvas.setImage(image);
        expect(canvas._image).to.equal(image);
        expect(resetPointSpy).to.have.been.called.once();
        expect(scaleToFitSpy).to.have.been.called.once.with.exactly(canvas._frame);
    });

    it("has _resetPoints method, which set to zero points", () => {
        canvas = new Canvas();
        canvas.render(wrapper);

        canvas._lastPoint = new Point(69, 69);
        canvas._basePoint = new Point(69, 69);

        canvas._resetPoints();
        expect(canvas._lastPoint.x).to.equal(0);
        expect(canvas._lastPoint.y).to.equal(0);
        expect(canvas._basePoint.x).to.equal(0);
        expect(canvas._basePoint.y).to.equal(0);
    });

    it("has draw method, which call drawImage and returns this", () => {
        canvas = new Canvas();
        canvas.setWidth(300);
        canvas.setHeight(300);

        const drawImageSpy = spy();
        canvas._drawImage = drawImageSpy;

        canvas.render(wrapper);

        let image = new Image();
        image.getNode().width = 1000;
        image.getNode().height = 500;
        image._checkFormat();
        canvas.setImage(image);
        const drawedCanvas = canvas.draw();

        expect(drawImageSpy).to.have.been.called.once.with.exactly(canvas._centerImagePoint());
        expect(drawedCanvas).to.equal(canvas);
    });

    it("has clear method, which clear canvas 2d context and return this", () => {
        const clearRectSpy = spy();
        HTMLCanvasElement.prototype.getContext = function getContext() {
            return {
                clearRect: clearRectSpy,
                fillRect: () => {}
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
        const drawedCanvas = canvas._drawBackground();
        expect(drawedCanvas).to.equal(canvas);
        expect(createPatternSpy).to.have.been.called.once.with.exactly(canvas._pattern.getNode(), "repeat");
        expect(rectSpy).to.have.been.called.once.with.exactly(0, 0, dimensions.width, dimensions.height);
        expect(fillSpy).to.have.been.called.once();
    });

    describe("_initEventListeners method", () => {
        it("adds event listener for mousedown", () => {
            const addEventListenerSpy = spy();
            canvas = new Canvas();
            canvas.getNode().addEventListener = addEventListenerSpy;
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
        canvas.getNode().dispatchEvent(event);
        expect(windowToCanvasSpy).to.have.been.called.with.exactly(new Point(50, 100));
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
        canvas._node.dispatchEvent(event);

        event = new MouseEvent("mousemove", {
            clientX: 50,
            clientY: 100,
        });
        document.dispatchEvent(event);

        expect(windowToCanvasSpy).to.have.been.called.with.exactly(new Point(50, 100));
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
                fillRect: () => {},
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

        expect(canvas._windowToCanvas(new Point(10, 10))).to.deep.equal(new Point(2, 2));
        expect(canvas._windowToCanvas(new Point(0, 5))).to.deep.equal(new Point(-8, -3));
        expect(getBoundingClientRectSpy).to.have.been.called();
    });

    it("has _drawImage method, which draw an Image and returns this", () => {
        const dimensions = {
            width: 1000,
            height: 1000
        };
        canvas = new Canvas();
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);
        canvas.render(wrapper);

        const image = new Image();
        image.getNode().width = 600;
        image.getNode().height = 300;
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
        canvas._cutout.draw = drawCutoutSpy;

        canvas.setImage(image);
        canvas._drawImage(new Point(10, 10));

        expect(clearSpy).to.have.been.called.once();
        expect(drawBackgroundSpy).to.have.been.called.once();
        expect(drawCutoutSpy).to.have.been.called.once();
        expect(drawImageSpy).to.have.been.called.once.with.exactly(
            image.getNode(),
            canvas._basePoint.x,
            canvas._basePoint.y,
            Math.floor(image.getNode().width * canvas._image._scale),
            Math.floor(image.getNode().height * canvas._image._scale)
        );
    });

    it("has toDataURL method, which return image as DataURL", () => {
        canvas = new Canvas();
        canvas.setHeight(400);
        canvas.setWidth(560);
        canvas.render(wrapper);

        const image = new Image();
        image.getNode().width = 600;
        image.getNode().height = 300;
        image._checkFormat();

        canvas.setImage(image);

        const drawImageSpy = spy();
        const toDataURLSpy = spy();

        HTMLCanvasElement.prototype.toDataURL = toDataURLSpy;
        HTMLCanvasElement.prototype.getContext = function getContext() {
            return {
                drawImage: drawImageSpy
            };
        };

        const dataURL = canvas.toDataURL();

        expect(toDataURLSpy).to.have.been.called.once();
        expect(drawImageSpy).to.have.been.called.once.with.exactly(
            canvas.getNode(),
            canvas._frame.getMinX(),
            canvas._frame.getMinY(),
            canvas._frame.getRect().size.width,
            canvas._frame.getRect().size.height,
            0, 0,
            canvas._frame.getRect().size.width,
            canvas._frame.getRect().size.height
        );
    });

    it("has _centerImagePoint method, which calculate and return origin Point for centered image (x-axis, y-axis)", () => {
        canvas = new Canvas();
        canvas.setHeight(400);
        canvas.setWidth(560);
        canvas.render(wrapper);

        const image = new Image();
        image.getNode().width = 600;
        image.getNode().height = 300;
        image._checkFormat();

        canvas.setImage(image);

        const expectedX = canvas._frame.getMidX() - (canvas._image.getSize().width / 2);
        const expectedY = canvas._frame.getMidY() - (canvas._image.getSize().height / 2);
        expect(canvas._centerImagePoint()).to.deep.equal(new Point(expectedX, expectedY));
    });

    it("has _validatePoint method, which calculate and return origin Point for centered image (x-axis, y-axis)", () => {
        canvas = new Canvas();
        canvas.setHeight(340);
        canvas.setWidth(560);
        canvas.render(wrapper);

        const image = new Image();
        image.getNode().width = 500;
        image.getNode().height = 400;
        image._checkFormat();
        image.scaleToFit(canvas._frame.update(canvas.getNode()));

        canvas.setImage(image);

        let x = canvas._frame.getMinX() - 10;
        let y = canvas._frame.getMinY();
        expect(canvas._validatePoint(new Point(x, y))).to.deep.equal(new Point(x, y));

        x = canvas._frame.getMinX() + 50;
        y = canvas._frame.getMinY();
        expect(canvas._validatePoint(new Point(x, y))).to.deep.equal(new Point(canvas._frame.getMinX(), y));
    });
});