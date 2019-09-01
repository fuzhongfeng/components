# Modal
Modal component for React 
---
title: Modal component
---
	
## API
	
用于React的弹出框组件，引用时可以通过给组件指定class的方式控制弹出框的大小，响应式等
	
### <Modal />
	
	| props | type | default | description |
	|-----|------|-----|-----|
	| onClose | func | - | 关闭 按钮函数处理回调 通过此函数改变父级组件的 state
	| onAnimationEnd | func | null | 处理 动画结束回调函数 |
	| visible | bool | false | 控制模块显示 |
	| showMask | bool | true |  控制蒙板显示  |
	| closeMaskOnClick | bool | true | 是否点击蒙板弹出框消失 |
	| showCloseButton | bool | true | 是否显示关闭按钮 |
	| animation | string | zoom | 动画类型 |
	| duration | number | 300 | 动画时间 |
	| className | string | { height: 23.125rem, width: 40.75rem } | 可在css 中随意指定样式 |
	
	
### Special Tips
#### animation： 类型： zoom、 fade、flip、 door、 rotate、 slideUp、 slideDown、 slideLeft、slideRight
