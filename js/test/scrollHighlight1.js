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
				distance : "10", //距离节点的顶部距离
				childItem : "a", //高亮的节点
				highlight:'highlight'
			};
			var opts = $.extend({}, defualts, options),
				obj = $(this)
				;
			function resizeObj(){
				var t1 = (new Date()).getTime();
				var item = obj.find(opts.childItem), i= 0, len = item.length, wrap = [], index = [];
					for(; i<len; i++){
						var anchor = item.eq(i).attr(opts.attribute);
						if($(anchor).length && $(anchor).is(":visible")){						
							wrap.push(anchor);
							index.push(i);			
						}
						
					}
				var wLen = wrap.length;
				var pos = [];
				$(window).on("scroll",function(){
					var winScrollTop = $(window).scrollTop();
					for(var i=0; i<wLen; i++){
						pos.push($(wrap[i]).offset().top);
						if(pos[i]<=winScrollTop + parseFloat(opts.distance)){
							item.removeClass(opts.highlight).eq(index[i]).addClass(opts.highlight);
						}
						if(pos[i] < winScrollTop + parseFloat(opts.distance) - $(wrap[i]).outerHeight() ){
							item.eq(index[i]).removeClass(opts.highlight);
						}
					}		
				})
				var t2 = (new Date()).getTime();
				console.log(t2 - t1);
				
			}
			resizeObj();
			$(window).on('resize',resizeObj);

			
		});	
	};
})(jQuery);