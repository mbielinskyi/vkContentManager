define([], function () {
  return {
    name: 'myPane',
    config: {
      transclude: true,
      require: {
        tabsCtrl: '^myTabs'
      },
      bindings: {
        title: '@'
      },
      controller: function() {
        this.$onInit = function() {
          this.tabsCtrl.addPane(this);
          console.log(this);
          console.log(this.paneAction);
        };
      },
      templateUrl: 'app/main/components/my-pane/my-pane.html'
    }
  };
});