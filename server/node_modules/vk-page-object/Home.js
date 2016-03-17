"use strict";

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

let userNameInput,
	passwordInput,
	loginButton,
	driver;

exports.LoginPage = function (_driver_) {
		// perform manipulations with driver and get all page elements
		driver = _driver_;
		driver.get('http://vk.com/');

		userNameInput = driver.findElement(By.id('quick_email'));
		passwordInput = driver.findElement(By.id('quick_pass'));
		loginButton = driver.findElement(By.id('quick_login_button'));

	this.signIn = function (userName, password) {
		userNameInput.sendKeys(userName);
		passwordInput.sendKeys(password);
		loginButton.click();

		driver.wait(until.elementLocated({css: '#logout_link'}))
			.then(function (element) {
				console.log("login SUCCEEDED");
			})
			.thenCatch(function (err) {
				console.log("login FAILED");
			});
	};
};