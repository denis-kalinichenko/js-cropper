import Element from "./element";
import Image from "./image";
import {styles} from "./../configs/default";

/**
 * Class representing a canvas element
 */
export default class Canvas extends Element {
    /**
     * Create a canvas element.
     */
    constructor() {
        super("canvas");
        this._context = this.element.getContext("2d");
        this._image = new Image();

        this._lastPointX = 0;
        this._lastPointY = 0;
        this._baseX = 0;
        this._baseY = 0;
        this._scale = 1;
        this._frameSizePerc = 0.85;
        this._frameSize = 0;
        this._cutoutWidth = 0;
        this._cutoutHeight = 0;
    }

    /**
     * Call render() method from Element class, set styles, draw background pattern
     *
     * @param {Object} parent - The DOM Element object, parent node
     * @return {Canvas} An Canvas object.
     */
    render(parent) {
        super.render(parent);
        this.element.style.borderRadius = "3px";
        this._createBackgroundPattern();
        this._drawBackground();
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
        this._calcFrameSize();
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
        this._calcFrameSize();
        return this;
    }

    /**
     * Calculate Frame dimensions (in pixels), set size of cutout over canvas (top, left)
     *
     * @return {Canvas} A Canvas object.
     */
    _calcFrameSize() {
        this._frameSize = (this.element.width > this.element.height) ? this.element.height * this._frameSizePerc : this.element.width * this._frameSizePerc;
        this._cutoutHeight = (this.element.height - this._frameSize) / 2;
        this._cutoutWidth = (this.element.width - this._frameSize) / 2;
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
        this._lastPointX = 0;
        this._lastPointY = 0;
        this._baseX = 0;
        this._baseY = 0;
        this._image = image;

        let widthScale, heightScale;

        widthScale = (this._frameSize > this._image.element.width) ? 1 : this._frameSize / this._image.element.width;
        heightScale = (this._frameSize > this._image.element.height) ? 1 : this._frameSize / this._image.element.height;

        this._scale = (widthScale > heightScale) ? widthScale : heightScale;
        return this;
    }

    /**
     * Public method which draws an Image at initial position and add event listeners
     *
     * @return {Canvas} A Canvas object.
     */
    draw() {
        let x = this._cutoutWidth,
            y = this._cutoutHeight;

        if (this._image.isLandscape()) {
            y = this._cutoutHeight;
            x = this._cutoutWidth - ((this._imageAbsoluteWidth() - this._frameSize) / 2);
        }
        if (this._image.isPortrait()) {
            x = this._cutoutWidth;
            y = this._cutoutHeight - ((this._imageAbsoluteHeight() - this._frameSize) / 2);
        }

        this._drawImage(x, y);
        this._initEventListeners();
        return this;
    }

    /**
     * Draw an Image on canvas, clear canvas context before, draw a background pattern and frame
     *
     * @param {Number} x - coordinates
     * @param {Number} y - coordinates
     * @return {Canvas} A Canvas object.
     */
    _drawImage(x = 0, y = 0) {
        this.clear();
        this._drawBackground();

        let baseX = this._baseX + (x - this._lastPointX);
        let baseY = this._baseY + (y - this._lastPointY);

        if (this._image.isLandscape()) {
            baseY = (this._cutoutHeight > baseY || this._cutoutHeight + this._frameSize < baseY + this._frameSize) ? this._cutoutHeight : baseY;
        }

        if (this._image.isPortrait()) {
            baseX = (this._cutoutWidth > baseX || this._cutoutWidth + this._frameSize < baseX + this._frameSize) ? this._cutoutWidth : baseX;
        }

        this._baseX = baseX;
        this._baseY = baseY;
        this._lastPointX = x;
        this._lastPointY = y;

        this._context.drawImage(this._image.element,
            this._baseX,
            this._baseY,
            Math.floor(this._image.element.width * this._scale),
            Math.floor(this._image.element.height * this._scale));
        this._drawCutout();
        return this;
    }

    /**
     * Clear canvas context
     *
     * @return {Canvas} A Canvas object.
     */
    clear() {
        this._context.clearRect(0, 0, this.element.width, this.element.height);
        return this;
    }

