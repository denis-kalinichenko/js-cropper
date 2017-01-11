import { validateNode, validateConfig } from "./../utils/validators";
import Canvas from "./../components/canvas";

/**
 * Class representing Image Crop
 *
 */

export default class ImageCrop {
    constructor(config = {}) {
        this._config = validateConfig(config);
    }

    /**
     * Create Image Crop <canvas> element at the end of the list of children of a specified parent node
     * @param {object} node - The DOM Element object, parent node
     * @return {Element} An ImageCrop object.
     */
    render(node) {
        this._node = validateNode(node);

        this._canvas = new Canvas();
        this._canvas.setWidth(this._config.width);
        this._canvas.setHeight(this._config.height);

        this._canvas.render(this._node);
        return this;
    }
}