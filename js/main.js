var headerHeight;
var introSwiper;
var randomEasy = parseInt(Math.random()*5);
var randomMedium = parseInt(Math.random()*5);
var randomHard = parseInt(Math.random()*5);
var score = 0;

$(function() {
    // for nanshan
    if($('header').length > 0) {
        headerHeight = 55;
    } else {
        headerHeight = 0;
    }

    resize();
    // detect device change start
    var isMobile, isMobileFirst, widthPC;
    if(window.innerWidth > 1024) {
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
            resize();
        }
        if(widthPC && window.innerWidth <= 1024) {
            resize();
        } else if(!widthPC && window.innerWidth > 1024) {
            resize();
        }
    })

    scrollEffect();
    $(window).scroll(function() {
        scrollEffect();
    })
    urlDetect();

    introSwiper = new Swiper('.intro .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        breakpoints: {
            1025: {
                slidesPerView: 2,
                grid: {
                    rows: 5,
                },
                spaceBetween: 20,
            },
            1441: {
                slidesPerView: 2,
                spaceBetween: 30,
                grid: {
                    rows: 5,
                },
            },
        },
        navigation: {
            nextEl: '.intro .swiper-button-next',
            prevEl: '.intro .swiper-button-prev',
        },
        on: {
            init: function() {
                if(window.innerWidth <= 1024) this.slides.eq(0).addClass('active');
            },
            click: function () {
                this.slideTo(this.clickedIndex)
            }
        }
    });

    if(window.innerWidth <= 1024) $('.intro-block:first-child').show();

    $('.question-block-1 .question-block-effect h3 p').text(qEasy[randomEasy].q);
    $('.question-block-1 .question-block-flex a:first-child').html(qEasy[randomEasy].aa);
    $('.question-block-1 .question-block-flex a:last-child').html(qEasy[randomEasy].ab);
    $('.question-block-2 .question-block-effect h3 p').text(qMedium[randomMedium].q);
    $('.question-block-2 .question-block-flex a:first-child').html(qMedium[randomMedium].aa);
    $('.question-block-2 .question-block-flex a:last-child').html(qMedium[randomMedium].ab);
    $('.question-block-3 .question-block-effect h3 p').text(qHard[randomHard].q);
    $('.question-block-3 .question-block-flex a:first-child').html(qHard[randomHard].aa);
    $('.question-block-3 .question-block-flex a:last-child').html(qHard[randomHard].ab);
})

var infoBadge, introBadge, qEffect, infoEffect, introEffect, introClick, infoClick, linkEffect = false;

