/**
 * 图片上传压缩优化方法
 * @param {Object} File input 获取到的 File
 * @return {Object} Promise 对象 resolve(File)
 * @author fuzhongfeng
 */
export default function imageCompress(file) {
  return new Promise((resolve, reject) => {
    const typeArr = ["image/png", "image/jpg", "image/jpeg"];
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
            // 分辨率大于 1200*900 进行压缩
            if (imgWith > 1200 || imgHeight > 900) {
              // 创建 canvas
              const canvasEle = document.createElement("canvas");
              canvasEle.style.display = "none";
              // 计算图片的宽高比，按比例缩放图片，宽高标准采用 slide 的宽高 1200 900
              const imgRatio = imgWith / imgHeight;
              let drawImageWidth;
              let drawImageHeight;
              if (imgRatio > 12 / 9) {
                drawImageHeight = imgHeight / (imgWith / 1200);
                drawImageWidth = 1200;
              }
              if (imgRatio < 12 / 9) {
                drawImageWidth = imgWith / (imgHeight / 900);
                drawImageHeight = 900;
              }
              if (imgRatio === 12 / 9) {
                drawImageWidth = 1200;
                drawImageHeight = 900;
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
                    type: "image/png",
                    lastModified: Date.now()
                  });
                  resolve(newFile);
                },
                "image/png",
                1
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
