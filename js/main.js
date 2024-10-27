$(function() {
    // for nanshan
    if($('header').length > 0) {
        headerHeight = 55;
    } else {
        headerHeight = 0;
    }

    var kvIndex = 0;
    setTimeout(function() {
        setInterval(function() {
            $('.kv-a-'+kvIndex).removeClass('active');
            kvIndex ++;
            if(kvIndex > 4) kvIndex = 0;
            $('.kv-a-'+kvIndex).addClass('active');
        }, 1000)    
    }, 1500)

    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })

    var introTabSwiper = new Swiper('.intro-tab-swiper .swiper', {
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: false,
        slideToClickedSlide: true,
        speed: 500,
        loop: true,
        allowTouchMove: false,
        breakpoints: {
            1025: {
                centeredSlides: true,
                slidesPerView: 3,
                allowTouchMove: true,
            }
        },
        navigation: {
            nextEl: '.intro-tab-swiper .swiper-button-next',
            prevEl: '.intro-tab-swiper .swiper-button-prev',
        }
    });

    var introSwiper = new Swiper('.intro-swiper .swiper', {
        spaceBetween: 0,
        centeredSlides: true,
        allowTouchMove: false,
        speed: 500,
        loop: true,
        navigation: {
            nextEl: '.intro-swiper .swiper-button-next',
            prevEl: '.intro-swiper .swiper-button-prev',
        }
    });

    $('.intro-tab-swiper, .intro-swiper').addClass('disabled-prev')
    introTabSwiper.on('slideChangeTransitionStart', function() {
        introSwiper.slideToLoop(introTabSwiper.realIndex);
    })
    introSwiper.on('slideChangeTransitionStart', function() {
        introTabSwiper.slideToLoop(introSwiper.realIndex);
        if(introSwiper.realIndex == 4) {
            $('.intro-tab-swiper, .intro-swiper').addClass('disabled-next')
        } else {
            $('.intro-tab-swiper, .intro-swiper').removeClass('disabled-next')
        }
        if(introSwiper.realIndex == 0) {
            $('.intro-tab-swiper, .intro-swiper').addClass('disabled-prev')
        } else {
            $('.intro-tab-swiper, .intro-swiper').removeClass('disabled-prev')
        }
    })

    new Swiper('.invest-swiper .swiper', {
        spaceBetween: 0,
        speed: 500,
        navigation: {
            nextEl: '.invest-swiper .swiper-button-next',
            prevEl: '.invest-swiper .swiper-button-prev',
        }
    });

    $('.ng-swiper').each(function(index) {
        $(this).addClass('ng-swiper-'+index);
        new Swiper('.ng-swiper-'+index+' .swiper', {
            spaceBetween: 0,
            speed: 500,
            navigation: {
                nextEl: '.ng-swiper-'+index+' .swiper-button-next',
                prevEl: '.ng-swiper-'+index+' .swiper-button-prev',
            }
        });
    })

    var tutorialSwiper = new Swiper('.tutorial-swiper .swiper', {
        spaceBetween: 0,
        speed: 500,
        loop: true,
        navigation: {
            nextEl: '.tutorial-swiper .swiper-button-next',
            prevEl: '.tutorial-swiper .swiper-button-prev',
        }
    });

    tutorialSwiper.on('slideChangeTransitionStart', function() {
        $('.tutorial-dot p').removeClass('active');
        setTimeout(function() {
            $('.tutorial-dot p').addClass('active');
        }, 100)
    })

    urlDetect();

    $('.tutorial-href a').hover(function() {
        if(window.innerWidth > 1024) {
            $('.tutorial-img img').eq($(this).index()).addClass('hover');
        }
    }, function() {
        if(window.innerWidth > 1024) {
            $('.tutorial-img img').eq($(this).index()).removeClass('hover');
        }
    })
})