function resize() {
    if(window.innerWidth > 1024) {
        if(infoEffect) {
            $('.info-default, .info-hand').hide();
        }
        if(infoEffect && !infoClick) {
            $('.info-default, .info-hand').show();
        }
        if(introEffect) {
            $('.intro-default, .intro-hand').hide();
        }
    } else {
        if(introEffect && !introClick) {
            $('.intro .swiper-slide').eq(0).addClass('active');
            $('.intro-block').eq(0).show();
        }
        if(introEffect && introClick) {
            setTimeout(function() {
                introSwiper.slideTo($('.intro .swiper-slide.active').index());
            }, 500)
        }
    }
}
function scrollEffect() {
    if($(window).scrollTop() + window.innerHeight*0.5 > $('.info').offset().top && $(window).scrollTop() < $('.info').offset().top + $('.info').height() - window.innerHeight*0.5 ) {
        $('.info .badge').addClass('show');
        infoBadge = true;
    } else {
        if(infoBadge) {
            $('.info .badge').removeClass('show');
        }
    }
    if($(window).scrollTop() + window.innerHeight*0.5 > $('.intro').offset().top && $(window).scrollTop() < $('.intro').offset().top + $('.intro').height() - window.innerHeight*0.5) {
        $('.intro .badge').addClass('show');
        introBadge = true;
    } else {
        if(introBadge) {
            $('.intro .badge').removeClass('show');
        }
    }
    
    if($(window).scrollTop() > $('.question').offset().top - window.innerHeight*0.5) {
        if(!qEffect) {
            qEffect = true;
            $('.question-intro [data-show]').each(function(index) {
                setTimeout(function() {
                    $(this).addClass('active')
                }.bind(this), index*500)
            })
            $('.question-btn').addClass('active');
            $('.question-intro h5').addClass('active');
        }
    }
    if($(window).scrollTop() > $('.info').offset().top - window.innerHeight*0.5) {
        if(!infoEffect) {
            infoEffect = true;
            $('.info .bam-exam-h2, .info .bam-exam-h2-deco, .info-hand, .info-block, .info-default').addClass('active');
            if(window.innerWidth > 1024) {
                $('.info-block article a').each(function(index) {
                    setTimeout(function() {
                        $(this).find('p').addClass('effect')
                    }.bind(this), index*250)
                });
            }
        }
    }
    if($(window).scrollTop() > $('.intro').offset().top - window.innerHeight*0.5) {
        if(!introEffect) {
            introEffect = true;
            $('.intro .bam-exam-h2, .intro .bam-exam-h2-deco, .intro-hand, .intro .swiper, .intro-right, .intro h5').addClass('active');
        }
    }
    if($(window).scrollTop() > $('.link').offset().top - window.innerHeight*0.5) {
        if(!linkEffect) {
            linkEffect = true;
            $('.link h2 .bam-exam-h2-deco, .link h2 .bam-exam-h2').addClass('active')
            $('.link-flex > div').each(function(index) {
                setTimeout(function() {
                    $(this).addClass('active')
                }.bind(this), index*500)
            })
        }
    }
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
.on('click', '.info-a', function() {
    if(!$(this).hasClass('active')) {
        infoClick = true;
        $('.info-default, .info-hand').hide();
        $('.info-a').removeClass('active');
        $(this).addClass('active');
        if(window.innerWidth > 1024) {
            $('.info-dropdown').hide();
            $(this).next('.info-dropdown').fadeIn();
        } else {
            $('.info-dropdown').stop().slideUp();
            $(this).next('.info-dropdown').stop().slideDown();
            setTimeout(function() {
                $('body, html').animate({ scrollTop: $(this).offset().top - headerHeight }, 1000);
            }.bind(this), 500)
        }
    } else {
        if(window.innerWidth <= 1024) {
            infoClick = false;
            $(this).removeClass('active');
            $(this).next('.info-dropdown').stop().slideUp();
        }
    }
})
.on('click', '.intro .swiper-slide', function() {
    if(!$(this).hasClass('active')) {
        introClick = true;
        $('.intro-default, .intro-hand').hide();
        $('.intro .swiper-slide').removeClass('active');
        $(this).addClass('active');
        $('.intro-block').hide();
        $('.intro-block').eq($(this).index()).fadeIn();
    }
})
.on('click', '.question-btn', function() {
    $('.bam-exam-q-deco').addClass('active');
    $('.question-intro').hide();
    $('.question-intro').next('.question-block').show();
    $('.question-intro').next('.question-block').find('.question-block-effect').addClass('active');
})
.on('click', '.question-block-flex a', function() {
    if(!$(this).hasClass('active')) {
        $(this).closest('.question-block-flex').find('a').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.question-block').find('.question-block-btn').addClass('active');
    }
})
.on('click', '.question-block-btn.active', function() {
    $(this).closest('.question-block').hide();
    $(this).closest('.question-block').next('.question-block').show();
    $(this).closest('.question-block').next('.question-block').find('.question-block-effect').addClass('active');
    if($(this).closest('.question-block').find('.question-block-flex a.active [data-correct]').data('correct') !== undefined) {
        score = score + parseInt($(this).closest('.question-block').find('.question-block-flex a.active [data-correct]').data('correct'));
    }
    console.log(score);
    
    if($('.question-result').css('display') == 'block') {
        if(score <= 4) {
            $('.question-result-img-1').show();
            setTimeout(function() {
                $('body, html').animate({ scrollTop: $('.info').offset().top - headerHeight }, 1000 )
            }, 4000)
        }
        if(score >= 5 && score <=7) {
            $('.question-result-img-2').show();
            setTimeout(function() {
                $('body, html').animate({ scrollTop: $('.info').offset().top - headerHeight }, 1000 )
            }, 4000)
        }
        if(score >= 8) {
            $('.question-result-img-3').show();
            infoEffect = true;
            $('.info .bam-exam-h2, .info .bam-exam-h2-deco, .info-hand, .info-block, .info-default').addClass('active');
            setTimeout(function() {
                $('body, html').animate({ scrollTop: $('.intro').offset().top - headerHeight }, 2000 )
            }, 4000)
        }
    }
})

function urlDetect() {
    if(window.location.href.indexOf('pin') > 0) {
        var _url = new URL(window.location.href);
        var _searchParams = _url.searchParams.get('pin');
        $('body, html').animate({ scrollTop: $('.'+_searchParams).offset().top - headerHeight }, 1000);
    }
}

var qEasy = [
    {
        'q': '40-64歲者，全身健康檢查應多久做一次？',
        'aa': '<p>有空再做即可</p>',
        'ab': '<p data-correct="2">約2~3年要做一次</p>',
    },
    {
        'q': '腰圍的增加會提高心臟疾病的風險。',
        'aa': '<p data-correct="2">正確</p>',
        'ab': '<p>錯誤</p>',
    },
    {
        'q': '18歲以上的民眾建議每年至少要量一次血壓。',
        'aa': '<p data-correct="2">正確</p>',
        'ab': '<p>錯誤</p>',
    },
    {
        'q': '只有糖尿病患者才需要定期檢測血糖。',
        'aa': '<p>正確</p>',
        'ab': '<p data-correct="2">錯誤</p>',
    },
    {
        'q': '適量的鹽分攝取可以降低高血壓的風險。',
        'aa': '<p data-correct="2">正確</p>',
        'ab': '<p>錯誤</p>',
    },
]
var qMedium = [
    {
        'q': '我有做過勞工體檢了，可以取代健康檢查。',
        'aa': '<p>正確</p>',
        'ab': '<p data-correct="3">錯誤</p>',
    },
    {
        'q': '理想的BMI值範圍應為18.5~24.9。',
        'aa': '<p data-correct="3">正確</p>',
        'ab': '<p>錯誤</p>',
    },
    {
        'q': '理想的血壓值範圍應等於或小於＿＿＿？',
        'aa': '<p data-correct="3">120/80mmHg</p>',
        'ab': '<p>140/100mmHg</p>',
    },
    {
        'q': '飲食中完全避免糖分可以防止糖尿病的發生。',
        'aa': '<p>正確</p>',
        'ab': '<p data-correct="3">錯誤</p>',
    },
    {
        'q': '只有肥胖的人才會患高血糖。',
        'aa': '<p>正確</p>',
        'ab': '<p data-correct="3">錯誤</p>',
    },
]
var qHard = [
    {
        'q': '隔天早上要健檢，我從什麼時候開始要空腹？',
        'aa': '<p data-correct="5">前一天晚上12:00開始</p>',
        'ab': '<p>前一天晚餐就禁食保持空腹</p>',
    },
    {
        'q': '我會計算我的BMI值：',
        'aa': '<p>BMI = 腰圍(公分) / 身高<span class="num-upper">2</span>(公尺)</p>',
        'ab': '<p data-correct="5">BMI = 體重(公斤) / 身高<span class="num-upper">2</span>(公尺)</p>',
    },
    {
        'q': '高血壓病患只要運動和飲食控制，就不用借助藥物治療了。',
        'aa': '<p>正確</p>',
        'ab': '<p data-correct="5">錯誤</p>',
    },
    {
        'q': '我聽過血糖密碼126，是指空腹八小時的血糖值多少則為糖尿病？',
        'aa': '<p>小於或等於126 mg/dl</p>',
        'ab': '<p data-correct="5">大於或等於126 mg/dl</p>',
    },
    {
        'q': '高密度脂蛋白（好的膽固醇）過低也可能增加心血管疾病的風險。',
        'aa': '<p data-correct="5">正確</p>',
        'ab': '<p>錯誤</p>',
    },
]