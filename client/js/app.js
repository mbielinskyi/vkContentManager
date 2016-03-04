var vkApp = {
	modules: {},
	registerModule: function (moduleName, dependencies) {
		this.modules[moduleName] = angular.module(moduleName, dependencies);
	}
};

vkApp.registerModule("vkAPI", []);
vkApp.registerModule("vkAutomation", []);
vkApp.registerModule("main", ["vkAPI", "vkAutomation", "ngRoute", "ngMaterial", "ngMessages"]);