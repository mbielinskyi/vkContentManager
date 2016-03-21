var articlesMock = [
		{
			ownerId: -50732577,
			delay: 10000,
			text: "Русский текст",
			author: "Maksim Bielinskyi",
			scheduledPostDate: (new Date().valueOf() + 10000),
			creationDate: (new Date()).valueOf(),
			isExpired: false,
			status: 1 
		},
		{
			ownerId: -50732577,
			delay: 12000,
			text: "some new text to be posted",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date().valueOf() + 12000),
			isExpired: false,
			status: 1
		},
		{
			ownerId: -72099551,
			delay: 14000,
			text: "some new new text to be posted",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date().valueOf() + 14000),
			isExpired: false,
			status: 1
		},
		{
			ownerId: -52776178,
			delay: 16000,
			text: "some new new new text to be posted",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date().valueOf() + 16000),
			isExpired: false,
			status: 1
		},
		{
			ownerId: -51880934,
			delay: 18000,
			text: "some new new new new text to be posted",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date().valueOf() + 18000),
			isExpired: false,
			status: 1
		},
		{
			ownerId: -51880934,
			delay: 30000,
			text: "some new new new new new text to be posted",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date().valueOf() + 30000),
			isExpired: false,
			status: 1
		},
		{
			ownerId: -116462359,
			delay: 10000,
			text: "Some text 1",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date()).valueOf(),
			isExpired: false,
			status: 0
		},
		{
			ownerId: -116462359,
			delay: 10000,
			text: "Some text 2",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date()).valueOf(),
			isExpired: false,
			status: 0
		},
		{
			ownerId: -116462359,
			delay: 10000,
			text: "Some text 3",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date()).valueOf(),
			isExpired: false,
			status: 0
		},
		{
			ownerId: -116462359,
			delay: 10000,
			text: "Some text 4",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date()).valueOf(),
			isExpired: false,
			status: 0
		},
		{
			ownerId: -51880934,
			delay: 10000,
			text: "Some text 5",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date()).valueOf(),
			isExpired: false,
			status: 0
		},
		{
			ownerId: -51880934,
			delay: 10000,
			text: "Some text 6",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date()).valueOf(),
			isExpired: false,
			status: 0
		},
		{
			ownerId: -51880934,
			delay: 10000,
			text: "Some text 7",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: (new Date()).valueOf(),
			isExpired: false,
			status: 0
		}	
	];



function setCustomDelay (article) {
	var delay = 100000;
	var nowUnix = (new Date()).valueOf();
	var randDelay = Math.floor(Math.random() * delay);

	article.delay = randDelay;
	article.scheduledPostDate = nowUnix + randDelay;

	return article;
}

module.exports = articlesMock.map(setCustomDelay);