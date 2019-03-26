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
		$menu = $('#menu');

	function init() {

		setJSP('init');
		initEvents();
		let page = sessionStorage.getItem('page');
		updateNavigation(page);
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
			bb.jump(2);
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
			// 最初最終ページ以外の場合、次へ戻るボタンを表示
			$navNext.css('visibility', 'visible');
			$navPrev.css('visibility', 'hidden');
		} else if (isLastPage) {
			// 最終ページの場合、次へボタン非表示
			$navNext.css('visibility', 'hidden');
			$navPrev.css('visibility', 'visible');
		} else {
			// 最初のページの場合、戻るボタン非表示
			$navNext.css('visibility', 'visible');
			$navPrev.css('visibility', 'visible');
		}
	}

	// 現在のページをSessionStorageに保存
	function setNowPage(page) {
		sessionStorage.setItem('page', page + 1);
	}

	return {
		init: init
	};

})();