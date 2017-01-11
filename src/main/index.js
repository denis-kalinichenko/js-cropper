import { validateNode } from "./../utils/validators";
import Canvas from "./../components/canvas";

/**
 * Image Crop module
 *
 */

export default class ImageCrop {
    constructor() {

    }

    render(node) {
        this._node = validateNode(node);
        this._canvas = new Canvas();
        this._canvas.render(this._node);
        return this;
    }
}