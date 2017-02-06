# Getting started
## Installation

### Node
**(recommended)**

Run `npm install g2a-image-crop --save`

```javascript
var ImageCrop = require("g2a-image-crop");
```

#### ECMAScript 6

```javascript
import ImageCrop from "g2a-image-crop";
```

### Bower

Run `bower install g2a-image-crop --save`

```html
<script src="bower_component/g2a-image-crop/dist/g2a-image-crop.min.js"></script>
```

<sub>[Read about NPM G2A Registry](http://confluence.code.g2a.com/x/RwAi) | [Read about Bower G2A Registry](http://confluence.code.g2a.com/x/KgAi)</sub>

## Usage
### Add HTML layout

```html
<div id="crop"></div>
```

### Initialize Image Crop
Finally, we need to initialize Image Crop in JS.

```javascript
var imageCrop = new ImageCrop();
imageCrop.render("#crop");
imageCrop.loadImage("/path/to/image.jpg").then(function (crop) {
    console.info("Image is ready to crop.");
});
```

## What next?

Go to [API Documentation](API.md) to learn more about all Image Crop API and how to control it.