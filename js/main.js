
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
        mapCategory = $(this).index();
        $('.bam-village-select-a a').removeClass('active');
        $(this).addClass('active');
        $('.bam-village-map-border').stop().fadeOut();
        $('.bam-village-map-border').eq($(this).index()).stop().fadeIn();
        $('.bam-village-select-drop-wrap article').stop().hide();
        $('.bam-village-select-drop-active').text('請選擇疾病照顧分類').removeClass('disable');
        $('.bam-village-select-logo h3').show();
        $('.bam-village-select-logo article').hide();
    }
})
.on('click', '.bam-village-select-drop-active:not(.disable)', function() {
    $('.bam-village-select-drop-wrap article').eq(mapCategory).stop().slideToggle();
})
// 選擇子項目
.on('click', '.bam-village-select-drop-wrap article a', function() {
    mapSelect = $(this).index();
    $('.bam-village-map-click a').removeClass('active');
    $('[data-category="'+mapCategory+'"][data-select="'+mapSelect+'"]').addClass('active');
    $('.bam-village-select-drop-wrap article').stop().slideUp();
    $('.bam-village-select-drop-active').html($(this).html());
    $('.bam-village-select-logo h3, .bam-village-select-logo [data-logo]').hide();
    $('.bam-village-select-logo [data-logo="'+mapCategory+'-'+mapSelect+'"]').show();
})
// 點地圖
.on('click', '.bam-village-map-click a', function() {
    $('.bam-village-select-a a').eq($(this).data('category')).trigger('click');
    $('.bam-village-select-drop-wrap article').eq($(this).data('category')).trigger('click');
    $('.bam-village-select-drop-wrap article').eq($(this).data('category')).find('a').eq($(this).data('select')).trigger('click');
    $('.bam-village-map-click a').removeClass('active');
    $(this).addClass('active');
})
// 從選擇區點logo
.on('click', '[data-logo] a', function() {
    $('body').addClass('fix');
    $('.bam-village-gray').stop().fadeIn();
    $('.bam-village-lightbox-detail').fadeIn().addClass('active');
    $('[data-detail-lightbox]').hide();
    $('[data-detail-lightbox="'+$(this).find('p').text()+'"]').show();
})
// 從all map點logo
.on('click', '.bam-village-lightbox-map .bam-village-lightbox-map-flex a', function() {
    $('.bam-village-lightbox-map').removeClass('active');
    $('.bam-village-lightbox-detail').fadeIn().addClass('active');
    $('[data-detail-lightbox]').hide();
    $('[data-detail-lightbox="'+$(this).find('p').text()+'"]').show();
    $('.bam-village-back').show();
    $('.bam-village-back-a-map').show();
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
// 服務選擇（門）
.on('click', '.bam-village-service-tab a', function() {
    $('.bam-village-service-tab a').removeClass('active');
    $(this).addClass('active');
    $('.bam-village-service-door-wrap .swiper').hide();
    $('.bam-village-service-door-wrap .swiper').eq($(this).index()).show();
})
// 開門
.on('click', '.bam-village-service-door', function(e) {
    $('.bam-village-service-door-inside').stop().removeClass('active');
    $(this).find('.bam-village-service-door-inside').stop().addClass('active');
    e.preventDefault();
    setTimeout(function() {
        window.open($(this).attr('href'), '_blank');
    }.bind(this), 500)
})
// 手機版服務下拉
.on('click', '.bam-village-service-drop-active', function() {
    $('.bam-village-service-drop-wrap article').stop().slideToggle();
})
// 選擇子項目
.on('click', '.bam-village-service-drop-wrap article a', function() {
    if(!$(this).hasClass('active')) {
        $(this).addClass('active');
        $('.bam-village-service-drop-active').html($(this).html());
        $('.bam-village-service-drop-wrap article a').removeClass('active');
        $(this).addClass('active');
        $('.bam-village-service-door-wrap .swiper').hide();
        $('.bam-village-service-door-wrap .swiper').eq($(this).index()).show();
    }
    $('.bam-village-service-drop-wrap article').stop().slideUp();

})
// 點開全地圖
.on('click', '.bam-village-map-select-full', function() {
    $('body').addClass('fix');
    $('.bam-village-gray').stop().fadeIn();
    $('.bam-village-lightbox-map').fadeIn().addClass('active');
})
.on('click', '.bam-village-close, .bam-village-back-v', function() {
    $('body').removeClass('fix');
    $('.bam-village-gray, .bam-village-lightbox-map, .bam-village-lightbox-detail, .bam-village-lightbox-area, .bam-village-lightbox-category').stop().fadeOut().removeClass('active');
})
// 手機點地圖區域
.on('click', '.bam-village-map-area a', function() {
    $('body').addClass('fix');
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
.on('click', '.bam-village-lightbox-category article a', function() {
    $('.bam-village-lightbox-category').removeClass('active').fadeOut();
    $('.bam-village-lightbox-detail').fadeIn().addClass('active');
    $('[data-detail-lightbox]').hide();
    $('[data-detail-lightbox="'+$(this).find('p').text()+'"]').show();
    $('.bam-village-back-a-map').hide();
})
.on('click', '.bam-village-lightbox-detail .bam-village-back-a', function() {
    $('.bam-village-lightbox-detail').removeClass('active').fadeOut();
    $('.bam-village-lightbox-category').fadeIn().addClass('active');
})


.on('click', '.bam-village-gray', function() {
    $('body').removeClass('fix');
    $('.bam-village-back').fadeOut();
    $('.bam-village-select-drop-wrap article, .bam-village-service-drop-wrap article').stop().slideUp();
    $('.bam-village-gray, .bam-village-lightbox-map, .bam-village-lightbox-detail, .bam-village-lightbox-category').stop().fadeOut().removeClass('active');
})