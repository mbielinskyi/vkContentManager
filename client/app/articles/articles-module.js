define([
	'articles/services/articles-container',
	//'articles/components/article/',
	'articles/components/articles-list/articles-list',
	'articles/services/article-poster',
	'articles/services/article-posting-queue',
	'articles/components/new-article-item/new-article',
	'articles/components/saved-article/saved-article',
	'articles/components/queued-article/queued-article',
	'articles/components/posted-article/posted-article'

], function (
		articlesContainer, 
		articlesListComponent, 
		articlePoster, 
		articlePostingQueue, 
		newContentComponent, 
		savedArticleComponent,
		queuedArticleComponent,
		postedArticleComponent
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
		.component(postedArticleComponent.name, postedArticleComponent.config);

	return moduleName;
});