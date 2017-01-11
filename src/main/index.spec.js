import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import ImageCrop from "./index";

describe("Image Crop component", () => {
    beforeEach(function() {
        this.jsdom = jsdom();
        const wrapper = document.createElement("div");
        wrapper.id = "image-crop";
        document.body.appendChild(wrapper);
    });

    afterEach(function() {
        this.jsdom();
    });
});