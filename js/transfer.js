$(function () {
    $('h2.transfer, h3.transfer').on('click', function () {
        $(this).addClass('transfarColor');
        $(this).prevAll('h2').addClass('transfarColor');
        $(this).nextAll('h2').removeClass('transfarColor');
        let index = $('h2.transfer').index(this);
        localStorage.setItem('transfer', index);
    });
});

function initTransfer() {
    let index = localStorage.getItem('transfer');
    $h2transfer = $('h2.transfer').eq(index);
    $h2transfer.addClass('transfarColor');
    $h2transfer.prevAll('h2').addClass('transfarColor');
}