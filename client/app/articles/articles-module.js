define([
	'articles/services/articles-container',
	'articles/components/articles-list/articles-list',
	'articles/services/article-poster',
	'articles/services/article-posting-queue',
	'articles/components/new-article/new-article',
	'articles/components/saved-article/saved-article',
	'articles/components/queued-article/queued-article',
	'articles/components/posted-article/posted-article',
	'articles/components/posting-queue/posting-queue',
	'articles/components/queued-article-short/queued-article-short'	
], function (
		articlesContainer, 
		articlesListComponent, 
		articlePoster, 
		articlePostingQueue, 
		newContentComponent, 
		savedArticleComponent,
		queuedArticleComponent,
		postedArticleComponent,
		postingQueueComponent,
		queuedArticleShortComponent
	) {
	var moduleName = 'articles';
	
	angular
		.module(moduleName, [])
		.service(articlesContainer.name, articlesContainer.fn)
		.service(articlePoster.name, articlePoster.fn)
		.service(articlePostingQueue.name, articlePostingQueue.fn)
		.component(articlesListComponent.name, articlesListComponent.config)
		.component(newContentComponent.name, newContentComponent.config)
		.component(savedArticleComponent.name, savedArticleComponent.config)
		.component(queuedArticleComponent.name, queuedArticleComponent.config)
		.component(postedArticleComponent.name, postedArticleComponent.config)
		.component(postingQueueComponent.name, postingQueueComponent.config)
		.component(queuedArticleShortComponent.name, queuedArticleShortComponent.config);

	return moduleName;
});