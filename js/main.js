// guess start
$(function() {
    $('.bam-book-guess-question, .bam-book-wrong-wrap, .bam-book-right-wrap, .bam-book-right-lottery, .bam-book-right-none').hide();
    resize();
    $(window).resize(function() {
        if(window.innerWidth > 1024) {
            resize();
        }
    })
    // $('.bam-book-scroll-wrap').scroll(function() {
    //     if($('.bam-book-right-lottery').hasClass('active')) {
    //         if($('.bam-book-scroll-wrap').scrollTop() > $('.bam-book-guess').offset().top + $('.bam-book-scroll-wrap').scrollTop() + window.innerHeight*0.25) {
    //             if(!$('.fake-bam-book-q-gift').hasClass('active')) {
    //                 $('.fake-bam-book-q-gift').css('display', 'block').css('left', $('.bam-book-q-gift').offset().left ).css('top', $('.bam-book-q-gift').offset().top)
    //                 setTimeout(function() {
    //                     $('.fake-bam-book-q-gift').addClass('active');
    //                     $('.bam-book-badge-close').stop().delay(750).fadeIn();
    //                 }, 100)
    //             }
    //         }
    //     }
    // })
})
function resize() {
    $('.bam-book-scroll-wrap').css('height', window.innerHeight)
}
var qArray = [
    {
        'question': '根據調查結果，<br class="for-m">受訪者最擔心罹患的疾病為？',
        'option': ['癌症','失智','糖尿病'],
        'correct': ['wrong', 'right', 'wrong'],
        'br': '',
        'questionresult': '根據調查結果，受訪者<br class="for-m">最擔心罹患的疾病為？'
    },
    {
        'question': '根據調查結果，受訪者中的年輕<br>族群(18~30歲)覺得自己身體比實際年齡？',
        'option': ['年長0.7歲','年輕4.3歲','年長2.5歲'],
        'correct': ['wrong', 'wrong', 'right'],
        'br': '',
        'questionresult': '根據調查結果，受訪者中的年輕<br>族群(18~30歲)覺得自己身體<br class="for-m">比實際年齡？'
    },
    {
        'question': '根據調查結果，<br>受訪者中覺得長照需多少準備金？',
        'option': ['990萬','716萬','510萬'],
        'correct': ['wrong', 'right', 'wrong'],
        'br': '',
        'questionresult': '根據調查結果，受訪者中<br class="for-m">覺得長照需多少準備金？'
    },
    {
        'question': '根據調查結果，受訪者中的年輕族群<br>(18~30歲)多少比例有超過6年照護經驗？',
        'option': ['10%','30%','60%'],
        'correct': ['right', 'wrong', 'wrong'],
        'br': '',
        'questionresult': '根據調查結果，受訪者中的<br>年輕族群(18~30歲)多少比例<br class="for-m">有超過6年照護經驗？'
    },
    {
        'question': '根據調查結果，<br class="for-m">受訪者偏好的青銀共好活動為？',
        'option': ['旅遊活動<span class="for-m">　　　　</span>','知識才藝學習課程','參與公益活動<span class="for-m">　　</span>'],
        'correct': ['right', 'wrong', 'wrong'],
        'br': '<br class="for-m">',
        'questionresult': '根據調查結果，受訪者<br class="for-m">偏好的青銀共好活動為？'
    },
    {
        'question': '根據調查結果，受訪者覺得老年的時候<br>需要的服務的前三名組合是什麼？',
        'option': ['樂活運動/生活照護/飲食營養','健康護理/對抗失智/居家環境','飲食營養/對抗失智/心理支持'],
        'correct': ['right', 'wrong', 'wrong'],
        'br': '<br>',
        'questionresult': '根據調查結果，受訪者覺得<br class="for-m">老年的時候需要的服務的<br class="for-m">前三名組合是什麼？'
    }
]
var selectedNumbers = [];
function randomQuestion() {
    selectedNumbers = [];
    $('.bam-book-guess-q').remove();
    while (selectedNumbers.length < 3) {
        var randomNumber = Math.floor(Math.random() * 6);
        if (!selectedNumbers.includes(randomNumber)) {
            selectedNumbers.push(randomNumber);
        }
    }
    for(var i=0; i<selectedNumbers.length; i++) {
        $('.bam-book-guess-question-random').append(`
            <div class="bam-book-guess-q">
                <h6>`+qArray[selectedNumbers[i]].question+`</h6>
                <div>
                    <input type="radio" id="ans-`+i+`-1" name="ans-`+i+`" value="`+qArray[selectedNumbers[i]].correct[0]+`">
                    <label for="ans-`+i+`-1"><p></p>`+qArray[selectedNumbers[i]].option[0]+`</label>`+qArray[selectedNumbers[i]].br+`
                    <input type="radio" id="ans-`+i+`-2" name="ans-`+i+`" value="`+qArray[selectedNumbers[i]].correct[1]+`">
                    <label for="ans-`+i+`-2"><p></p>`+qArray[selectedNumbers[i]].option[1]+`</label>`+qArray[selectedNumbers[i]].br+`
                    <input type="radio" id="ans-`+i+`-3" name="ans-`+i+`" value="`+qArray[selectedNumbers[i]].correct[2]+`">
                    <label for="ans-`+i+`-3"><p></p>`+qArray[selectedNumbers[i]].option[2]+`</label>`+qArray[selectedNumbers[i]].br+`
                </div>
            </div>
        `)
    }
}

