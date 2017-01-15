import { validateNode, validateConfig, validateDimension } from "./../utils/validators";
import { dimensions } from "./../configs/default";
import Canvas from "./../components/canvas";
import Image from "./../components/image";

/**
 * Class representing Image Crop
 *
 */

export default class ImageCrop {
    /**
     * Create an ImageCrop.
     * 
     * @param {Object} config - The config for Image Crop
     */
    constructor(config = {}) {
        validateConfig(config);

        this._canvas = new Canvas();
        this._image = new Image();

        this.setWidth(config.width || dimensions.width);
        this.setHeight(config.height || dimensions.height);
    }

    /**
     * Create Image Crop container at the end of the list of children of a specified parent node
     *
     * @param {Object} node - The DOM Element object, parent node
     * @return {ImageCrop} An ImageCrop object.
     */
    render(node) {
        this._node = validateNode(node);
        this._canvas.render(this._node);
        return this;
    }

    /**
     * Change width of ImageCrop container
     *
     * @param {Number} width - The number of pixels.
     * @return {ImageCrop} An ImageCrop object.
     */
    setWidth(width) {
        try {
            validateDimension(width);
        }
        catch (error) {
            throw Error(`Width property: ${error.message}`);
        }
        this._canvas.setWidth(width);
        return this;
    }

    /**
     * Change height of ImageCrop container
     *
     * @param {Number} height - The number of pixels.
     * @return {ImageCrop} An ImageCrop object.
     */
    setHeight(height) {
        try {
            validateDimension(height)
        }
        catch (error) {
            throw Error(`Height property: ${error.message}`);
        }
        this._canvas.setHeight(height);
        return this;
    }

    /**
     * Load an image and draw canvas
     *
     * @param {String} url - Url or path to image
     * @return {Promise} A promise that returns {@link loadImage~resolve} if resolved and {@link loadImage~reject} if rejected.
     */
    loadImage(url) {
        if (!url) {
            throw Error("Image url or path is not passed.");
        }

        if (typeof url != "string") {
            throw Error("Invalid url or path.");
        }

        return this._image.load(url).then((image) => {
            this._canvas.setImage(image);
            this._canvas.draw();
            return this;
        })
    }
}