# scrollHighlight
jQuery滚动高亮插件
- author blog：https://qdkfweb.cn
- plugin url:  https://qdkfweb.cn/scrollhighlight
- demo url  :  https://qdkfweb.cn/demo/scrollhighlight


## How it work

```html
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/scrollHighlight.js"></script>
<script type="text/javascript">
$(function(){
$(".sidebar").scrollHighlight();
})
</script>
```

### config

| 参数名字	  | 默认值	     | 参数作用
|-------------|--------------|------------------------------------------------------------------|
| childItem	  | "a"	         | 高亮的节点，你可以定义为你喜欢的Dom                              |
| attribute	  | "href"	     | 高亮节点属性,可以定义为你喜欢的属性，如src,或者data-href等       |
| highlight	  | 'highlight'	 | 给高亮节点添加的类，你可以改为你喜欢的类，如'active','current'等 |
| buffer	    | 0	           | 距离节点的距离,可以定义未到节点时高亮的值                        |
| cancelFlag  | true	       | 超过节点的外部高度时取消高亮，你可以不取消高亮                   |
| container	  | window	     | 滚动的容器，你可以随意的定义一个滚动容器，如'#content'等         |
| mode	      | 'vertical'	 | 滚动的模式，默认为竖直方向，可以为其他如horizontal(水平方向)     |


