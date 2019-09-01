# ggb-demo

## 本 demo 展示如何将 ggb 文件以离线自托管的方式嵌入到网页中
## 对源码进行了修改主要解决以下两个问题:
1. 由于只有在 webSimple 加载方式下才会隐藏左侧的代数区，而想在非 webSimple 加载方式下隐藏代数区官方没有提供参数，只能通过修改源码来解决，本 demo 进行了相应的修改
2. webSimple 加载方式 ggb 虽然能隐藏代数区，但无法根据窗口大小进行刷新，此时会导致 ggb去的按钮位置错位无法点击等情况。在非 webSimple 加载方式下文件会自动根据 window.resize 进行 transform: scale 缩放展示区。但如果嵌入的原网页已经根据 window.resize 进行了 transform: scale 缩放，就需要将次缩放禁止即防止两次缩放！
### 官当文档: https://wiki.geogebra.org/en/Reference:GeoGebra_Apps_Embedding
### 官方资源: https://download.geogebra.org/package/geogebra-math-apps-bundle
本项目中的 GeoGebra 即为本官方资源同名文件夹
