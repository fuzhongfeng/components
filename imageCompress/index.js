/**
 * 图片上传压 （gif图片无法适用，会输出一张静态图）
 * @param {Object} File input 获取到的 File
 * @param {Number} maxWidth 图片需要压缩的最大宽度
 * @param {Number} maxHeight 图片需要压缩的最大高度
 * @param {String} imageType 压缩后输出的图片类型
 * @param {Number} ratio 压缩图片大小的比例（仅"image/jpeg"和"image/webp"时有用）
 * @return {Object} Promise 对象 resolve(File)
 * @author fuzhongfeng
 */
export default function imageCompress(file, maxWidth = 1200, maxHeight = 900, imageType = "image/jpeg", ratio = 1) {
  return new Promise((resolve, reject) => {
    const typeArr = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    // gif 图不压缩
    const shouldCompress = typeArr.includes(file.type);
    if (shouldCompress) {
      var imgReader = new FileReader();
      imgReader.readAsDataURL(file);
      imgReader.onload = event => {
        // 创建图片便于获取高度
        const img = new Image();
        img.src = imgReader.result;
        img.onload = () => {
          // 获取上传的图片宽高
          const imgWith = img.width;
          const imgHeight = img.height;
          // 分辨率大于 maxWidth*maxHeight 进行压缩
          if (imgWith > maxWidth || imgHeight > maxHeight) {
            // 创建 canvas
            const canvasEle = document.createElement("canvas");
            canvasEle.style.display = "none";
            // 计算图片的宽高比，按比例缩放图片，宽高标准采用 slide 的宽高 maxWidth maxHeight
            const imgRatio = imgWith / imgHeight;
            let drawImageWidth;
            let drawImageHeight;
            if (imgRatio > maxWidth / maxHeight) {
              drawImageHeight = imgHeight / (imgWith / maxWidth);
              drawImageWidth = maxWidth;
            }
            if (imgRatio < maxWidth / maxHeight) {
              drawImageWidth = imgWith / (imgHeight / maxHeight);
              drawImageHeight = maxHeight;
            }
            if (imgRatio === maxWidth / maxHeight) {
              drawImageWidth = maxWidth;
              drawImageHeight = maxHeight;
            }
            // 此处会影响到图片的尺寸，如果指定的 canvas 大小和图片不一样，则会出现截图不完全或多余空白的情况
            canvasEle.width = drawImageWidth;
            canvasEle.height = drawImageHeight;
            const ctx = canvasEle.getContext("2d");
            // 此处也会影响到图片的尺寸，可以控制最终生成的图片分辨率和 size
            // 最后两个参数指定被剪切图像的宽度和高度（此宽高如果和canvas的高度指定不一致的话会出现剪切不全的情况）
            ctx.drawImage(img, 0, 0, drawImageWidth, drawImageHeight);
            document.body.append(canvasEle);
            ctx.canvas.toBlob(
              blob => {
                const newFile = new File([blob], file.name, {
                  type: imageType,
                  lastModified: Date.now()
                });
                resolve(newFile);
              },
              imageType,
              ratio
            );
          } else {
            // 图片类型需要压缩但分辨率未达到要求
            reject();
          }
        };
        imgReader.onerror = error => console.log(error);
      };
    } else {
      // 不需要压缩的图片类型，如 gif
      reject();
    }
  });
}
