/**
 *
 * @param {*} w The width of the image to generate
 * @param {*} h The height of the image to generate
 * @param {*} differentiate whether to append a random seed to the end of the url so that each image is loaded on a separate request, preventing duplicates
 */
export function generateSampleImageURL(w, h, differentiate = true) {
  return `https://picsum.photos/${w}/${h}${
    differentiate ? "?differentiator=" + Math.random() : ""
  }`;
  
}