    /**
     * Draw the cutout over canvas, clockwise rectangle and anti-clock wise rectangle
     *
     * @return {Canvas} A Canvas object.
     */
    _drawCutout() {
        this._context.fillStyle = styles.cutout.fill;
        this._context.beginPath();
        this._context.rect(0, 0, this.element.width, this.element.height);
        this._context.moveTo(this._cutoutWidth, this._cutoutHeight);
        this._context.lineTo(this._cutoutWidth, this.element.height - this._cutoutHeight);
        this._context.lineTo(this.element.width - this._cutoutWidth, this.element.height - this._cutoutHeight);
        this._context.lineTo(this.element.width - this._cutoutWidth, this._cutoutHeight);
        this._context.lineTo(this._cutoutWidth, this._cutoutHeight);
        this._context.closePath();
        this._context.fill();
        return this;
    }

    /**
     * Create a canvas element for background pattern and draw pattern
     *
     * @return {Canvas} A Canvas object.
     */
    _createBackgroundPattern() {
        this._pattern = new Element("canvas");
        this._pattern.element.width = styles.pattern.size;
        this._pattern.element.height = styles.pattern.size;
        const context = this._pattern.element.getContext("2d");
        context.fillStyle = styles.pattern.fill1;
        context.fillRect(0, 0, 8, 8);
        context.fillStyle = styles.pattern.fill2;
        context.fillRect(8, 0, 8, 8);
        context.fillRect(0, 8, 8, 8);
        context.fillStyle = styles.pattern.fill1;
        context.fillRect(8, 8, 8, 8);
        return this;
    }

    /**
     * Draw pattern canvas on the Main canvas as background
     *
     * @return {Canvas} A Canvas object.
     */
    _drawBackground() {
        const pattern = this._context.createPattern(this._pattern.element, "repeat");
        this._context.rect(0, 0, this.element.width, this.element.height);
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
            const location = this._windowToCanvas(event.clientX || event.touches[0].clientX, event.clientY || event.touches[0].clientY);
            this._drawImage(location.x, location.y);
        };

        /**
         * mouseup event listener which destroy mousemove listener and remove cursor style
         *
         */
        const _onMouseUp = () => {
            document.removeEventListener('mousemove', _onMouseMove, false);
            document.removeEventListener('touchmove', _onMouseMove, false);
            document.body.style.cursor = "";
        };

        /**
         * mousedown event listener which initialize mousemove listener, set cursor style, save last points
         *
         * @param {Canvas} event - Event object
         */
        const _onMouseDown = (event) => {
            document.addEventListener('mousemove', _onMouseMove, false);
            document.addEventListener('touchmove', _onMouseMove, false);
            const location = this._windowToCanvas(event.clientX || event.touches[0].clientX, event.clientY || event.touches[0].clientY);
            this._lastPointX = location.x;
            this._lastPointY = location.y;
            document.body.style.cursor = "move";
        };

        this.element.addEventListener("mousedown", _onMouseDown, false);
        this.element.addEventListener("touchstart", _onMouseDown, false);
        document.addEventListener("mouseup", _onMouseUp, false);
        document.addEventListener("touchend", _onMouseUp, false);
        return this;
    }

    /**
     * Translate HTML coordinates to Canvas coordinates.
     *
     * @param {Number} x - coordinates
     * @param {Number} y - coordinates
     * @return {Object} - coordinates
     */
    _windowToCanvas(x, y) {
        const box = this._context.canvas.getBoundingClientRect();
        return {
            x: x - box.left * (this.element.width / box.width),
            y: y - box.top * (this.element.height / box.height)
        };
    }

    /**
     * Calculate scaled image width
     *
     * @return {Number} - Number of pixels
     */
    _imageAbsoluteWidth() {
        return this._image.element.width * this._scale;
    }

    /**
     * Calculate scaled image height
     *
     * @return {Number} - Number of pixels
     */
    _imageAbsoluteHeight() {
        return this._image.element.height * this._scale;
    }

    /**
     * Generates and returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG).
     * The returned image is in a resolution of 96 dpi.
     *
     * @return {String} - A data URI.
     */
    toDataURL() {
        const temp_canvas = new Element("canvas");
        const temp_context = temp_canvas.element.getContext("2d");
        temp_canvas.setWidth(this._frameSize);
        temp_canvas.setHeight(this._frameSize);
        temp_context.drawImage(this.element,
            this._cutoutWidth,
            this._cutoutHeight,
            this._frameSize,
            this._frameSize,
            0, 0,
            this._frameSize,
            this._frameSize);
        return temp_canvas.element.toDataURL();
    }
}