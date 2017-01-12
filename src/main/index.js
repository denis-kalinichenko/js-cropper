import { validateNode, validateConfig, validateDimension } from "./../utils/validators";
import Canvas from "./../components/canvas";

/**
 * Class representing Image Crop
 *
 */

export default class ImageCrop {
    /**
     * Create an ImageCrop.
     * @param {Object} config - The config for Image Crop
     */
    constructor(config = {}) {
        validateConfig(config);

        this._canvas = new Canvas();

        this.setWidth(config.width || 300);
        this.setHeight(config.height || 300);
    }

    /**
     * Create Image Crop container at the end of the list of children of a specified parent node
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
}