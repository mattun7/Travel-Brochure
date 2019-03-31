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
		$endRoll = $('.endRoll'),
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
			if (page == 10) {
				playMusic();
			}
			bb.jump(page);
		},
		pageMenu = function () {
			$nav.css('bottom', '-50px');
			bb.jump(1);
		},
		audioElem;

	function init() {

		setJSP('init');
		setEvents();
		$items.on({
			'swipeleft': function (event) {
				if (current === 1) {
					// 最初のページなので遷移させない
					return false;
				}
				updateNavigation(current + 1);
				bb.next();
				return false;
			},
			'swiperight': function (event) {
				if (current === 8) {
					// 最終ページなので遷移させない
					return false;
				}
				updateNavigation(current - 1);
				bb.prev();
				return false;
			}
		});

		$endRoll.on({
			'click': function () {
				//document.removeEventListener('click', audioPlay);
				audioElem.pause();
				pageMenu();
			}
		})

		const page = localStorage.getItem('page');
		initBelongs();
		initTransfer();
		updateNavigation(page - 1);
		bb.jump(page == 10 ? 1 : page);
	}

	function setJSP(action, idx) {

		var idx = idx === undefined ? current : idx,
			$content = $items.eq(idx).children('div.content');

		if (action === 'event') {
			setNowPage(idx);
		}

		if (idx !== 9) {
			$content.jScrollPane({
				verticalGutter: 0,
				hideFocus: true
			});
		}
	}

	// 次へボタン、戻るボタンの制御
	function updateNavigation(page) {
		if (page === 0 || page === 9) {
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
		for (let i = 0; i < $toc.length; i++) {
			$toc[i].addEventListener('click', pageTop);
		}
		$menu[0].addEventListener('click', pageMenu);
	}

	function clearEvents() {
		$navNext[0].removeEventListener('click', pageNext);
		$navPrev[0].removeEventListener('click', pagePrev);
		for (let i = 0; i < $toc.length; i++) {
			$toc[i].removeEventListener('click', pageTop);
		}
		$menu[0].removeEventListener('click', pageMenu);
	}

	function playMusic() {
		//document.getElementById('audio').play();
		audioElem = new Audio();
		audioElem.src = "music/yuuenchi.mp3";
		audioElem.play();
	}

	return {
		init: init
	};

})();