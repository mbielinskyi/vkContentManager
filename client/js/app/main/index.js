var vkApp = {
	modules: {},
	registerModule: function (moduleName, dependencies) {
		this.modules[moduleName] = angular.module(moduleName, dependencies);
	}
};
vkApp.registerModule("groupsModule", []);
vkApp.registerModule("app", ["groupsModule"]);