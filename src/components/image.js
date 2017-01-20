import Element from "./element";
import Size from "./../objects/size";
import Promise from "es6-promise";

/**
 * Class representing an Image element
 */
export default class Image extends Element {
    /**
     * Create an element
     *
     */
    constructor() {
        super("img");
        this._scale = this._originScale = 1;
        this._format = null;
        this._zoom = 0;
    }

    /**
     * Load an image by URL and set 'src' attribute.
     *
     * @param {String} url - The url or path to image
     * @return {Promise} A promise that returns {@link load~resolve} if resolved and {@link load~reject} if rejected.
     */
    load(url) {
        return new Promise((resolve, reject) => {
            this.element.onload = () => {
                this._checkFormat();
                resolve(this);
            };
            this.element.onerror = () => {
                reject(Error("Can't load an image."));
            };
            this.element.src = url;
            this.element.crossOrigin = "Anonymous";
        });
    }

    /**
     * Method, which check image format is portrait.
     *
     * @return {Boolean} Returns true if portrait.
     */
    isPortrait() {
        return this._format === "portrait";
    }

    /**
     * Method, which check image format is landscape.
     *
     * @return {Boolean} Returns true if landscape.
     */
    isLandscape() {
        return this._format === "landscape";
    }

    /**
     * Method, which check image format is square.
     *
     * @return {Boolean} Returns true if square.
     */
    isSquare() {
        return this._format === "square";
    }

    /**
     * Scale image to fit Frame.
     *
     * @return {Image} - Returns Image object
     */
    scaleToFit(frame) {
        const widthScale = frame.getRect().size.w / this.element.width;
        const heightScale = frame.getRect().size.h / this.element.height;
        this._scale = this._originScale = (widthScale > heightScale) ? widthScale : heightScale;
        return this;
    }

    /**
     * Get actual size of image
     *
     * @return {Size} - Returns Size object, which contain weight and height
     */
    getSize() {
        const w = this.element.width * this._scale;
        const h = this.element.height * this._scale;
        return new Size(w, h);
    }

    /**
     * Zoom an image
     *
     * @param {Number} zoom - Zoom value, from 0 to 1.0
     * @return {Image} - An Image object.
     */
    setZoom(zoom) {
        this._zoom = zoom;
        this._scale = this._originScale + (this._originScale * zoom);
        return this;
    }

    /**
     * Get actual zoom value
     *
     * @return {Number} - Zoom value.
     */
    getZoom() {
        return this._zoom;
    }

    /**
     * Method, which check an image format (landscape or portrait) and save it.
     *
     * @return {String} Format.
     */
    _checkFormat() {
        if (this.element.width > this.element.height) {
            this._format = "landscape";
        }
        else if (this.element.width < this.element.height) {
            this._format = "portrait";
        }
        else {
            this._format = "square";
        }
        return this._format;
    }
}