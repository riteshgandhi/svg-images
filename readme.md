# svg-images

[![npm version](https://img.shields.io/badge/npm-v1.0.0-brightgreen.svg)](https://www.npmjs.com/package/svg-images/v/1.0.0)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/riteshgandhi/svg-images)

Node module to extract images from SVG file

## Installation

Use one of the following methods to add the Star Rating library to your project:

- [Download ZIP](https://github.com/riteshgandhi/svg-images/archive/master.zip)
- `npm install svg-images`

## Dependencies

- https://www.npmjs.com/package/b64-to-image

## Usage

```JavaScript
const svgToImages = require('svg-images/svg-images');

svgToImages.extractImagesAsync('files\\input.svg', 'output\\images')
.then(result => {
    console.log(result);
})
.catch(err => console.error(err));
```

## Changelog

`v1.0.0 - [2019-01-15]`
- Initial release

## License

[MIT](/LICENSE)