Content_PageInfo = (function () {
    function _init($qform) {
        var $likeBtn = $qform.find('[data-helpful-btn=yes]');
        var $dislikeBtn = $qform.find('[data-helpful-btn=no]');

        $likeBtn.click(function () {
            registerFeedback(true);
        });

        $dislikeBtn.click(function () {
            registerFeedback(false);
        });

        function registerFeedback(isLike) {
            $likeBtn.unbind('click');
            $dislikeBtn.unbind('click');

            $.ajax({
                url: $qform.data('feedback-url'),
                cache: false,
                method: 'POST',
                data: { isLike: isLike },
                dataType: 'json'
            });

            var url = '/Content/PageInfo/RegisterFeedback?isLike=' + isLike;
            var options = { title: 'Оценка полезности страницы', referer: window.location.href };
            if (typeof (yaCounter5774506) !== 'undefined') {
                yaCounter5774506.hit(url, options);
            }
            else if (typeof (ym) !== 'undefined') {
                ym(5774506, 'hit', url, options);
            }
        }
    }

    return {
        init: _init
    };
})();

