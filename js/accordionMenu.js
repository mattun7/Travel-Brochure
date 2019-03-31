var rotate = 45;

$(function () {
    $(".accordionbox dt").on("click", function () {
        $(this).next().slideToggle('normal', resetScroll);
        // activeが存在する場合

        const $accordion_icon = $(this).children(".accordion_icon");

        const $span_1 = $(this).find('span:nth-child(1)');
        const $span_2 = $(this).find('span:nth-child(2)');
        let rotate_1 = $(this).data('1') + rotate;
        let rotate_2 = $(this).data('2') + rotate;
        $span_1.css('transform', 'rotate(' + rotate_1 + 'deg)');
        $span_2.css('transform', 'rotate(' + rotate_2 + 'deg)');
        $(this).data('1', rotate_1);
        $(this).data('2', rotate_2);
    });
});

function resetScroll() {
    $('#item2').children('div.content').jScrollPane({
        verticalGutter: 0,
        hideFocus: true,
        showArrows: true
    });
}