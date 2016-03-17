"use strict";

let driver;

module.exports = function (_driver_) {
	// perform manipulations with driver and get all page elements
	driver = _driver_;

	this.quit = function () {
		driver.quit();
	};
};