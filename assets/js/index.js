/* globals jQuery, document */
(function ($) {
  'use strict'

  $(function () {
    var $postContent = $('.post-content')
    $postContent.fitVids()

    $('.scroll-down').arctic_scroll()

    if ($.isFunction($.fn.toc)) {
      var $tocTag = $('#toc-tag')
      $tocTag.toc({
        selector: 'h1,h2,h3',
        container: '.post-content',
        highlightOnScroll: true
      })

      var items = $tocTag.find('li')
      $.map(items, function (el) {
        var $link = $(el).children('a'),
          text = $link.text()

        $link.prepend('<i class="mdi mdi-bookmark-outline mdi-18px"></i>')
                    .attr('title', text)
      })
    }

    if ($.isFunction($.fn.ghostRelated)) {
      $('.related-posts').ghostRelated({
        template: '<li><a href="{url}" title="{title}"><i class="mdi mdi-heart-outline"></i> {title}</a></li>'
      })
    }

    if ($.isFunction($.fn.readingTime)) {
      $('.post-content').readingTime({
        wordCountTarget: $(this).find('.word-count'),
        prependTimeString: 'Reading Time: ',
        prependWordString: 'Word Count: '
      })
    }

    $('#search').on('keyup', function () {
      var inputValue = $(this).val()

      if (inputValue !== '' && inputValue.length > 3) {
        searchIndex(inputValue)
      } else {
        $('#results').html('')
      }
    })

    function searchIndex (value) {
      var callUrl = 'https://devlaundryblog.search.windows.net/indexes/posts/docs?api-version=2015-02-28&$top=6&$select=title,url,pubDate&search=' + value

      $.ajax({
        url: callUrl,
        type: 'GET',
        contentType: 'application/json',
        headers: {
          'api-key': '7722DB38252219B087B409424B60F7A8',
          'Content-Type': 'application/json'
        }
      }).done(function (data) {
        var frag = '<strong>Search results:</strong>'
        data.value.map(function (item) {
          frag += '<div class="search-card"><a href="' + item.url + '" target="_blank">' + item.title + '</a></div>'
        })

        $('#results').html(frag)
      })
    }
  })

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
  $.fn.arctic_scroll = function (options) {
    var defaults = {
        elem: $(this),
        speed: 500
      },

      allOptions = $.extend(defaults, options)

    allOptions.elem.click(function (event) {
      event.preventDefault()
      var $this = $(this),
        $htmlBody = $('html, body'),
        offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
        position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
        toMove

      if (offset) {
        toMove = parseInt(offset)
        $htmlBody.stop(true, false).animate({ scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed)
      } else if (position) {
        toMove = parseInt(position)
        $htmlBody.stop(true, false).animate({ scrollTop: toMove }, allOptions.speed)
      } else {
        $htmlBody.stop(true, false).animate({ scrollTop: ($(this.hash).offset().top) }, allOptions.speed)
      }
    })
  }
})(jQuery)
