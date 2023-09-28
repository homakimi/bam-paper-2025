$(function() {

    // detect device change start
    var isMobile, isMobileFirst, widthPC;
    if(window.innerWidth > 1280) {
        widthPC = true;
    } else {
        widthPC = false;
    }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        isMobileFirst = true;
    } else {
        isMobileFirst = false;
    }
    $(window).resize(function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            isMobile = true;
        } else {
            isMobile = false;
        }
        if(isMobileFirst != isMobile) {
            reset()
        }
        if(widthPC && window.innerWidth <= 1280) {
            reset()
        } else if(!widthPC && window.innerWidth > 1280) {
            reset()
        }
    })
    // detect device change end
    $('.bam-book-guess-question, .bam-book-wrong-wrap, .bam-book-right-wrap, .bam-book-right-lottery, .bam-book-right-none, .bam-village-service-door-block').hide();
    resize();
    $(window).resize(function() {
        resize();
    })
    // detect anchor from url
    var url = window.location.href;
    if( url.indexOf('?scrollto=') > 0 || url.indexOf('&scrollto=') > 0 ) {
        var _getParam = url.substring(url.lastIndexOf('scrollto='));
        var _getIndex = _getParam.substring(_getParam.indexOf('=')+1)
        $('.bam-village-scroll-wrap').animate({ scrollTop: $('[data-pin="'+_getIndex+'"]').offset().top - 50 }, 1000);
    }
    if( url.indexOf('?slideto=') > 0 || url.indexOf('&slideto=') > 0 ) {
        var _getParam = url.substring(url.lastIndexOf('slideto='));
        var _getIndex = parseInt(_getParam.substring(_getParam.indexOf('=')+1))
        console.log(_getIndex-1)
        $('.bam-village-service').addClass('alreadyTrigger');
        $('.bam-village-scroll-wrap').animate({ scrollTop: $('.bam-village-service').offset().top - 50 }, 1000);
        $('.bam-village-service-drop-wrap article a').removeClass('active');
        $('.bam-village-service-drop-wrap article a').eq(_getIndex-1).addClass('active');
        $('.bam-village-service-drop-active').html($('.bam-village-service-drop-wrap article a').eq(_getIndex-1).html());
        $('.bam-village-service-door-block').hide();
        $('.bam-village-service-door-block').eq(_getIndex-1).show();
    }
    $('.bam-village-scroll-wrap').scroll(function() {
        if($('.bam-village-scroll-wrap').scrollTop() > $('.bam-village-service').offset().top + $('.bam-village-scroll-wrap').scrollTop() - $(window).height()*0.75) {
            if(!$('.bam-village-service').hasClass('alreadyTrigger')) {
                $('.bam-village-service').addClass('alreadyTrigger')
                $('.bam-village-service-door-block').eq(0).show()
                $('.bam-village-service-drop-wrap article a').eq(0).addClass('active')
            }
        }
    })    
})
function resize() {
    $('body, .bam-village-scroll-wrap').css('height', window.innerHeight)
}

