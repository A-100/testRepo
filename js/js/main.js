/* 
 * Общие настройки
 */
jQuery(function($){
    /*
     * Подгоняем высоту страницы
     */
    function setHeightWin(){
        $("#content").css("min-height", 0);
        var windowHeight = window.innerHeight;
        var header = $("body > header").first().innerHeight();
        var navigation = $("body > nav").first().innerHeight();
        var footer = $("body > footer").innerHeight();
        var content = $("#content").innerHeight();
        var sum = header + navigation + content + footer;
        if(sum < windowHeight){
            $("#content").css("min-height", windowHeight - sum + content - footer + 10);
        }
    }
    $(window).load(function(){
        setHeightWin();
    });
});

function inherit(p) {
    if (p === null) throw TypeError();
    if (Object.create)
        return Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {};
    f.prototype = p;
    return new f();
};
