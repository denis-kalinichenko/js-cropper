# API

### Initialize Cropper

Initialize image crop with options:

```javascript
new Cropper(parameters)
```

- **parameters** - `Object` - object with Cropper parameters. Optional.

Method returns initialized Image Crop instance.

For example:

```javascript
var cropper = new Cropper({
    width: 560,
    height: 340,
    onInit: function (crop) {},
    onChange: function(crop) {}
});
```

## Parameters
Let's look on list of all available parameters:

| Parameter           | Type     | Default | Description                                                                |
|---------------------|----------|---------|----------------------------------------------------------------------------|
| width               | Number   | 560     | Image Crop width (in px). Parameter allows to force Canvas width.          |
| height              | Number   | 340     | Image Crop height (in px). Parameter allows to force Canvas height.        |
| onInit(cropper)     | Function |         | Callback function, will be executed right after Image Crop initialization  |
| onChange(cropper)   | Function |         | Callback function, will be executed after image position moving or zooming |

## Methods

Let's look on list of all available methods:

| Method                | Description                                                                                   |
|-----------------------|-----------------------------------------------------------------------------------------------|
| render(node)          | Render an Image Crop in provided HTML element. node - String or Object. Required.             |
| loadImage(imageUrl)   | Load image which should be cropped. imageUrl - String. Required.                              |
| setWidth(width)       | Change Image Crop width. Can be called before and after render(). width - Number. Required.   |
| setHeight(height)     | Change Image Crop height. Can be called before and after render(). height - Number. Required. |
| setZoom(zoom)         | Set zoom value. From 0 to 1. zoom - Number. Required.                                         |
| reset()               | Reset position and zoom values.                                                               |
| getCroppedImage()     | Generates and returns a data URI containing a representation of the cropped image.            |
| getData()             | Read info below.                                                                              |
| setData()             | Read info below.                                                                              |

### getData & setData

Method `setData(data)` sets & `getData()` returns a Frame origin and size relative to an Image.

Example:

```javascript

var data = {
    origin: { x: 20, y: 40 }, 
    size: { width: 350, height: 350 }
}
```