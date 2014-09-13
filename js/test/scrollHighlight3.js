//插件名字：scrollHighlight（滚动高亮节点插件）
//插件作者：蔡宝坚
//作者博客：http://caibaojian.com
//插件网站：http://caibaojian.com/scrollHighlight
//使用协议：MIT,个人和商业均可免费使用
//使用范例：http://caibajian.com/demo/scrollhighlight
;(function($) {
	$.fn.scrollSpy = function(options) {
		return this.each(function() {
			var defualts = {
				attribute :"href", //高亮的链接
				buffer : 10, //距离节点的顶部距离
				childItem : "a", //高亮的节点
				highlight:'highlight',
				container: window
			};
			var opts = $.extend({}, defualts, options),
				obj = $(this),
				$container = $(opts.container),
				buffer = opts.buffer,
				highlight = opts.highlight,
				childItem = opts.childItem,
				attribute = opts.attribute
				;
			function resizeObj(){
				var t1 = (new Date()).getTime();
				var item = obj.find(childItem), i= 0, len = item.length, wrap = [], index = [], anchor = [];
				for(; i<len; i++){
					anchor.push(item.eq(i).attr(attribute)); //获取需要高亮的所有节点
				}
				for(var j=0; j<anchor.length; j++){
					var that = opts.container == window ? $(document).find(anchor[j]) : $container.find(anchor[j]);
					if(that.length && that.is(":visible")){			
						wrap.push(anchor[j]);//筛选出容器内存在的节点并且是显示的
						index.push(j);		//筛选出他们的位置
					}
				}
				var wLen = wrap.length;
				var pos = [];
				$container.on("scroll",function(e){
					var position = {top: $(this).scrollTop(), left: $(this).scrollLeft()};
					var xy = position.top + buffer;
					for(var i=0; i<wLen; i++){
						//当默认是垂直滚动时，获取上面节点的位置，并和滚动高度对比，当滚动高度大于它的时候，高亮。
						//当滚动高度超过它的位置加上他的高度时，取消节点的高亮
						pos.push($(wrap[i]).offset().top);
						if(pos[i]<=xy){
							item.removeClass(highlight).eq(index[i]).addClass(highlight);
						}
						if(pos[i] < xy - $(wrap[i]).outerHeight() ){
							item.eq(index[i]).removeClass(highlight);
						}
					}
				})
			}
			resizeObj();
			$(window).on('resize',resizeObj);

			
		});	
	};
})(jQuery);