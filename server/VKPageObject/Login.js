"use strict";

var webdriver = require('selenium-webdriver'),
    By = webdriver.By;

let userNameInput,
	passwordInput,
	loginButton,
	driver;

// Exporting LoginPage constructor
module.exports = function (_driver_) {
		// init();

		// function init () {
		 	driver = _driver_;

		// 	var alreadyLoggedInPromise = driver.findElement(By.css('body'))
		// 		.isElementPresent(By.css('#logout_link'));

		// 	alreadyLoggedInPromise
		// 		.then(function (isLogged) {
		// 			if (isLogged === true) {
		// 				console.log("true");
		// 				// in this case we should create and return logged page 
		// 				// previously check what type of page was loaded by default
		// 			} else {
		// 				// perform manipulations with driver and get all page elements
		// 				userNameInput = driver.findElement(By.id('quick_email'));
		// 				passwordInput = driver.findElement(By.id('quick_pass'));
		// 				loginButton = driver.findElement(By.id('quick_login_button'));
		// 			}
		// 		})
		// 		.thenCatch(function (error) {
		// 			console.log("Error!!!");
		// 		});			
		// }

	this.signIn = function (req, res, cb) {
		let login = req.body.login;
		let password = req.body.password;

		userNameInput = driver.findElement(By.id('quick_email'));
		passwordInput = driver.findElement(By.id('quick_pass'));
		loginButton = driver.findElement(By.id('quick_login_button'));

		userNameInput.sendKeys(login);
		passwordInput.sendKeys(password);
		loginButton.click();

		// this promise is looking for log out button 
		// on the page to check if user have been logged in already
		driver.findElement(By.css('body'))
			.isElementPresent(By.css('#logout_link'))
			.then(function (isLogged) {
				if (isLogged === true) {
					// load home page if already logged in
					//cb();

					driver.findElement(By.css('#myprofile')).getAttribute("href").then(function (homePageUrl) {
						var splittedUrl = homePageUrl.split("/");
						var userId = splittedUrl[splittedUrl.length -1];
				  		res.send(userId);
					});

				} else {
					// actions for login failure
				  	res.send("");
				  	driver.get('http://vk.com/');
				}
			})
			.thenCatch(function (error) {
				res.send(error.message);
			});
	};

	this.signOut = function (req, res) {
		driver.findElement(By.css('#logout_link')).click();
		driver.get('http://vk.com/');

		res.send("");
	};
};