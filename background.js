chrome.browserAction.onClicked.addListener(function (tab) {
	// Browser action button click. Scroll page to top/bottom.
	chrome.tabs.executeScript({
		code: 'window.scrollTo(window.pageXOffset, (window.pageYOffset <= 0) ? (document.body.clientHeight <= window.innerHeight ? 1E5 : document.body.clientHeight) : 0);'
	});
});
