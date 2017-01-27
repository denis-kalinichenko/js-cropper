import Element from "./element";

/**
 * Class representing a Slider
 */
export default class Slider extends Element {
    /**
     * Create a slider.
     */
    constructor() {
        super("input");
        this.setType("range");
        this.addClass("slider");
        this.setAttribute("min", 0);
        this.setAttribute("max", 100);
    }
}