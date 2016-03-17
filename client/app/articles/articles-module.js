define([
	'articles/services/articles-container',
	//'articles/components/article/',
	'articles/components/articles-list/articles-list',
	'articles/services/article-poster',
	'articles/services/article-posting-queue',
	'articles/components/new-content-item/new-content'

], function (articlesContainer, articlesListComponent, articlePoster, articlePostingQueue, newContentComponent) {
	var moduleName = 'articles';
	
	angular
		.module(moduleName, [])
		.service(articlesContainer.name, articlesContainer.fn)
		.service(articlePoster.name, articlePoster.fn)
		.service(articlePostingQueue.name, articlePostingQueue.fn)
		.component(articlesListComponent.name, articlesListComponent.config)
		.component(newContentComponent.name, newContentComponent.config);

	return moduleName;
});