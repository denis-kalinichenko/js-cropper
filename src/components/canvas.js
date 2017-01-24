import Element from "./element";
import Image from "./image";
import Pattern from "./pattern";
import Frame from "./../objects/frame";
import Point from "./../objects/point";
import Cutout from "./cutout";

/**
 * Class representing a canvas element
 */
export default class Canvas extends Element {
    /**
     * Create a canvas element.
     */
    constructor() {
        super("canvas");
        this._context = this.getContext2d();
        this._image = new Image();
        this._pattern = new Pattern();
        this._frame = new Frame();
        this._cutout = new Cutout(this._frame, this);

        this._lastPoint = new Point(0, 0);
        this._basePoint = new Point(0, 0);
    }

    /**
     * Render a canvas
     *
     * @param {Object} parent - The DOM Element object, parent node
     * @return {Canvas} An Canvas object.
     */
    render(parent) {
        super.render(parent);
        this.getNode().style.borderRadius = "3px";
        this._drawBackground();
        this._initEventListeners();
        return this;
    }

    /**
     * Change width of Canvas, recalculate frame dimensions
     *
     * @param {Number} width - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setWidth(width) {
        super.setWidth(width);
        this._frame.update(this.getNode());
        return this;
    }

    /**
     * Change height of Canvas
     *
     * @param {Number} height - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setHeight(height) {
        super.setHeight(height);
        this._frame.update(this.getNode());
        return this;
    }

    /**
     * Pass the Image object into Canvas, reset saved points,
     * calculate scale value (image should fit in the frame)
     *
     * @param {Image} image - An Image object
     * @return {Canvas} A Canvas object.
     */
    setImage(image) {
        this._resetPoints();
        this._image = image;
        this._image.scaleToFit(this._frame);
        return this;
    }

    /**
     * Public method which draws an Image at initial position and add event listeners
     *
     * @return {Canvas} A Canvas object.
     */
    draw() {
        this._drawImage(this._centerImagePoint());
        return this;
    }

    /**
     * Clear canvas context
     *
     * @return {Canvas} A Canvas object.
     */
    clear() {
        this._context.clearRect(0, 0, this.getNode().width, this.getNode().height);
        return this;
    }

    /**
     * Generates and returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG).
     * The returned image is in a resolution of 96 dpi.
     *
     * @return {String} - A data URI.
     */
    toDataURL() {
        const temp_canvas = new Element("canvas");
        temp_canvas.setWidth(this._frame.getRect().size.width);
        temp_canvas.setHeight(this._frame.getRect().size.height);
        temp_canvas.getContext2d().drawImage(
            this.getNode(),
            this._frame.getMinX(),
            this._frame.getMinY(),
            this._frame.getRect().size.width,
            this._frame.getRect().size.height,
            0, 0,
            this._frame.getRect().size.width,
            this._frame.getRect().size.height
        );
        return temp_canvas.getNode().toDataURL();
    }

    /**
     * Set points to zero
     *
     * @return {Canvas} A Canvas object.
     */
    _resetPoints() {
        this._lastPoint = new Point(0, 0);
        this._basePoint = new Point(0, 0);
        return this;
    }

    /**
     * Calculate and get origin Point for centered image (x-axis, y-axis)
     *
     * @return {Point} A Point.
     */
    _centerImagePoint() {
       const x = this._frame.getMidX() - (this._image.getSize().width / 2);
       const y = this._frame.getMidY() - (this._image.getSize().height / 2);
       return new Point(x, y);
    }

