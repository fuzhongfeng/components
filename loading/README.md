# [loading](https://fuzhongfeng.github.io/loading/loading.html)
master 分支是用 h5 和 css3 写的 loading 三维小动画

基于 react psotcss classnames typescript 的会放到 other 分支

思路：最外层容器总体倾斜四十五度，接着分为阴影模块、盒子模块，盒子模块包含四个小立方体，每个小立方体只需要拼接出三个面即可，动画次数连续播放、只不过刚好头位置和结尾位置相同就达到了连贯的效果，其中注意右下角模块变换过程中的左侧面的 z-index 值、以达到一个立方体交错切换的效果，手机端需要相应缩小的话采用整体 transform 进行缩小处理。

### 最后点击查看下 [demo](https://fuzhongfeng.github.io/loading/loading.html) 吧
