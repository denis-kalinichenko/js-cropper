import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import MoveEventListener from "./move";
import Element from "./../components/element";
import Point from "./../objects/point";

describe("MoveEventListener component",() => {
    let moveEventListener, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {new MoveEventListener()}).to.not.throw();
    });

    it("has init() method, which initializes event listeners", () => {
        const element = new Element();
        const body = new Element(document.body);

        const elementAddEventListenerSpy = spy();
        const bodyAddEventListenerSpy = spy();

        element.getNode().addEventListener = elementAddEventListenerSpy;
        body.getNode().addEventListener = bodyAddEventListenerSpy;

        moveEventListener = new MoveEventListener(element, body);
        moveEventListener.init();
        expect(elementAddEventListenerSpy).to.have.been.called.with("mousedown");
        expect(elementAddEventListenerSpy).to.have.been.called.with("touchstart");
        expect(bodyAddEventListenerSpy).to.have.been.called.with("mouseup");
        expect(bodyAddEventListenerSpy).to.have.been.called.with("touchend");
    });

    it("it fire onMove callback, after move action", () => {
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);

        element.getNode().getBoundingClientRect = () => {
            return {
                bottom: 348,
                height: 340,
                left: 8,
                right: 568,
                top: 8,
                width: 560,
            }
        };

        moveEventListener = new MoveEventListener(element);

        const onMoveCallbackSpy = spy();

        moveEventListener.init();
        moveEventListener.onMove(onMoveCallbackSpy);

        let event = {
            clientX: 50,
            clientY: 51,
        };

        moveEventListener._onMove(event);
        expect(onMoveCallbackSpy).to.have.been.called.with.exactly(new Point(42, 43));

        event = {
            touches: [{ clientX: 69, clientY : 69 }]
        };

        moveEventListener._onMove(event);
        expect(onMoveCallbackSpy).to.have.been.called.with.exactly(new Point(61, 61));
    });

    it("it fire onPress callback, after press action", () => {
        const element = new Element();
        element.setWidth(560);
        element.setHeight(340);

        element.getNode().getBoundingClientRect = () => {
            return {
                bottom: 348,
                height: 340,
                left: 8,
                right: 568,
                top: 8,
                width: 560,
            }
        };

        moveEventListener = new MoveEventListener(element);

        const onPressCallbackSpy = spy();

        moveEventListener.init();
        moveEventListener.onPress(onPressCallbackSpy);

        let event = {
            clientX: 50,
            clientY: 51,
        };

        moveEventListener._onPress(event);
        expect(onPressCallbackSpy).to.have.been.called.with.exactly(new Point(42, 43));

        event = {
            touches: [{ clientX: 69, clientY : 69 }]
        };

        moveEventListener._onPress(event);
        expect(onPressCallbackSpy).to.have.been.called.with.exactly(new Point(61, 61));
    });

    it("has _convertCoordinates method, which translates viewport coordinates to coordinates relative to the element", () => {
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

        const element = new Element();
        const dimensions = {
            width: 560,
            height: 340,
        };

        element.setWidth(dimensions.width);
        element.setHeight(dimensions.height);

        element.getNode().getBoundingClientRect = getBoundingClientRectSpy;

        moveEventListener = new MoveEventListener(element);

        expect(moveEventListener._convertCoordinates(new Point(10, 10))).to.deep.equal(new Point(2, 2));
        expect(moveEventListener._convertCoordinates(new Point(0, 5))).to.deep.equal(new Point(-8, -3));
        expect(getBoundingClientRectSpy).to.have.been.called();
    });
});