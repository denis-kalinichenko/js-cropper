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

    /**
     * Load an image by URL and set 'src' attribute
     *
     * @param {String} src - The url or path to image
     * @return {Promise} A promise that returns {@link load~resolve} if resolved and {@link load~reject} if rejected.
     */
    load(url) {
        return new Promise((resolve, reject) => {
            this.element.onload = () => {
                resolve(this);
            };
            this.element.onerror = () => {
                reject(Error("Can't load an image."));
            };
            this.element.src = url;
            this.element.crossOrigin = "Anonymous";
        });
    }
}