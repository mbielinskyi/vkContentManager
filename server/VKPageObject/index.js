"use strict";

var LoginPage = require("./Login");
var HomePage = require("./Home");
var FriendsPage = require("./Friends");
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;

//initializing web driver
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://vk.com/');

// stores current web page object instance
let currentPage = new LoginPage(driver);

function goToHomePage () {
	currentPage = new HomePage(driver);
}

function goToLoginPage () {
	currentPage = new LoginPage(driver);
}

module.exports = {
	checkLoginState: function (req, res) {
		driver.findElement(By.css('body'))
		.isElementPresent(By.css('#logout_link'))
		.then(function (isLogged) {
				if (isLogged === true) {
					// load home page if already logged in

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
	},
	getFriendsList: function (req, res) {
		let friendsPage = new FriendsPage(driver);

		friendsPage.getFriendsList(req, res);
	},
	login: function (req, res) {
		currentPage.signIn(req, res, goToHomePage);
	},
	logout: function (req, res) {
		currentPage.signOut(req, res, goToLoginPage);
	},
	LoginPage: LoginPage,
	HomePage: HomePage,
	FriendsPage: FriendsPage
};