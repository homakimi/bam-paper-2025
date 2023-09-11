$(function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    var scrollfix = true;
    var scrollfixTimeout;
    var scrollStep = 0;
    effect_fadein();
    $('.bam-book-scroll-wrap').scroll(function() {
        effect_fadein();
        
        if($('.bam-book-detail-sticky').offset().top > 0) {
            // $('.bam-book-detail-cover-left, .bam-book-detail-cover-right').removeClass('scrollShowActive')
            // $('.bam-book-detail-open-title').fadeIn();
            // $('.bam-book-detail-rec-close, .bam-book-detail-rec-open').removeClass('active');
            // $('.bam-book-detail-btn-wrap').stop().fadeOut();
            // $('.swiper-button-prev-full, .swiper-button-next-full').hide();
            // scrollfix = true;
            // scrollStep = 0;
            // $('.flip-card').removeClass('active');
        } else {
            if(scrollStep == 0) {
                $('.bam-book-detail-cover-left, .bam-book-detail-cover-right').addClass('scrollShowActive')
                $('.bam-book-detail-open-title').fadeOut();
                $('.bam-book-detail-rec-close, .bam-book-detail-rec-open').addClass('active');
                $('.swiper-button-prev, .swiper-button-next').delay(500).fadeIn();
                $('.flip-card').addClass('show');
            }
            if(window.innerWidth > 1024) {
                if(scrollStep == 1) {
                    scrollfix = true;
                    $('.flip-card').addClass('active');
                    $('.bam-book-detail-btn-wrap').delay(1000).fadeIn();
                }
            }
            if(scrollfix) {
                $('.bam-book-scroll-wrap').addClass('fix');
                $('.bam-book-scroll-wrap').scrollTop($('.bam-book-scroll-wrap').scrollTop() + $('.bam-book-detail-sticky').offset().top + 1);
            }
            clearTimeout(scrollfixTimeout);
            scrollfixTimeout = setTimeout(function() {
                $('.bam-book-scroll-wrap').removeClass('fix');
                scrollfix = false;
                scrollStep += 1;
            }, 1500)
        }

        if($('.bam-book-scroll-wrap').scrollTop() + window.innerHeight > $('.bam-book-banner').offset().top + $('.bam-book-scroll-wrap').scrollTop() + $('.bam-book-banner').height() && $('.bam-book-scroll-wrap').scrollTop() < $('.bam-book-banner').offset().top + $('.bam-book-scroll-wrap').scrollTop() + $('.bam-book-banner').height() ) {
            yplayers[0].playVideo()
        } else {
            yplayers[0].pauseVideo()
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