function reset() {
    $('.bam-village-scroll-wrap').removeClass('fix');
    $('.bam-village-back').fadeOut();
    $('.bam-village-select-drop-wrap article').stop().slideUp();
    $('.bam-village-gray, .bam-village-lightbox-map, .bam-village-lightbox-detail, .bam-village-lightbox-area, .bam-village-lightbox-category').stop().fadeOut().removeClass('active');
    if(window.innerWidth <= 1280)$('.bam-village-service-drop-wrap article').stop().slideUp();
}
var mapCategory, mapSelect, mobileFromMap;
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
// 選擇: 疾病照護 生活支持 健康樂活
.on('click', '.bam-village-select-a a', function() {
    if(!$(this).hasClass('active')) {
        selectBigCategory($(this));
    }
})
.on('click', '.bam-village-select-drop-active:not(.disable)', function() {
    $('.bam-village-select-drop-wrap article').eq(mapCategory).stop().slideToggle();
})
// 選擇下拉子項目
.on('click', '.bam-village-select-drop-wrap article a', function() {
    selectDropdown($(this))
})
// 點地圖
.on('click', '.bam-village-map-click a', function() {
    selectFromMap($(this));
})
// 從選擇區點logo
.on('click', '[data-logo] a', function() {
    if(!$(this).hasClass('bam-village-disable')) {
        $('.bam-village-scroll-wrap').addClass('fix');
        $('.bam-village-gray').stop().fadeIn();
        $('.bam-village-lightbox-detail').fadeIn().addClass('active');
        $('[data-detail-lightbox]').hide();
        $('[data-detail-lightbox="'+$(this).prev('p').text()+'"]').show();
    } else {
        return false;
    }
})
// 從all map點logo
.on('click', '.bam-village-lightbox-map .bam-village-lightbox-map-flex a', function() {
    if(!$(this).hasClass('bam-village-disable')) {
        $('.bam-village-lightbox-map').removeClass('active');
        $('.bam-village-lightbox-detail').fadeIn().addClass('active');
        $('[data-detail-lightbox]').hide();
        $('[data-detail-lightbox="'+$(this).find('p').text()+'"]').show();
        $('.bam-village-back').show();
        $('.bam-village-back-a-map').show();
    } else {
        return false;
    }
})
.on('click', '.bam-village-back', function() {
    $('.bam-village-lightbox-map').addClass('active');
    $('.bam-village-lightbox-detail').removeClass('active').fadeOut();
    $('.bam-village-back').hide();
})
.on('click', '.bam-village-back-a-map', function() {
    $('.bam-village-lightbox-map').addClass('active');
    $('.bam-village-lightbox-detail').removeClass('active').fadeOut();
})
// 選擇服務
.on('click', '.bam-village-service-drop-active', function() {
    if(window.innerWidth <= 1280) {
        $('.bam-village-service-drop-wrap article').stop().slideToggle();
    }
})
// 服務處選擇子項目
.on('click', '.bam-village-service-drop-wrap article a', function() {
    if(!$(this).hasClass('active')) {
        $('.bam-village-service-drop-active').html($(this).html());
        $('.bam-village-service-door-inside, .bam-village-service-drop-wrap article a').stop().removeClass('active');
        $(this).addClass('active');
        $('.bam-village-service-door-wrap .bam-village-service-door-block').hide();
        $('.bam-village-service-door-wrap .bam-village-service-door-block').eq($(this).index()).show();
    }
    if(window.innerWidth <= 1280) {
        $('.bam-village-service-drop-wrap article').slideUp();
    }
})
// 開門
.on('click', '.bam-village-service-door:not(.coming)', function(e) {
    $('.bam-village-service-door-inside').stop().removeClass('active');
    $(this).find('.bam-village-service-door-inside').stop().addClass('active');
    e.preventDefault();
    setTimeout(function() {
        window.open($(this).attr('href'), '_blank');
    }.bind(this), 500)
})
// 點開全地圖
.on('click', '.bam-village-map-select-full', function() {
    $('.bam-village-scroll-wrap').addClass('fix');
    $('.bam-village-gray').stop().fadeIn();
    $('.bam-village-lightbox-map').fadeIn().addClass('active');
})
// 手機點地圖區域
.on('click', '.bam-village-map-area a', function() {
    $('.bam-village-scroll-wrap').addClass('fix');
    $('.bam-village-gray').stop().fadeIn();
    $('.bam-village-lightbox-area').fadeIn().addClass('active');
    $('.bam-village-lightbox-area-flex').hide();
    $('.bam-village-lightbox-area-flex').eq($(this).index()).show();
})
// 手機點地圖區域再點分類
.on('click', '[data-area-click]', function() {
    $('.bam-village-lightbox-area').removeClass('active').fadeOut();
    $('.bam-village-lightbox-category').fadeIn().addClass('active');
    $('[data-area]').hide();
    $('[data-area="'+$(this).data('area-click')+'"]').show();
})
.on('click', '.bam-village-lightbox-category .bam-village-back-a', function() {
    $('.bam-village-lightbox-category').removeClass('active').fadeOut();
    $('.bam-village-lightbox-area').fadeIn().addClass('active');
})
// 手機點地圖區域再點分類再點細項
.on('click', '.bam-village-lightbox-category article a', function() {
    if(!$(this).hasClass('bam-village-disable')) {
        $('.bam-village-lightbox-category').removeClass('active').fadeOut();
        $('.bam-village-lightbox-detail').fadeIn().addClass('active');
        $('[data-detail-lightbox]').hide();
        $('[data-detail-lightbox="'+$(this).prev('p').text()+'"]').show();
        $('.bam-village-back-a-map').hide();
    } else {
        return false;
    }
})
.on('click', '.bam-village-lightbox-detail .bam-village-back-a', function() {
    $('.bam-village-lightbox-detail').removeClass('active').fadeOut();
    $('.bam-village-lightbox-category').fadeIn().addClass('active');
})
.on('click', '.bam-village-gray, .bam-village-close, .bam-village-back-v', function() {
    reset();
})
.on('click', 'body', function() {
    $('.bam-village-select-drop-wrap article').slideUp();
    if(window.innerWidth <= 1280)$('.bam-village-service-drop-wrap article').slideUp();
})
.on('click', '.bam-village-map .bam-village-select-drop-wrap article', function(e) {
    e.stopPropagation();
})


