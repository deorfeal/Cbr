var cbrTools = (function () {
    function scrollToElementIfNeed($elt) {
        var y = $elt.offset().top;
        var space = 120;
        y = y - space;
        if (y < 0) y = 0;

        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        if (!(scrollTop <= y && y < scrollTop + windowHeight - 2 * space)) {
            if (scrollTop + windowHeight - 2 * space <= y && y < scrollTop + windowHeight) {
                y = y + 2 * space - windowHeight;
            }
            window.scrollTo(0, y);
        }
    }
    function scrollToElement($elt) {
        var y = $elt.offset().top;
        var eltHeight = $elt.height();
        var windowHeight = $(window).height();
        var scrollToY = eltHeight < windowHeight * 2 / 3 ? y - (windowHeight - eltHeight) / 2 : (y - windowHeight / 3);
        if (scrollToY < 0) scrollToY = 0;

        window.scrollTo(0, scrollToY);
    }

    var $liveRegion = null;
    $(function () {
        $liveRegion = $('<div/>', {
            'role': 'status',
            'aria-live': 'assertive',
            'aria-relevant': 'additions'
        })
        .addClass('ui-helper-hidden-accessible')
        .appendTo($('body'));
    });
    function accessibleMessage(message) {
        if (message) {
            $liveRegion.children().hide();
            $('<div>').text(message).appendTo($liveRegion);
        }
    }

    return {
        scrollToElementIfNeed: scrollToElementIfNeed,
        scrollToElement: scrollToElement,
        accessibleMessage: accessibleMessage
    }
})();

$(function () {
    var $anchorElement;
    function highlightAnchor() {
        try {
            $(window).unbind('hashchange.highlightAnchor');

            var anchor = window.location.hash;
            if (anchor && $anchorElement && $(anchor).get(0) === $anchorElement.get(0)) return;
            if ($anchorElement) {
                if ($anchorElement.is('.referenceable')) {
                    $anchorElement.removeClass('yellow');
                }
                $anchorElement = null;
            }
            if (anchor && /^#[a-z0-9-_]+$/i.test(anchor)) {
                var $elt = $(anchor);
                if ($elt.length !== 0) {
                    $anchorElement = $elt;
                    if ($elt.is('.referenceable')) {
                        $anchorElement.addClass('yellow');
                    }
                    $elt.trigger('open-anchor', [true]);
                    if (anchor !== window.location.hash) {
                        var from = window.location.hash;
                        window.location.hash = anchor;
                    }
                }
            }
        }
        finally {
            $(window).bind('hashchange.highlightAnchor', highlightAnchor);
        }
    }
    setTimeout(highlightAnchor, 0);

    $.fn.replaceText = function (search, replace, text_only) {
        return this.each(function () {
            var node = this.firstChild,
                val,
                new_val,
                remove = [];
            if (node) {
                do {
                    if (node.nodeType === 3) {
                        val = node.nodeValue;
                        new_val = val.replace(search, replace);
                        if (new_val !== val) {
                            if (!text_only && /</.test(new_val)) {
                                $(node).before(new_val);
                                remove.push(node);
                            } else {
                                node.nodeValue = new_val;
                            }
                        }
                    }
                    else if (node.nodeType === 1) {
                        $(node).replaceText(search, replace, text_only);
                    }
                } while (node = node.nextSibling);
            }
            remove.length && $(remove).remove();
        });
    };

    function highlightSearch() {
        try {
            $(window).unbind('hashchange.highlightSearch');

            if (location.hash && location.hash.indexOf('#highlight=') === 0) {
                $('mark').each(function () { $(this).replaceWith($(this).html()); });
                var wordsPattern = decodeURIComponent(location.hash.split('=')[1]);
                if (/^[a-zа-яё0-9_\-]+(\|[a-zа-яё0-9_\-]+)*$/gi.exec(wordsPattern)) {
                    $('#content').replaceText(new RegExp('(^|[^a-zа-яё0-9_\\-])(' + wordsPattern + ')(?=$|[^a-zа-яё0-9_\\-])', 'gi'), '$1<mark>$2</mark>');
                }
                var $marks = $('mark');
                if ($marks.length) {
                    $marks.trigger('open-anchor');
                    //$marks.parents().addBack().each(function () { $(this).triggerHandler('open-anchor'); });
                    setTimeout(function () { cbrTools.scrollToElementIfNeed($marks); }, 200);
                }
            }
        }
        finally {
            $(window).bind('hashchange.highlightSearch', highlightSearch);
        }
    }
    setTimeout(highlightSearch, 0);

});