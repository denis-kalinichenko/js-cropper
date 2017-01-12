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
        this._config = validateConfig(config);
        this._canvas = new Canvas();
    }

    /**
     * Create Image Crop container at the end of the list of children of a specified parent node
     * @param {Object} node - The DOM Element object, parent node
     * @return {ImageCrop} An ImageCrop object.
     */
    render(node) {
        this._node = validateNode(node);

        this._canvas.setWidth(this._config.width);
        this._canvas.setHeight(this._config.height);
        this._canvas.render(this._node);

        return this;
    }

    /**
     * Change width of ImageCrop container
     * @param {Number} width - The number of pixels.
     * @return {ImageCrop} A ImageCrop object.
     */
    setWidth(width) {
        let value = validateDimension(width);
        this._config.width = value;
        this._canvas.setWidth(value);
        return this;
    }

    /**
     * Change height of ImageCrop container
     * @param {Number} height - The number of pixels.
     * @return {ImageCrop} A ImageCrop object.
     */
    setHeight(height) {
        let value = validateDimension(height);
        this._config.height = value;
        this._canvas.setHeight(value);
        return this;
    }
}