function selectBigCategory(ele) {
    mapCategory = ele.index();
    $('.bam-village-select-a a').removeClass('active');
    ele.addClass('active');
    $('.bam-village-map-border').stop().fadeOut().eq(ele.index()).stop().fadeIn();
    $('.bam-village-select-drop-wrap article').stop().hide();
    $('.bam-village-select-drop-active').text('請選擇分類').removeClass('disable pink blue green');
    if(ele.index() == 0) $('.bam-village-select-drop-active').addClass('pink');
    if(ele.index() == 1) $('.bam-village-select-drop-active').addClass('blue');
    if(ele.index() == 2) $('.bam-village-select-drop-active').addClass('green');
    $('.bam-village-select-logo h3').show();
    $('.bam-village-select-logo article').hide();
}
function selectDropdown(ele) {
    mapSelect = ele.index();
    $('.bam-village-map-click a').removeClass('active');
    $('[data-category="'+mapCategory+'"][data-select="'+mapSelect+'"]').addClass('active');
    $('.bam-village-select-drop-wrap article').stop().slideUp();
    $('.bam-village-select-drop-active').html(ele.html());
    $('.bam-village-select-logo h3, .bam-village-select-logo [data-logo]').hide();
    $('.bam-village-select-logo [data-logo="'+mapCategory+'-'+mapSelect+'"]').show();
}
function selectFromMap(ele) {
    mapCategory = ele.data('category');
    mapSelect = ele.data('select');
    $('.bam-village-select-a a').removeClass('active').eq(mapCategory).addClass('active');
    $('.bam-village-select-drop-wrap article').stop().hide();
    $('.bam-village-select-drop-active').text('請選擇分類').removeClass('disable pink blue green');
    if(mapCategory == 0) $('.bam-village-select-drop-active').addClass('pink');
    if(mapCategory == 1) $('.bam-village-select-drop-active').addClass('blue');
    if(mapCategory == 2) $('.bam-village-select-drop-active').addClass('green');
    $('.bam-village-select-drop-active').html($('.bam-village-select-drop-wrap article').eq(mapCategory).find('a').eq(mapSelect).html());
    $('.bam-village-map-border').stop().fadeOut().eq(mapCategory).stop().fadeIn();
    $('.bam-village-map-click a').removeClass('active');
    ele.addClass('active');
    $('.bam-village-select-logo h3, .bam-village-select-logo [data-logo]').hide();
    $('.bam-village-select-logo [data-logo="'+mapCategory+'-'+mapSelect+'"]').show();
}