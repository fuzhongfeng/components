# ImageLazyLoad

This project is just for [React](https://facebook.github.io/react/)
 `<img />` lazy loading

 ## API
 * 1、调用时必须指定 ratio {height / width}
 * （ height 和 width 建议严格按照图片的 比例 指定, 具体高度可根据图片比例自适应）
 * 2、当需要懒加载时可指定 placeholder 属性，只需传入图片链接即可
 * 3、可通过threshold（number） 设置图片提前加载或延后加载，单位为像素，default（300）
 * 4、throttle 页面监听滚动时间间隔
 * 5、className（string）
 * 6、 组件只适用于 图片 的懒加载，不适用于其他模块和组件
 * eg: `<ImageLazyLoad lazyload src={testImage} ratio={550 / 400} placeholder={place} />`
 

