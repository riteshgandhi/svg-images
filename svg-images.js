const fs = require('fs'), es = require('event-stream');
const base64Image = require('b64-to-image/b64-to-image')

let extractPath;
let extractedImages = [];

async function extractImagesAsync(sourceFileName, outputPath) {
    extractPath = outputPath;
    return await processFile(sourceFileName, outputPath);
};

const processFile = (sourceFileName) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(sourceFileName)
        .pipe(es.split())
        .pipe(
            es.mapSync((line) => {
                if (line.startsWith('<image')) {
                    parseLine(line);
                }
            })
            .on('end', () => { resolve(JSON.stringify(extractedImages)); })
            .on('error', (err) => { reject(err); } )
        );
    });

}

const parseLine = (line) => {
    let imgData = line.replace('<image ', '')
        .replace(/'/g, '').replace('/>', '').replace(/"/g,'').split(" ");
    let imageName = imgData.filter(data => data.startsWith("id"))[0].split("=")[1];
    let base64Data = imgData.filter(data => data.startsWith("xlink"));
    let base64String;
    if (base64Data.length > 0) {
        base64String = base64Data[0].split('=')[1];
        base64Image.convert(base64String, extractPath, imageName)
            .then(result => {extractedImages.push(result);})
            .catch(err => console.error(err));
    }
}

module.exports = {
    extractImagesAsync
}