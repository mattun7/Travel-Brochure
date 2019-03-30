var Page = (function () {

	var $container = $('#container'),
		$bookBlock = $('#bb-bookblock'),
		$items = $bookBlock.children(),
		current = 0,
		bb = $('#bb-bookblock').bookblock({
			speed: 800,
			perspective: 2000,
			shadows: true,
			shadowSides: 0.8,
			shadowFlip: 0.4,
			onEndFlip: function (old, page, isLimit) {
				setEvents()
				current = page;
				setJSP('event');
			},
			onBeforeFlip: function (page) {
				clearEvents();
				return false;
			}
		}),
		$navNext = $('#bb-nav-next'),
		$navPrev = $('#bb-nav-prev'),
		$toc = $('.TOC_p'),
		$menu = $('#menu'),
		$border = $('#border'),
		$nav = $('#nav'),
		pageNext = function () {
			updateNavigation(current + 1);
			bb.next();
			return false;
		},
		pagePrev = function () {
			updateNavigation(current - 1);
			bb.prev();
			return false;
		},
		pageTop = function () {
			var $el = $(this),
				idx = $el.index(),
				page = $el.data('item');
			updateNavigation(page - 1);
			$nav.css('bottom', '0');
			bb.jump(page);
		},
		pageMenu = function () {
			$nav.css('bottom', '-50px');
			bb.jump(1);
		};

	function init() {

		setJSP('init');
		setEvents();
		const page = localStorage.getItem('page');
		belongsInit();
		updateNavigation(page - 1);
		bb.jump(page);
	}

	function setJSP(action, idx) {

		var idx = idx === undefined ? current : idx,
			$content = $items.eq(idx).children('div.content');

		if (action === 'event') {
			setNowPage(idx);
		}
		$content.jScrollPane({
			verticalGutter: 0,
			hideFocus: true
		});
	}

	// 次へボタン、戻るボタンの制御
	function updateNavigation(page) {
		if (page === 0) {
			return;
		} else if (page === 1) {
			// 2ページ目、メニューと次へボタンを表示
			$navPrev.css('visibility', 'hidden');
			$menu.css('visibility', 'visible');
			$navNext.css('visibility', 'visible');
		} else if (page === 8) {
			// 最終ページの場合、次へボタン非表示
			$navPrev.css('visibility', 'visible');
			$menu.css('visibility', 'visible');
			$navNext.css('visibility', 'hidden');
		} else {
			// 最初最後以外ページの場合、戻るボタン非表示
			$navPrev.css('visibility', 'visible');
			$menu.css('visibility', 'visible');
			$navNext.css('visibility', 'visible');
		}
		$nav.css('bottom', '0');
	}

	// 現在のページをlocalStorageに保存
	function setNowPage(page) {
		localStorage.setItem('page', page + 1);
	}

	function setEvents() {
		$navNext[0].addEventListener('click', pageNext);
		$navPrev[0].addEventListener('click', pagePrev);
		$items[0].addEventListener('swipeleft', pageNext);
		$items[1].addEventListener('swiperight', pagePrev);
		for (let i = 0; i < 8; i++) {
			$toc[i].addEventListener('click', pageTop);
		}
		$menu[0].addEventListener('click', pageMenu);
	}

	function clearEvents() {
		$navNext[0].removeEventListener('click', pageNext);
		$navPrev[0].removeEventListener('click', pagePrev);
		$items[0].removeEventListener('swipeleft', pageNext);
		$items[1].removeEventListener('swiperight', pagePrev);
		for (let i = 0; i < 8; i++) {
			$toc[i].removeEventListener('click', pageTop);
		}
		$menu[0].removeEventListener('click', pageMenu);
	}

	return {
		init: init
	};

})();