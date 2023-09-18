$(function() {
    resize();
    $(window).resize(function() {
        if(window.innerWidth > 1024) {
            resize();
        }
    })
})
function resize() {
    $('.bam-village-scroll-wrap').css('height', window.innerHeight)
}
