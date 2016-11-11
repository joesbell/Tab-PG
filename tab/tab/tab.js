
;(function($) {
    var privateFunction = function() {

        // 执行代码
    };
    var namebox={};//空hashmap，用来判断创建的tab是否已经存在
    var arrNav=[];//空数组，用来判断当前页面状态
    var methods = {
        init: function(options) {
            var con;
            var jsTab;
            // 在每个元素上执行方法
            return this.each(function() {
                var $this = $(this);

                // 尝试去获取settings，如果不存在，则返回“undefined”
                var settings = $this.data('JSTab');

                // 如果获取settings失败，则根据options和default创建它
                if(typeof(settings) == 'undefined') {

                    var defaults={
                        index:"",//首页节点，当选项卡删除清空时需要出现的页面(字符串，class/id名称)
                        txt:"",//创建tab的内容
                        box:"",//放页面的容器（jquery选取的dom节点）
                        navBox:"",//放导航的容器（jquery选取的dom节点）
                        name:"",//导航上每个唯一的标记属性(字符串)
                        route:"",//导航上每个页面路由路径属性(字符串，class/id名称)
                        CreatBt:function(){

                        },//点击导航创建tab的回调
                        jsTabCall:function () {//TAB按钮点击回调。
                            console.log(1)
                        }
                    };
                    settings = $.extend({}, defaults, options);

                    // 保存我们新创建的settings
                    $this.data('JSTab', settings);
                } else {
                // 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
					settings = $.extend({}, settings, options);

                    // 如果你想每次都保存options，可以添加下面代码：
                    // $this.data('pluginName', settings);
                }
// 点击导航创建Tab导航选项卡
                //    $(this).on("click",function () {
                $(".content").hide();//让所有tab代表的内容区域消失
                $(".jsTab").css({
                    background:"red"
                });
                var txt=settings.txt;
                var jsCB=settings.CreatBt;
                var jsTC=settings.jsTabCall;
                var name=$(this).attr(settings.name);//导航上每个唯一的标记属性
                var route=$(this).attr(settings.route);//导航上每个页面路由路径属性
                var indexH=settings.index;
                if(namebox[name]){
                    arrNav.splice(arrNav.indexOf(name),1);
                    arrNav.push(name);
                    //console.log(arrNav);
                    jsCB();
                    var tet=arrNav[arrNav.length-1];
                    $("."+tet).show();
                    $(".jsTab"+tet).css({
                        background:"#1B4CA6"
                    });
                }else {
                    if(arrNav.length<=5){
                        arrNav.push(name);
                        //console.log(arrNav);
                        namebox[name] = true;
                        con=$("<div class='content'>").addClass(name).appendTo(settings.box);
                        con.show();
                        con.load(route,function(){
                            jsTC()
                        });
                        jsTab=$("<div class='jsTab'>").addClass("jsTab"+name).css({
                            background:"#1B4CA6"
                        });
                        $("<i class='TabIcon' num="+name+">").addClass("TabIcon"+name).appendTo(jsTab);
                        $("<p>").html(txt).appendTo(jsTab);
                        jsTab.attr("route",route);
                        jsTab.appendTo(settings.navBox);
                        $(".TabIcon"+name).on("click",function (e) {
                            $(this).parent().remove();
                            var num=$(this).attr("num");
                            arrNav.splice(arrNav.indexOf(num),1);
                            namebox[name]=false;
                            con.remove();
                            var tet=arrNav[arrNav.length-1];
                            $("."+tet).show();
                            $(".jsTab"+tet).css({
                                background:"#1B4CA6"
                            });
                            //console.log(arrNav);
                            e.stopPropagation();
                            if(arrNav.length==0){
                                indexH.show();
                            }
                        });
                        jsTab.on("click",function (opts) {
                            arrNav.splice(arrNav.indexOf(name),1);
                            arrNav.push(name);
                            $(".content").hide();
                            con.show();
                            $(".jsTab").css({
                                background:"red"
                            });
                            jsTab.css({
                                background:"#1B4CA6"
                            });
                        });
                    }else {
                        // console.log(arrNav);
                        var tet=arrNav[arrNav.length-1];
                        $("."+tet).show();
                        $(".jsTab"+tet).css({
                            background:"#1B4CA6"
                        });
                        jsCB();
                        //ajaxLoadHide();
                        alert("最多创建6个")
                    }
                }
                // 执行代码

            });
        },
        // destroy: function(options) {
        //     // 在每个元素中执行代码
        //     return $(this).each(function() {
        //         var $this = $(this);
        //
        //         // 执行代码
        //
        //         // 删除元素对应的数据
        //         $this.removeData('pluginName');
        //     });
        // },
        val: function(options) {
            // 这里的代码通过.eq(0)来获取选择器中的第一个元素的，我们或获取它的HTML内容作为我们的返回值
            var someValue = this.eq(0).html();
            // 返回值
            return someValue;
            // console.log(someValue);
        }
    };

    $.fn.JSTab = function() {
        var method = arguments[0];
        if(methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if( typeof(method) == 'object' || !method ) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.pluginName' );
            return this;
        }
        return method.apply(this, arguments);

    }

})(jQuery);