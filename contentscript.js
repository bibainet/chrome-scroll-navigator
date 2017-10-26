/**
 * Scroll navigator browser extension.
 * 
 * @version 1.0.2
 */

// @ts-check

(function() {

/**
 * Prevent the default event handlers to be executed
 * @param {Event} event
 * @return {boolean} always false: "return stopEvent(event);"
 */
var stopEvent = function(event) {
	(event.preventDefault !== undefined) && event.preventDefault();
	(event.stopPropagation !== undefined) && event.stopPropagation();
	(event.returnValue !== undefined) && (event.returnValue = false);
	return false;
};

/**
 * Previous value of the window.pageYOffset, before scrolling
 * @type {number}
 */
var lastPosition = 0;

/**
 * The scroll bar element
 * @type {HTMLElement}
 */
var scrollBar = document.createElement('div');
scrollBar.setAttribute('id', 'scrollnavigator-browser-extension-bar');
// @ts-ignore
scrollBar.setAttribute('draggable', true); // Non-boolean values do not work

// Attach event handlers to the scrollBar

// On left click: scroll to top/back
scrollBar.onclick = function(event) {
	if (window.pageYOffset <= 0) {
		// Scroll back to lastPosition
		window.scrollTo(window.pageXOffset, lastPosition);
		lastPosition = 0;
	} else {
		// Scroll to top, save window.pageYOffset in lastPosition
		lastPosition = window.pageYOffset;
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
		// Scroll back to lastPosition
		window.scrollTo(window.pageXOffset, lastPosition);
		lastPosition = document.body.scrollHeight - window.innerHeight;
	} else {
		// Scroll to bottom, save window.pageYOffset in lastPosition
		lastPosition = window.pageYOffset;
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

// On mouse enter: show debug info hint if the CTRL key is pressed
scrollBar.onmouseenter = function(event) {
	event.ctrlKey && this.setAttribute('title',
`innerHeight: ${window.innerHeight}
scrollHeight: ${document.body.scrollHeight}
clientHeight: ${document.body.clientHeight}
offsetHeight: ${document.body.offsetHeight}
Fits in window: ${document.body.scrollHeight <= window.innerHeight ? 'YES' : 'no'}
Body overflow: ${document.body.scrollHeight != document.body.clientHeight ? 'YES' : 'no'}`);
};

// Insert the element into the DOM tree
document.body.appendChild(scrollBar);

})();
