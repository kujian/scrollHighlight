//插件名字：scrollHighlight（滚动高亮节点插件）
//插件作者：蔡宝坚
//作者博客：http://caibaojian.com
//插件网站：http://caibaojian.com/scrollHighlight
//使用协议：MIT,个人和商业均可免费使用
//使用范例：http://caibajian.com/demo/scrollhighlight
;(function($) {
	$.fn.scrollHighlight = function(options) {
		return this.each(function() {
			var defualts = {
				childItem : "a", //高亮的节点
				attribute :"href", //高亮节点属性
				highlight:'highlight', //给高亮节点添加的类
				buffer : 0, //距离节点的顶部距离
				container: window, //滚动内容的盒子，默认是window
				cancelFlag : true,//当超过节点时是否取消高亮，默认是取消高亮
				mode:'vertical' //滚动的模式，默认为竖直方向，可以为其他如horizontal(水平方向)
			};
			var t1 = new Date().getTime();
			var opts = $.extend({}, defualts, options),
				obj = $(this),
				$container = $(opts.container),
				mode = opts.mode,
				buffer = opts.buffer,
				highlight = opts.highlight,
				childItem = opts.childItem,
				attribute = opts.attribute
				;
			if(obj.lenth<=0) return;
			var resizeTimer; // Set resizeTimer to empty so it resets on page load
			function resizeObj(){
				var item = obj.find(childItem), i= 0, len = item.length, wrap = [], index = [], anchor = [];
				for(; i<len; i++){
					anchor.push(item.eq(i).attr(attribute)); //获取需要高亮的所有节点
				}
				var aLen = anchor.length;
				for(var j=0; j<aLen; j++){
					var that = opts.container == window ? $(document).find(anchor[j]) : $container.find(anchor[j]);
					if(that.length && that.is(":visible")){			
						wrap.push(anchor[j]);//筛选出容器内存在的节点并且是显示的
						index.push(j);		//筛选出他们的位置
					}
				}
				var wLen = wrap.length;
				var pos = [];
				
				$container.bind("scroll",function(e){
					var position = {top: $(this).scrollTop(), left: $(this).scrollLeft()};
					var xy = (mode == 'vertical') ? position.top + buffer : position.left + buffer;
					console.log(xy);
					for(var i=0; i<wLen; i++){
						if(mode == 'vertical'){
							//当默认是垂直滚动时，获取上面节点的位置，并和滚动高度对比，当滚动高度大于它的时候，高亮。
							//当滚动高度超过它的位置加上他的高度时，取消节点的高亮
							pos.push($(wrap[i]).offset().top);
							myPos(i);
							if(opts.cancelFlag && (pos[i] < xy - $(wrap[i]).outerHeight())){
								item.eq(index[i]).removeClass(highlight);
							}
							// highItem(i,top,true);
						}else{
							//当滚动方式为水平时，获取节点的左边位置，并和做拉动的值对比，当拉动的值大于它的位置时，高亮
							//当拉动的值超过它的左边位置加上它的外边框长度时，取消节点高亮
							pos.push($(wrap[i]).offset().left);
							myPos(i);
							if(opts.cancelFlag && (pos[i] < xy - $(wrap[i]).outerWidth()) ){
								item.eq(index[i]).removeClass(highlight);
							}
						}
					}

					//滚动值大于元素位置添加高亮
					function myPos(i){
						if(pos[i]<=xy){
							item.removeClass(highlight).eq(index[i]).addClass(highlight);
						}
					}

				})
			}
			$(window).resize(function() {
		        clearTimeout(resizeTimer);
		        resizeTimer = setTimeout(resizeObj, 1000);
		    });

		    resizeObj();
		    var t = new Date().getTime();
		    console.log(t-t1);
		    // $(window).resize(resizeObj);
			// usage:
			// $(window).smartresize(resizeObj);
		});	
	};
})(jQuery);