    /**
     * Calculate and get origin Point for centered image (x-axis, y-axis)
     *
     * @param {Point} point - Point to validate
     * @return {Point} A Point.
     */
    _validatePoint(point) {
        const validPoint = point;

        if (this._image.getSize().width < this._frame.getRect().size.width) {
            validPoint.x = this._centerImagePoint().x;
        } else if (point.x > this._frame.getMinX()) {
            validPoint.x = this._frame.getMinX();
        } else if (point.x + this._image.getSize().width < this._frame.getMaxX()) {
            validPoint.x = this._frame.getMaxX() - this._image.getSize().width;
        } else {
            validPoint.x = point.x;
        }


        if (this._image.getSize().height < this._frame.getRect().size.height) {
            validPoint.y = this._centerImagePoint().y;
        } else if (point.y > this._frame.getMinY()) {
            validPoint.y = this._frame.getMinY();
        } else if (point.y + this._image.getSize().height < this._frame.getMaxY()) {
            validPoint.y = this._frame.getMaxY() - this._image.getSize().height;
        } else {
            validPoint.y = point.y;
        }

        return validPoint;
    }

    /**
     * Draw an Image on canvas, clear canvas context before, draw a background pattern and frame
     *
     * @param {Point} point - An origin point
     * @return {Canvas} A Canvas object. 
     */
    _drawImage(point = new Point(0, 0)) {
        this.clear();
        this._drawBackground();

        let baseX = this._basePoint.x + (point.x - this._lastPoint.x);
        let baseY = this._basePoint.y + (point.y - this._lastPoint.y);

        this._basePoint = this._validatePoint(new Point(baseX, baseY));
        this._lastPoint = point;

        this._context.drawImage(
            this._image.getNode(),
            this._basePoint.x,
            this._basePoint.y,
            this._image.getSize().width,
            this._image.getSize().height
        );
        this._cutout.draw();
        return this;
    }

    /**
     * Draw pattern canvas on the Main canvas as background
     *
     * @return {Canvas} A Canvas object.
     */
    _drawBackground() {
        const pattern = this._context.createPattern(this._pattern.getNode(), "repeat");
        this._context.rect(0, 0, this.getNode().width, this.getNode().height);
        this._context.fillStyle = pattern;
        this._context.fill();
        return this;
    }

    /**
     * Initialize event listeners
     *
     * @return {Canvas} A Canvas object.
     */
    _initEventListeners() {
        /**
         * Mousemove event listener which draw an image on canvas by moving (dragging)
         *
         * @param {Canvas} event - Event object
         */
        const _onMouseMove = (event) => {
            const x = event.clientX || event.touches[0].clientX;
            const y = event.clientY || event.touches[0].clientY;

            const point = this._windowToCanvas(new Point(x, y));
            this._drawImage(point);
        };

        /**
         * mouseup event listener which destroy mousemove listener and remove cursor style
         *
         */
        const _onMouseUp = () => {
            document.removeEventListener("mousemove", _onMouseMove, false);
            document.removeEventListener("touchmove", _onMouseMove, false);
            document.body.style.cursor = "";
        };

        /**
         * mousedown event listener which initialize mousemove listener, set cursor style, save last points
         *
         * @param {Canvas} event - Event object
         */
        const _onMouseDown = (event) => {
            document.addEventListener("mousemove", _onMouseMove, false);
            document.addEventListener("touchmove", _onMouseMove, false);
            const x = event.clientX || event.touches[0].clientX;
            const y = event.clientY || event.touches[0].clientY;
            this._lastPoint = this._windowToCanvas(new Point(x, y));
            document.body.style.cursor = "move";
        };

        this.getNode().addEventListener("mousedown", _onMouseDown, false);
        this.getNode().addEventListener("touchstart", _onMouseDown, false);
        document.addEventListener("mouseup", _onMouseUp, false);
        document.addEventListener("touchend", _onMouseUp, false);
        return this;
    }

    /**
     * Translate HTML coordinates to Canvas coordinates.
     *
     * @param {Point} point - coordinates
     * @return {Object} - coordinates
     */
    _windowToCanvas(point) {
        const box = this._context.canvas.getBoundingClientRect();
        return new Point(point.x - box.left * (this.getNode().width / box.width), point.y - box.top * (this.getNode().height / box.height));
    }
}