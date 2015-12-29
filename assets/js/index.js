/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {
        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();
        
        if($.isFunction($.fn.toc)){
            var $tocTag = $("#toc-tag");
            $tocTag.toc({
                selector: "h1,h2,h3",
                container: ".post-content",
                highlightOnScroll: true
            });
            
            var items = $tocTag.find("li");
            $.map(items, function(el){
                $(el).prepend('<i class="mdi mdi-bookmark-outline mdi-18px"></i>');
                $(el).find('a').addClass("mdl-button mdl-js-button mdl-button--accent");
            });
        }
        
        if($.isFunction($.fn.ghostRelated)){
            $('.related-posts').ghostRelated({
                template: '<li><a href="{url}" class="mdl-button mdl-js-button mdl-button--accent"><i class="mdi mdi-heart-outline"></i>  {title}</a></li>'
            });    
        }
        
        if($.isFunction($.fn.readingTime)){
            $('.post-content').readingTime({
                wordCountTarget: $(this).find('.word-count'),
                prependTimeString: "Reading Time: ",
                prependWordString: "Word Count: "
            });
        }
        
        if($.isFunction($.fn.ghostHunter)){ 
            var $searchField = $("#fixed-header-drawer-exp").ghostHunter({
                results   : "#results",
                onKeyUp   : true,
                zeroResultsInfo : false,
                info_template   : "<p>Number of articles found: {{amount}}</p>",
                result_template : '<div class="search-card mdl-card mdl-shadow--4dp"><div class="mdl-card__title"><h3 class="mdl-card__title-text"><a href="{{link}}">{{title}}</a></h3></div><div class="mdl-card__supporting-text">{{description}}</div><div class="mdl-card__actions mdl-card--border"><a href="{{url}}" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Read Now <i class="mdi mdi-arrow-right mdi-12px"></i></a></div></div>'
            });
            
            $("#clearSearch").on("click", function(){
                $searchField.clear();                
            });
        }
    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
