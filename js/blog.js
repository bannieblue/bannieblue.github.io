/**
 * Created by bannie on 2017/8/8.
 */
$(function(){
    var defaultActive =$("#blog ul.blog li").find("li").eq(0);
    defaultActive.addClass("active");

    $.get(defaultActive.find("a").attr("name")+".md", function(data) {
        var converter = new showdown.Converter();
        var html = converter.makeHtml(data);
        $('#result').html(html);
    });

    $("#blog ul.blog li").on("click","li",function(){
        $("#blog ul.blog ").find("li").removeClass("active");
        $(this).addClass("active");
        var name = $(this).find("a").attr("name")+".md";
        $.get(name, function(data) {
            var converter = new showdown.Converter();
            var html = converter.makeHtml(data);
            $('#result').html(html);
        });
    });
    $(".navbar ul.nav > li").on("click",function(){
        $("ul.nav > li").removeClass("active");
        $(this).addClass("active");
        if(this.id == "cvNav"){
            $("#blog").hide();
            $("#cv").show();
        }
        if(this.id == "blogNav"){
            $("#cv").hide();
            $("#blog").show();
        }
    });
});

