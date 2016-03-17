define([], function () {

  function MyTabsComponent () {
    var panes = this.panes = [];

    this.select = function(pane) {
      angular.forEach(panes, function(pane) {
        pane.selected = false;
      });
      pane.selected = true;

      pane.action && pane.action();
    };
    
    this.addPane = function(pane) {
      if (panes.length === 0) {
        this.select(pane);
      }
      panes.push(pane);
    };
  }

  return {
    name: 'myTabs',
    config: {
      transclude: true,
      bindings: {
        action: "="
      },
      controller: MyTabsComponent,
      templateUrl: 'app/main/components/my-tabs/my-tabs.html'
    }
  };
});