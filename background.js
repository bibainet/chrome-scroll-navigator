/**
 * Scroll navigator browser extension.
 * @version 1.0.4
 */

chrome.browserAction.onClicked.addListener(function(tab) {
	// Browser action button click. Scroll page to top/bottom.
	chrome.tabs.executeScript({
		code: 'window.scrollTo(window.pageXOffset, (window.pageYOffset <= 0) ? (document.body.scrollHeight <= window.innerHeight ? 1e5 : document.body.scrollHeight) : 0);'
	});
});
