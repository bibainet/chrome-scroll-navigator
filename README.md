Scroll navigator browser extension
==================================

**Move the mouse pointer to the left border of the screen on any page and click to scroll.**

* Left click on the left edge of any page — scroll to the top.
* Right click — scroll to the bottom.
* Click again — scroll back to the previous position and continue reading.
* Drag the left edge — scroll to the exact position.
* Mouse wheel — scroll by entire page (whole screen).
* Click on the toolbar button — scroll to the top/bottom.
* At the top of the page, if there is no previous position to restore, left click scrolls to right/left.

----

This extension does not affect the appearance of web pages, it does not create "scroll to top" button.
So, you don't need to aim any buttons, just move the pointer to the left until it stops, fast and easy!

To use this extension, the browser window should be maximized, side bar should be hidden.

This extension may not work properly on some websites with non-standard layouts.

----

This project is licensed under the terms of the GNU GPL v2 license.

Source code: <https://github.com/bibainet/chrome-scroll-navigator>


Version history
---------------

### 1.0.4 2017.12.08

+ Added horisontal scroll: when the current vertical scrolling position is 0 and the previous position is not present, the scroll to top/back function (left click) will scroll the page to the right/left
* Some internal improvements

### 1.0.3 2017.10.27

* Fix scroll down issues on some sites with non-standard layouts
+ Added: scroll up/down by entire page (whole screen) on mouse wheel

### 1.0.2 2017.10.25

* Several internal improvements and fixes

### 1.0.1 2016.05.10

+ The mouse pointer, when moved to the screen left edge, is now changed to 'ns-resize' indicating the scrolling feature
* Always prevent the default click event handlers to be executed
+ Added 64px icon
* README files updated
