/**
 * Scroll navigator browser extension.
 * @version 1.0.3
 */

// @ts-check

(function() {

/**
 * Prevent the default event handlers to be executed
 * @param {Event} event
 * @return {boolean} always false: "return stopEvent(event);"
 */
var stopEvent = function(event) {
	event.preventDefault && event.preventDefault();
	event.stopPropagation && event.stopPropagation();
	return event.returnValue = false;
};

/**
 * Previous value of the window.pageYOffset, before scrolling
 * @type {number}
 */
var lastYOffset = 0;

/**
 * The scroll bar element
 * @type {HTMLElement}
 */
var scrollBar = document.createElement('div');
scrollBar.setAttribute('id', 'scrollnavigator-browser-extension-bar');
// @ts-ignore Non-boolean values do not work
scrollBar.setAttribute('draggable', true);

// Attach event handlers to the scrollBar

// On left click: scroll to top/back
scrollBar.onclick = function(event) {
	// Log debug info if the CTRL key is pressed
	event.ctrlKey && console.log({
		innerHeight: window.innerHeight,
		scrollHeight: document.body.scrollHeight,
		clientHeight: document.body.clientHeight,
		offsetHeight: document.body.offsetHeight,
		fits: document.body.scrollHeight <= window.innerHeight,
		overflows: document.body.scrollHeight != document.body.clientHeight,
	});
	if (window.pageYOffset <= 0) {
		// At the top of the page
		if (lastYOffset) {
			// Scroll back to the lastYOffset
			window.scrollTo(window.pageXOffset, lastYOffset);
			lastYOffset = 0; // Restore the initial state?
		} else if (window.pageXOffset > 0) {
			// No need to scroll vertically, scroll right/left
			// |<- Scroll to the left
			window.scrollTo(0, 0);
		} else if (document.body.scrollWidth > window.innerWidth) {
			// Scroll to the right ->|
			window.scrollTo(document.body.scrollWidth, 0);
		};
	} else {
		// Scroll to the top, save the current Y-offset in lastYOffset
		lastYOffset = window.pageYOffset;
		window.scrollTo(window.pageXOffset, 0);
	};
	return stopEvent(event);
};

// On right click: scroll to bottom/back
scrollBar.oncontextmenu = function(event) {
	if (document.body.scrollHeight <= window.innerHeight) {
		// The whole document fits into window or there is non-standard page layout,
		// try to scroll to bottom in any case
		window.scrollTo(window.pageXOffset, 1e5);
	} else if (window.pageYOffset >= document.body.scrollHeight - window.innerHeight) {
		// Scroll back to lastYOffset
		window.scrollTo(window.pageXOffset, lastYOffset);
		// lastYOffset = document.body.scrollHeight - window.innerHeight; // Restore the initial state?
	} else {
		// Scroll to the bottom, save the current Y-offset in lastYOffset
		lastYOffset = window.pageYOffset;
		window.scrollTo(window.pageXOffset, document.body.scrollHeight);
	};
	return stopEvent(event);
};

// On drag start: scroll to exact position
scrollBar.ondragstart = function(event) {
	if (0 < window.innerHeight && window.innerHeight < document.body.scrollHeight) {
		// The document doesn't fit into window, scroll it
		// Convert the fractional value (event.clientY / window.innerHeight) (0..1) to the absolute scroll offset
		window.scrollTo(window.pageXOffset, Math.ceil(event.clientY / window.innerHeight * (document.body.scrollHeight - window.innerHeight)));
	};
	return stopEvent(event);
};

// On mouse wheel: scroll up/down by one page (whole screen)
scrollBar.onwheel = function(event) {
	window.scrollBy(0, Math.floor(window.innerHeight * 0.9 * Math.sign(event.deltaY)));
	return stopEvent(event);
};

// Insert the element into the DOM tree
document.body.appendChild(scrollBar);

})();
