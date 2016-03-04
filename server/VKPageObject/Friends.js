"use strict";

var webdriver = require('selenium-webdriver'),
    By = webdriver.By;

let userNameInput,
	passwordInput,
	loginButton,
	driver;

// Exporting LoginPage constructor
module.exports = function (_driver_) {
	// perform manipulations with driver and get all page elements
	driver = _driver_;
	driver.get('http://vk.com/friends');

	let friendsList = [];

	function scrollToBottom () {
		let body = driver.findElement(By.css("body"));

		body.getSize().then(function (size) {
			driver.executeScript("window.scrollBy(0," + size.height + ")");

			body.getSize().then(function (newSize) {
				if (newSize.height > size.height) {
					scrollToBottom();
				}
			}).thenCatch();	
		})
		.thenCatch();		
	}

	this.getFriendsList = function (req, res, cb) {
		// scroll here to the bottom of the page


		scrollToBottom();




		driver.findElements(By.css("#friends_list #list_content div.user_block"))
		.then(function (friendContainers) {

			friendContainers.forEach(function (friendContainer, i) {
				let friend = {};
				friendsList.push(friend);

				friendContainer.getAttribute("id")
				.then(function (id) {
					friend.id = id.replace("user_block", "");
				})
				.thenCatch();

				friendContainer.findElement(By.css("div.friends_field b")).getText()
				.then(function (name) {
					friend.name = name;

					if (friendContainers.length === i + 1) {
						res.send(JSON.stringify(friendsList));
					}
				})
				.thenCatch(function (error) {
					res.send("error");
				});

				

			});

		})
		.thenCatch(function () {

		});


		// #friends_list  /  
		// #list_content  /  
		// [each] div (is list of lazy loaded users)  /  
		// [each] div.user-block (is actual user)  /

		// div.friends_field b (friends name)
		// div.actions a:nth-first-child (write message)

	};

	this.signOut = function (req, res) {
		driver.findElement(By.css('#logout_link')).click();
		driver.get('http://vk.com/');

		res.send("false");
	};
};