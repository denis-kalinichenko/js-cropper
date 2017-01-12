import Element from "./element";

/**
 * Class representing an Image element
 *
 */

export default class Image extends Element {
    /**
     * Create an element
     *
     */
    constructor() {
        super("img");
    }

    load(src) {
        return new Promise((resolve, reject) => {
            this.element.onload = () => {
                resolve(this);
            };
            this.element.onerror = () => {
                reject(Error("Can't load an image."));
            };
            this.element.src = src;
        });
    }
}