function showCorrect() {
    $('.bam-book-wrong-block').remove();
    if($('[name="ans-0"]:checked').val() == 'wrong' || $('[name="ans-1"]:checked').val() == 'wrong' || $('[name="ans-2"]:checked').val() == 'wrong') {
        $('.bam-book-wrong-wrap').show();
        for(var i=0; i<selectedNumbers.length; i++) {
            var _correct = $('[name="ans-'+i+'"]:checked').val();
            $('.bam-book-wrong-content').append('<div class="bam-book-wrong-block '+ _correct +'"><h6>'+qArray[selectedNumbers[i]].questionresult+'</h6></div>')
        }
    } else {
        $('.bam-book-right-wrap').show();
        // 抽獎期間
        $('.bam-book-right-lottery').show().addClass('active');
        setTimeout(function() {
            $('.fake-bam-book-q-gift').css('display', 'block').css('left', $('.bam-book-q-gift').offset().left ).css('top', $('.bam-book-q-gift').offset().top);
            setTimeout(function() {
                $('.fake-bam-book-q-gift').addClass('active');
                $('.bam-book-badge-close').stop().delay(750).fadeIn();
            }, 100)
        }, 500)
        // 非抽獎期間
        // $('.bam-book-right-none').show();
    }
}

$(document)
.on('click', '.bam-book-guess-btn-guess', function() {
    $('.bam-book-guess-intro, .bam-book-wrong-wrap').hide();
    $('.bam-book-guess-question').show();
    randomQuestion();
})
.on('change', '.bam-book-guess-circle [type="radio"]', function() {
    if($('[name="ans-0"]:checked').val() == undefined || $('[name="ans-1"]:checked').val() == undefined || $('[name="ans-2"]:checked').val() == undefined) {
        $('.bam-book-guess-btn-send').removeClass('active');
    } else {
        $('.bam-book-guess-btn-send').addClass('active');
    }
})
.on('click', '.bam-book-guess-btn-send', function() {
    if($(this).hasClass('active')) {
        $('.bam-book-guess-question').hide();
        showCorrect();
    }
})
.on('click', '.bam-book-guess-btn-back', function() {
    $('.bam-book-guess-question, .bam-book-wrong-wrap, .bam-book-right-wrap, .bam-book-right-lottery, .bam-book-right-none').hide();
    $('.bam-book-guess-intro').show();
})
.on('click', '.bam-book-guess-btn-result', function() {
    $('.bam-book-scroll-wrap').animate({scrollTop: $('.bam-book-balloon').offset().top + $('.bam-book-scroll-wrap').scrollTop()}, 1000)
})
.on('mouseover', '.bam-book-balloon-balloon-href a', function() {
    if(window.innerWidth > 1024) {
        $('.bam-book-balloon-balloon').css('z-index', '0');
        $('.bam-book-balloon-balloon-'+ parseInt($(this).index() + 1)).css('z-index', '1')
    }
})
.on('mouseout', '.bam-book-balloon-balloon-href a', function() {
    if(window.innerWidth > 1024) {
        $('.bam-book-balloon-balloon').css('z-index', '0');
    }
})
.on('click', '.bam-book-balloon-balloon-href a', function() {
    $('.bam-book-scroll-wrap').addClass('fix');
    $('.bam-book-rate-lightbox').stop().fadeIn();
})
.on('click', '.bam-book-rate-lightbox-close', function() {
    $('.bam-book-scroll-wrap').removeClass('fix');
    $('.bam-book-rate-lightbox').stop().fadeOut();
})

// guess end