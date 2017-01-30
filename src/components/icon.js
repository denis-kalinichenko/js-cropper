import Element from "./element";

export default class Icon extends Element {
    constructor(name) {
        super("svg");
        this.addClass("icon");
        this.addClass(`icon-${name}`);
        this._use = new Element("use");
        this._use.getNode().setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#icon-${name}`);
        this._use.render(this.getNode());
    }
}