/**
 * Created by bannie on 2017/8/8.
 */
$(function(){
    $.get('es6.md', function(data) {
        var converter = new showdown.Converter();
        var html = converter.makeHtml(data);
        $('#result').html(html);
    });

    $(".middle-left ul").on("click","li",function(){
        var name = $(this).attr("name")+".md";
        $.get(name, function(data) {
            var converter = new showdown.Converter();
            var html = converter.makeHtml(data);
            $('#result').html(html);
        });
    });
});

