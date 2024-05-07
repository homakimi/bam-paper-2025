var zoomAlready = false;
var tabAlready = false;
var clickTab = false;
var fixable = true;

var headerHeight;
$(function() {
    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })

    // for nanshan
    if($('header').length > 0) {
        headerHeight = 55;
        $('.bam-warm-wrap').addClass('adjusted');
    } else {
        headerHeight = 0;
    }
    urlDetect();
})

function scrollEffect() {
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
        // for m tab
        $('.content-toggle-a').removeClass('active');
        $('.content-toggle-dropdown').hide();
        if(window.innerWidth <= 1024) {
            $('body, html').animate({ scrollTop: $('.content-bg').offset().top - headerHeight - $('.tab-wrap').height() }, 1000)
        }
    }
})
.on('click', '.swiper .swiper-slide', function() {
    if(!$(this).hasClass('active')) {
        $(this).closest('.swiper').find('.swiper-slide').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.content-info').find('.content-content').hide();
        $(this).closest('.content-info').find('.content-content').eq($(this).index()).show();
        // for m tab
        $(this).closest('.content-block').find('.content-toggle-a').removeClass('active');
        $(this).closest('.content-block').find('.content-content').eq($(this).index()).find('.content-toggle-a').addClass('active');
        $(this).closest('.content-block').find('.content-toggle-dropdown').hide();
        $(this).closest('.content-block').find('.content-content').eq($(this).index()).find('.content-toggle-dropdown').css('display', 'block');
    }
})
.on('click', '.intro-flex a', function() {
    if(!fixable) {
        clickTab = true;
        var _index = $(this).index();
        $('body, html').animate({ scrollTop: $('.content').offset().top - headerHeight }, 1000)
        $('.tab-wrap a').removeClass('active');
        $('.tab-wrap a').eq(_index).addClass('active');
        $('.tab-wrap').removeClass('active-0 active-1 active-2 active-3')
        $('.tab-wrap').addClass('active-'+_index);
        $('.content-block').hide()
        $('.content-block').eq(_index).show();
    }
})
.on('click', '.content-toggle-a', function() {
    if(window.innerWidth <= 1024) {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).next('.content-toggle-dropdown').stop().slideUp();
        } else {
            $(this).closest('.content-block').find('.content-toggle-a').removeClass('active');
            $(this).toggleClass('active');
            $(this).closest('.content-block').find('.content-toggle-dropdown').stop().slideUp();
            $(this).next('.content-toggle-dropdown').stop().slideToggle();
            // for pc tab
            $(this).closest('.content-block').find('.swiper .swiper-slide').removeClass('active');
            $(this).closest('.content-block').find('.swiper .swiper-slide').eq($(this).closest('.content-content').index()).addClass('active');
            $(this).closest('.content-block').find('.content-content').hide();
            $(this).closest('.content-block').find('.content-content').eq($(this).closest('.content-content').index()).show();

            setTimeout(function() {
                $('body, html').animate({ scrollTop: $(this).next('.content-toggle-dropdown').offset().top - headerHeight - $(this).height() - $('.tab-wrap').height() - 5 }, 1000)
            }.bind(this), 500)
        }
    }
})
.on('click', '.notice-more', function() {
    $('.notice-block').stop().slideToggle();
    $('.notice-wrap, .notice-more').toggleClass('active')
})

function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        var _mainCategory, _subCategory;
        if(_searchParams == 'maternal') {_mainCategory = 0; _subCategory = 0;}
        if(_searchParams == 'longtermcare') {_mainCategory = 1; _subCategory = 0;}
        if(_searchParams == 'disease') {_mainCategory = 2; _subCategory = 0;}
        if(_searchParams == 'mental') {_mainCategory = 3; _subCategory = 0;}
        if(_searchParams == 'amh') {_mainCategory = 0; _subCategory = 0;}
        if(_searchParams == 'earlyintervention') {_mainCategory = 0; _subCategory = 1;}
        if(_searchParams == 'malldj') {_mainCategory = 0; _subCategory = 2;}
        if(_searchParams == 'lost') {_mainCategory = 1; _subCategory = 0;}
        if(_searchParams == 'dental') {_mainCategory = 1; _subCategory = 1;}
        if(_searchParams == 'wacare') {_mainCategory = 1; _subCategory = 2;}
        if(_searchParams == 'caregiver') {_mainCategory = 1; _subCategory = 3;}
        if(_searchParams == 'aid') {_mainCategory = 1; _subCategory = 4;}
        if(_searchParams == 'secondopinion') {_mainCategory = 2; _subCategory = 0;}
        if(_searchParams == 'hope') {_mainCategory = 2; _subCategory = 1;}
        if(_searchParams == 'hearing') {_mainCategory = 2; _subCategory = 2;}
        if(_searchParams == 'physiotherapy') {_mainCategory = 2; _subCategory = 3;}
        if(_searchParams == 'farhugs') {_mainCategory = 3; _subCategory = 0;}

        clickTab = true;
        $('body, html').animate({ scrollTop: $('.content').offset().top - headerHeight }, 1000)
        $('.tab-wrap a').removeClass('active');
        $('.tab-wrap a').eq(_mainCategory).addClass('active');
        $('.tab-wrap').removeClass('active-0 active-1 active-2 active-3')
        $('.tab-wrap').addClass('active-'+_mainCategory);
        $('.content-block').hide()
        $('.content-block').eq(_mainCategory).show();
        // pc
        $('.content-block').eq(_mainCategory).find('.swiper .swiper-slide').removeClass('active');
        $('.content-block').eq(_mainCategory).find('.swiper .swiper-slide').eq(_subCategory).addClass('active');
        $('.content-block').eq(_mainCategory).find('.content-content').hide();
        $('.content-block').eq(_mainCategory).find('.content-content').eq(_subCategory).show();
        // m
        $('.content-block').eq(_mainCategory).find('.content-content').find('.content-toggle-a').removeClass('active');
        $('.content-block').eq(_mainCategory).find('.content-content').eq(_subCategory).find('.content-toggle-a').addClass('active');
        $('.content-block').eq(_mainCategory).find('.content-content').find('.content-toggle-dropdown').stop().slideUp();
        $('.content-block').eq(_mainCategory).find('.content-content').eq(_subCategory).find('.content-toggle-dropdown').stop().slideDown();
    }
}