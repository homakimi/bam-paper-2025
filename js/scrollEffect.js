$(function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    effect_fadein();
    typeEffect();
    $(document).scroll(function() {
        effect_fadein();
        typeEffect();
    })

    function effect_fadein() {
        // scroll show effect starts
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
        // scroll show effect ends
    }

    function typeEffect() {
        $('[data-type-effect]').each(function() {
            if(!$(this).hasClass('splitAready')) {
                $(this).addClass('splitAready').css('opacity', '0');
                var _textContent = $(this).html();
                var _newTextHTML = _textContent.replace(/<br>/g, '▼').split('').map(char => {
                    if (char === '▼') {
                        return '<br>';
                    } else {
                        return '<span>' + char + '</span>';
                    }
                }).join('');
                $(this).html(_newTextHTML)
                $(this).find('span').css('opacity', '0');
            }
            if($(window).scrollTop() > $(this).offset().top - $(window).height()*0.75) {
                if(!$(this).hasClass('active')) {
                    setTimeout(function() {
                        $(this).addClass('active').css('opacity', '1');
                        var _length = 0;
                        setInterval(function() {
                            if(_length < $(this).find('span').length) {
                                $(this).find('span').eq(_length).css('opacity', '1');
                                _length += 1;
                            }
                        }.bind(this), 30)
                    }.bind(this), $(this).data('type-effect'));
                }
            }
        })
    }
})