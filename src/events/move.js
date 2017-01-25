import Element from "./../components/element";
import Point from "./../objects/point";

/**
 * Class representing a MoveEventListener
 */
export default class MoveEventListener {
    /**
     * Create a MoveEventListener.
     *
     * @param {Element} element - A main container.
     * @param {Element} parent - A parent element (window)
     */
    constructor(element, parent = new Element(document.body)) {
        this._element = element;
        this._parent = parent;

        this._onMoveCallback = () => {};
        this._onPressCallback = () => {};

        this._cursorDefault = this._parent.getNode().style.cursor;

        this._onReleaseHandler = this._onRelease.bind(this);
        this._onPressHandler = this._onPress.bind(this);
        this._onMoveHandler = this._onMove.bind(this);
    }

    /**
     * onMove callback function be fired after (touch/mouse) moving (dragging)
     *
     * @param {Function} callback - Callback.
     */
    onMove(callback = () => {}) {
        if (typeof callback === "function") {
            this._onMoveCallback = callback;
        }
    }

    /**
     * onPress callback function be fired after (touch/mouse) press
     *
     * @param {Function} callback - Callback.
     */
    onPress(callback = () => {}) {
        if (typeof callback === "function") {
            this._onPressCallback = callback;
        }
    }

    /**
     * Initialize event listeners
     */
    init() {
        this._element.getNode().addEventListener("mousedown", this._onPressHandler, false);
        this._element.getNode().addEventListener("touchstart", this._onPressHandler, false);
        this._parent.getNode().addEventListener("mouseup", this._onReleaseHandler, false);
        this._parent.getNode().addEventListener("touchend", this._onReleaseHandler, false);
    }

    /**
     * Handler for (touch/mouse) move action.
     *
     * @param {Object} event - Event object.
     */
    _onMove(event) {
        const x = event.clientX || event.touches[0].clientX;
        const y = event.clientY || event.touches[0].clientY;
        this._onMoveCallback(this._convertCoordinates(new Point(x, y)));
    }

    /**
     * Handler for (touch/mouse) press action.
     *
     * @param {Object} event - Event object.
     */
    _onPress(event) {
        this._parent.getNode().addEventListener("mousemove", this._onMoveHandler, false);
        this._parent.getNode().addEventListener("touchmove", this._onMoveHandler, false);
        this._parent.getNode().style.cursor = "move";

        const x = event.clientX || event.touches[0].clientX;
        const y = event.clientY || event.touches[0].clientY;
        this._onPressCallback(this._convertCoordinates(new Point(x, y)));
    }

    /**
     * Handler for (touch/mouse) release action.
     */
    _onRelease() {
        this._parent.getNode().removeEventListener("mousemove", this._onMoveHandler, false);
        this._parent.getNode().removeEventListener("touchmove", this._onMoveHandler, false);
        this._parent.getNode().style.cursor = this._cursorDefault;
    }

    /**
     * Translate viewport coordinates to coordinates relative to the element.
     *
     * @param {Point} point - Viewport coordinates
     * @return {Object} - Coordinates relative to the element.
     */
    _convertCoordinates(point) {
        const box = this._element.getNode().getBoundingClientRect();
        const x = point.x - box.left * (this._element.getNode().width / box.width);
        const y = point.y - box.top * (this._element.getNode().height / box.height);
        return new Point(x, y);
    }
}