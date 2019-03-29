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

				current = page;
				// updateNavigation
				updateNavigation(isLimit);
				// initialize jScrollPane on the content div for the new item
				setJSP('event');

			}
		}),
		$navNext = $('#bb-nav-next'),
		$navPrev = $('#bb-nav-prev'),
		$toc = $('.TOC_p'),
		$menu = $('#menu'),
		$border = $('#border');

	function init() {

		setJSP('init');
		initEvents();
		const page = localStorage.getItem('page');
		belongsInit();
		bb.jump(page);
	}

	function initEvents() {

		// add navigation events
		$navNext.on('click', function () {
			bb.next();
			return false;
		});

		$navPrev.on('click', function () {
			bb.prev();
			return false;
		});

		// add swipe events
		$items.on({
			'swipeleft': function (event) {
				if ($container.data('opened')) {
					return false;
				}
				bb.next();
				return false;
			},
			'swiperight': function (event) {
				if ($container.data('opened')) {
					return false;
				}
				bb.prev();
				return false;
			}
		});

		$toc.on('click', function () {
			var $el = $(this),
				idx = $el.index(),
				page = $el.data('item');
			bb.jump(page);
		});

		$menu.on('click', function () {
			$border.css('visibility', 'hidden');
			$navPrev.css('visibility', 'hidden');
			$menu.css('visibility', 'hidden');
			$navNext.css('visibility', 'hidden');
			bb.jump(1);
		});
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
	function updateNavigation(isLastPage) {
		if (current === 0) {
			return;
		} else if (current === 1) {
			// 2ページ目、メニューと次へボタンを表示
			$navPrev.css('visibility', 'hidden');
			$menu.css('visibility', 'visible');
			$navNext.css('visibility', 'visible');
		} else if (isLastPage) {
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
		$border.css('visibility', 'visible');
	}

	// 現在のページをlocalStorageに保存
	function setNowPage(page) {
		localStorage.setItem('page', page + 1);
	}

	return {
		init: init
	};

})();