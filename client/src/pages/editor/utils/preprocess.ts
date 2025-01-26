// import p5 from "p5";

function preprocessImage(canvas: any) {
    const ctx = canvas.getContext('2d');
    const image = ctx?.getImageData(0,0,canvas.width, canvas.height);
    // thresholdFilter(image.data, 0.5);
    // p5
    return image;
 }
 
export default preprocessImage
