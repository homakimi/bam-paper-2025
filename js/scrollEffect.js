$(function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    var scrollfix = true;
    var scrollfixTimeout;
    effect_fadein();
    $('.bam-book-scroll-wrap').scroll(function() {
        effect_fadein();
        if($('.bam-book-detail-sticky').offset().top > 0) {
            $('.bam-book-detail-cover-left, .bam-book-detail-cover-right').removeClass('scrollShowActive')
            $('.bam-book-detail-open-title').fadeIn();
            $('.bam-book-detail-rec-1, .bam-book-detail-rec-2, .bam-book-detail-rec-3').removeClass('active');
            $('.swiper-button-prev-full, .swiper-button-next-full').hide();
            scrollfix = true;
        } else {
            $('.bam-book-detail-cover-left, .bam-book-detail-cover-right').addClass('scrollShowActive')
            $('.bam-book-detail-open-title').fadeOut();
            $('.bam-book-detail-rec-1, .bam-book-detail-rec-2, .bam-book-detail-rec-3').addClass('active');
            $('.swiper-button-prev-full, .swiper-button-next-full').show();
            if(scrollfix) {
                $('.bam-book-scroll-wrap').addClass('fix');
                $('.bam-book-scroll-wrap').scrollTop($('.bam-book-scroll-wrap').scrollTop() + $('.bam-book-detail-sticky').offset().top + 1);
            }
            clearTimeout(scrollfixTimeout);
            scrollfixTimeout = setTimeout(function() {
                $('.bam-book-scroll-wrap').removeClass('fix');
                scrollfix = false;
            }, 1500)
        }
    })
    
    function effect_fadein() {
        // scroll show effect starts
        $('[data-scroll-show-parent]').each(function() {
            if($('.bam-book-scroll-wrap').scrollTop() > $(this).offset().top + $('.bam-book-scroll-wrap').scrollTop() - $(window).height()*0.5) {
                if($(this).data('scroll-show-parent').length != '') {
                    $(this).find('[data-scroll-show]').each(function(index) {
                        setTimeout(function() {
                            $(this).addClass('scrollShowActive');
                        }.bind(this), index*$(this).closest('[data-scroll-show-parent]').data('scroll-show-parent'))
                    })
                } else {
                    $(this).find('[data-scroll-show]').each(function() {
                        if($(this).data('scroll-show').length === 0) {
                            $(this).addClass('scrollShowActive');
                        } else {
                            setTimeout(function() {
                                $(this).addClass('scrollShowActive');
                            }.bind(this), $(this).data('scroll-show'))
                        }
                    })
                }
            }
        })
        $('[data-scroll-show]').each(function() {
            if($('.bam-book-scroll-wrap').scrollTop() > $(this).offset().top + $('.bam-book-scroll-wrap').scrollTop() - $(window).height()*0.5) {
                if($(this).closest('[data-scroll-show-parent]').length == 0) {
                    if($(this).data('scroll-show').length === 0) {
                        $(this).addClass('scrollShowActive');
                    } else {
                        setTimeout(function() {
                            $(this).addClass('scrollShowActive');
                        }.bind(this), $(this).data('scroll-show'))
                    }
                }
            }
        })
        // scroll show effect ends
    }
})