$(document)
.on('click', 'a', function(e) {
    if($(this).attr('href').length == 0) {
        e.preventDefault();
        e.stopPropagation();
    }
})
.on('mousedown', 'img', function(e) {
    e.preventDefault();
})
.on('click', '[data-go]', function() {
    $('body, html').animate({ scrollTop: $('[data-pin="'+$(this).data('go')+'"]').offset().top - headerHeight }, 1000);
})
.on('click', '.kv-vid', function() {
    $('body').addClass('fix');
    $('.lightbox-vid').fadeIn();
    yplayers[0].playVideo();
})
.on('click', '.lightbox-close', function() {
    $('body').removeClass('fix');
    $('.lightbox-vid, .lightbox-card, .lightbox-invest').fadeOut();
    $('[data-card]').removeClass('active');
    yplayers[0].pauseVideo();
})
.on('click', '.ng-top-flex a', function() {
    if(!$(this).hasClass('active')) {
        $('.ng-top-flex a').removeClass('active');
        $(this).addClass('active');
        $('.ng-top-info-flex').hide();
        $('.ng-top-info-flex').eq($(this).index()).fadeIn();
    }
})
.on('click', '[data-card]', function() {
    if(!$(this).hasClass('active')) {
        $('[data-card]').removeClass();
        $(this).addClass('active');
        recordToSheet($(this).text());
        setTimeout(function() {
            $('body').addClass('fix');
            $('.lightbox-card').fadeIn();
            $('[data-card-target]').hide();
            $('[data-card-target="'+$(this).data('card')+'"]').show();
        }.bind(this), 500)
    }
})
.on('click', '[data-invest]', function() {
    $('body').addClass('fix');
    $('.lightbox-invest').fadeIn();
    $('[data-invest-target]').hide();
    $('[data-invest-target="'+$(this).data('invest')+'"]').show();
})


function scrollEffect() {
    $('[data-scroll-show-parent]').each(function() {
        if($(window).scrollTop() > $(this).offset().top - $(window).height()*0.75) {
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
        if($(window).scrollTop() > $(this).offset().top - $(window).height()*0.75) {
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
}


function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        if($('[data-pin="'+_searchParams+'"]').length > 0) {
            setTimeout(function() {
                $('body, html').animate({ scrollTop: $('[data-pin="'+_searchParams+'"]').offset().top - headerHeight }, 1000);
            }, 250)
        }
    }
}

var videoUrlId;
var yplayers = [];
function onYouTubeIframeAPIReady() {
    $('.ytVideo').each(function() {
        videoUrlId = $(this).data('videoid');
        yplayer = new YT.Player( $(this)[0], {
            videoId: videoUrlId,
            host: 'http://www.youtube.com',
            playerVars: {
                playlist: videoUrlId,
                autoplay: 0,
                loop: 1,
                controls: 1,
                showinfo: 0,
                playsinline: 1,
                modestbranding: 1,
                fs: 0,
                rel: 0,
                wmode: 'transparent'
            },
            events: {
            }
        })
        yplayers.push(yplayer);
    })
}
function onPlayerReady(e) {
    e.target.mute(), e.target.seekTo(0), e.target.playVideo();
}
function mainVisualResize() {
    var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        t = document.getElementsByClassName('ytVideo')
    1920 > e || (t.style.width = e + 'px', t.style.height = Math.floor(e / 16 * 9) + 'px')
}
var yplayer, ytag = document.createElement('script');
ytag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
window.onload = firstScriptTag.parentNode.insertBefore(ytag, firstScriptTag);
window.addEventListener('load', mainVisualResize);
window.addEventListener('resize', mainVisualResize);


// google sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbx_IA73l4HBtQhYkq6D5r5wRCx50AvtD_mjguDnPJirH1tcHqhqRl0ge1ytnd1Ckpke5Q/exec';
function recordToSheet(cardData) {
    const params = new URLSearchParams();
    params.append('cardData', cardData);
    var _d = new Date();
    $.ajax({
        url: scriptURL,
        data: {
            "name": _d.getFullYear()+'/'+parseInt(_d.getMonth()+1)+'/'+_d.getDate()+' '+_d.getHours()+':'+_d.getMinutes()+'｜'+cardData,
        },
    });
};
