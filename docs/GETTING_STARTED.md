# Getting started
## Installation

### Node
**(recommended)**

Run `npm install js-cropper --save`

```javascript
var Cropper = require("js-cropper");
```

#### ECMAScript 6

```javascript
import Cropper from "js-cropper";
```

## Usage
### Add HTML layout

```html
<div id="crop"></div>
```

### CSS (optional)

```html
<link rel="stylesheet" href="../js-cropper/dist/Cropper.css">
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