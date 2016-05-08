(function () {

var lastPosition = 0;

var div = document.createElement('div');
div.setAttribute('id', 'scrollnavigator-browser-extension-bar');
div.setAttribute('draggable', true);

// Scroll to top/back
div.onclick = function (event) {
	if (window.pageYOffset <= 0) {
		window.scrollTo(window.pageXOffset, lastPosition);
		lastPosition = 0;
	} else {
		lastPosition = window.pageYOffset;
		window.scrollTo(window.pageXOffset, 0);
	};
	return false;
};

// Scroll to bottom/back
div.oncontextmenu = function (event) {
	if (document.body.clientHeight <= window.innerHeight) {
		window.scrollTo(window.pageXOffset, 1E5);
	} else if (window.pageYOffset >= document.body.clientHeight - window.innerHeight) {
		window.scrollTo(window.pageXOffset, lastPosition);
		lastPosition = document.body.clientHeight - window.innerHeight;
	} else {
		lastPosition = window.pageYOffset;
		window.scrollTo(window.pageXOffset, document.body.clientHeight);
	};
	if (event.preventDefault != undefined) event.preventDefault();
	if (event.returnValue != undefined) event.returnValue = false;
	return false;
};

// Scroll to exact position
div.ondragstart = function (event) {
	if (document.body.clientHeight > window.innerHeight)
		window.scrollTo(window.pageXOffset, Math.ceil(event.clientY / window.innerHeight * (document.body.clientHeight - window.innerHeight)));
	return false;
};

document.body.appendChild(div);

})();
