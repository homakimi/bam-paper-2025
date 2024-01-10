$(function () {
    const gameContainer = $('#game-container');
    const basket = $('#basket');
    var score;
    var scoreSuccess = 10;
    var createInterval = 500;
    var runDistance = 20;
    var dropSpeed = 25;
    var startFall;
    var countDownNum;
    var countDownInterval;
    reset();

    function reset() {
        clearInterval(countDownInterval);
        clearInterval(runGame);
        score = 0;
        startFall = false;
        countDownNum = 20;
        $('.game-time-block p').text(countDownNum);
        $('.game-result-fail, .game-result-success').hide();
    }

    function countDown() {
        if(startFall) {
            countDownInterval = setInterval(function() {
                if(countDownNum > 1) {
                    countDownNum --;
                } else {
                    // end game
                    countDownNum = 0;
                }
                $('.game-time-block p').text(countDownNum);
                result();
            }, 1000)
        }
    }
    function result() {
        if(score >= scoreSuccess) {
            var _thisTime = $('.game-time-block p').text();
            reset();
            $('.game-time-block p').text(_thisTime);
            $('.game-result, .game-result-success').fadeIn();
        } else {
            if(countDownNum == 0) {
                reset();
                $('.game-time-block p').text('0');
                $('.game-result, .game-result-fail').fadeIn();
            }
        }
    }
    function createEgg() {
        if(startFall) {
            const egg = $('<div class="egg"></div>');
            egg.css('bottom', '100%');
            egg.css('left', Math.floor(Math.random() * (gameContainer.width() - 20)) + 'px');
            gameContainer.append(egg);

            const fallInterval = setInterval(() => {
                const eggBottom = parseInt(egg.css('bottom'));
                if (eggBottom > 0) {
                    egg.css('bottom', eggBottom - dropSpeed + 'px');
                    if (eggBottom <= basket.height()*0.5 + parseInt(basket.css('bottom')) && Math.abs( (parseInt(basket.css('left'))+$('#basket').width()*0.5) - (parseInt(egg.css('left'))+$('.egg').width()*0.5) ) <= ($('.egg').width()+$('#basket').width())*0.5 ) {
                        score++;
                        egg.remove();
                        clearInterval(fallInterval);
                        console.log('catch', score)
                    }
                } else {
                    egg.remove();
                    clearInterval(fallInterval);
                }
            }, 100);
        }
    }

    $(document).keydown(function (e) {
        if(window.innerWidth <= 1024) {
            const basketLeft = parseInt(basket.css('left'));
            if (e.key === 'ArrowLeft' && basketLeft > 0) {
                basket.css('left', basketLeft - runDistance + 'px');
            } else if (e.key === 'ArrowRight' && basketLeft < gameContainer.width() - basket.width()) {
                basket.css('left', basketLeft + runDistance + 'px');
            }
        }
    });
    $(document).on('mousemove', '#game-container', function(e) {
        if(window.innerWidth > 1024) {
            var divOffset = $(this).offset();
            var x = e.pageX - divOffset.left;
            var _basketLeft = parseInt(basket.css('left'));
            var _basketPosition = parseInt(basket.css('left')) + parseInt(basket.width())*0.5;
            if(_basketPosition > x+10 && _basketLeft > 0) {
                basket.css('left', _basketLeft - runDistance + 'px');
                $('#basket').addClass('left');
            } else if(_basketPosition < x-10 && _basketLeft < gameContainer.width() - basket.width()) {
                basket.css('left', _basketLeft + runDistance + 'px');
                $('#basket').removeClass('left');
            }
        }
    });

    var runGame;
    $(document)
    .on('click', '.btn-start', function() {
        $('.game-intro').hide();
        $('.game-block').show();
        reset();
        runGame = setInterval(createEgg, createInterval);
        setTimeout(function() {
            startFall = true;
            countDown();
        }, 4000)
    })
    .on('click', '.game-result-fail a', function() {
        $('.game-block, .game-result, .game-result-fail').fadeOut();
        $('.game-intro').show();
    })
});
