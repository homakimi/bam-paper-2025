var zoomAlready = false;
var tabAlready = false;
var clickTab = false;
$(function() {
    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })
    $('.swiper .swiper-slide:first-child').addClass('active');
    $('.content-block:not(:first-child)').hide();
    $('.content-content:not(:first-child)').hide();
    setTimeout(function() {
        $('.kv').addClass('active')
    }, 1000)
})

function scrollEffect() {
    if($(window).scrollTop() > $('.intro-flex').offset().top - window.innerHeight*0.75) {
        $('.intro-flex a').each(function(index) {
            setTimeout(function() {
                $(this).addClass('active')
            }.bind(this), index*250)
        });
        if(!zoomAlready) {
            setTimeout(function() {
                zoomAlready = true;
                intro();
            }, 1000)
        }
    }
    if($(window).scrollTop() > $('.tab-wrap').offset().top - window.innerHeight*0.75) {
        $('.tab-wrap a').each(function(index) {
            setTimeout(function() {
                $(this).addClass('show')
            }.bind(this), index*250)
        });
        setTimeout(function() {
            if(!clickTab) {
                if(!tabAlready) {
                    tabAlready = true;
                    $('.tab-wrap a:first-child').addClass('active');
                }
            }
        }, 250);
    }
}

function intro() {
    var _in = 0;
    setInterval(function() {
        if(_in < $('.intro-flex a').length) {
            $('.intro-flex a').removeClass('zoom');
            $('.intro-flex a').eq(_in).addClass('zoom');
            _in++;
        }
        if(_in == $('.intro-flex a').length) {
            _in = 0;
        }
    }, 2000)
}
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
.on('click', '.tab-wrap a', function() {
    if(!$(this).hasClass('active')) {
        $('.tab-wrap a').removeClass('active');
        $(this).addClass('active');
        $('.tab-wrap').removeClass('active-0 active-1 active-2 active-3')
        $('.tab-wrap').addClass('active-'+$(this).index());
        $('.content-block').hide()
        $('.content-block').eq($(this).index()).show();
    }
})
.on('click', '.swiper .swiper-slide', function() {
    if(!$(this).hasClass('active')) {
        $(this).closest('.swiper').find('.swiper-slide').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.content-info').find('.content-content').hide();
        $(this).closest('.content-info').find('.content-content').eq($(this).index()).show();
    }
})
.on('click', '.intro-flex a', function() {
    clickTab = true;
    var _index = $(this).index();
    $('body, html').animate({ scrollTop: $('.content').offset().top - window.innerHeight*0.1 }, 1000)
    $('.tab-wrap a').removeClass('active');
    $('.tab-wrap a').eq(_index).addClass('active');
    $('.tab-wrap').removeClass('active-0 active-1 active-2 active-3')
    $('.tab-wrap').addClass('active-'+_index);
    $('.content-block').hide()
    $('.content-block').eq(_index).show();
})