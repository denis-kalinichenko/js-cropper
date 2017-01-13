import Element from "./element";
import Image from "./image";

/**
 * Class representing a canvas element
 *
 */

export default class Canvas extends Element {
    /**
     * Create a canvas element.
     */
    constructor() {
        super("canvas");
        this._context = this.element.getContext("2d");
        this._image = new Image();
    }

    /**
     * Change width of Canvas
     *
     * @param {Number} width - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setWidth(width) {
        this.element.width = width;
        return this;
    }

    /**
     * Change height of Canvas
     *
     * @param {Number} height - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setHeight(height) {
        this.element.height = height;
        return this;
    }

    /**
     * Pass the Image object into Canvas
     *
     * @param {Image} image - An Image object
     * @return {Canvas} A Canvas object.
     */
    setImage(image) {
        this._image = image;
        return this;
    }

    /**
     * Draw the Image
     *
     * @return {Canvas} A Canvas object.
     */
    draw() {
        this._context.clearRect(0, 0, this.element.width, this.element.height);
        this._context.drawImage(this._image.element, 0, 0);
        return this;
    }
}