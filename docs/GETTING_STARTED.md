# Getting started
## Installation

### Node
**(recommended)**

Run `npm install cropper-js --save`

```javascript
var Cropper = require("cropper-js");
```

#### ECMAScript 6

```javascript
import Cropper from "cropper-js";
```

## Usage
### Add HTML layout

```html
<div id="crop"></div>
```

### Initialize Image Crop
Finally, we need to initialize Cropper in JavaScript code.

```javascript
const cropper = new Cropper();
cropper.render("#crop");
cropper.loadImage("/path/to/image.jpg").then(function (crop) {
    console.info("Image is ready to crop.");
});
```

## What next?

Go to [API Documentation](API.md) to learn more about all Cropper API and how to control it.