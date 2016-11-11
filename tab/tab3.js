/**
 * Created by joesbell on 2016/11/9.
 */
/**
 * Created by joesbell on 2016/11/4.
 */
;(function ($) {
    var namebox={};//空hashmap，用来判断创建的tab是否已经存在
    var arrNav=[];//空数组，用来判断当前页面状态
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
    $.fn.JSTab=function (options) {
        var con;
        var jsTab;
        var test;
        var options = $.extend({}, defaults, options);
        return this.each(function() {
            // 点击导航创建Tab导航选项卡
            //    $(this).on("click",function () {
            $(".content").hide();//让所有tab代表的内容区域消失
            $(".jsTab").css({
                background:"red"
            });
            var txt=options.txt;
            var jsCB=options.CreatBt;
            var jsTC=options.jsTabCall;
            var name=options.name;//导航上每个唯一的标记属性
            var route=options.route;//导航上每个页面路由路径属性
            var indexH=options.index;
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
                    con=$("<div class='content'>").addClass(name).appendTo(options.box);
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
                    jsTab.appendTo(options.navBox);
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
            //})
        });
    };
    // var joesTab=function(opts){
    //     var optsTxt=opts.txt;
    //     var optsRoute=opts.route;
    //     var optcALL=opts.jsTabCall;
    //     console.log(opts.route);
    //     var jsTab=$("<div>").addClass("jsTab").css({
    //         background:"#1B4CA6"
    //     });
    //     // $(".content").hide();
    //
    //     jsTab.html(optsTxt);
    //     jsTab.attr("route",optsRoute);
    //     jsTab.appendTo($(".TabBox"));
    //     jsTab.on("click",function () {
    //         optcALL()
    //     });
    //     return jsTab
    // }
})(jQuery);