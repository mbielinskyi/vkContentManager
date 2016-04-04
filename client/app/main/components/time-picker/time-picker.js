define([], function () {
    return {
        name: 'myDateTimePicker',
        config: {
            bindings: {
                onFullfill: "&"
            },
            controller: myDateTimePickerController,
            templateUrl: 'app/main/components/time-picker/time-picker.html'
        }
    };

    myDateTimePickerController.$inject = ["dateTools"];

    function myDateTimePickerController (dateTools, Constants) {
        var $ctrl = this;
        var msIn = {
            'day   ': Constants.MS_IN_DAY,
            'hour  ': Constants.MS_IN_HOUR,
            'minute': Constants.MS_IN_MINUTE,
            'second': Constants.MS_IN_SECOND            
        };

        $ctrl.$onInit = function () {
            var now = dateTools.getNow();

            // setting defaults
            $ctrl.selectedDate = now.date;
            $ctrl.time = now.time;
            $ctrl.delay = now.delay; 
            $ctrl.selectedDelayUnit = "second";
            // 'dd', 'hh', 'mm', 'ss'
            $ctrl.delayUnits = [
                'day   ',
                'hour  ',
                'minute',
                'second'
            ];     
        };

        $ctrl.checkTime = function () {
            $ctrl.time = dateTools.getValidTimeArray($ctrl.time);

            $ctrl.selectedDate = dateTools.setTime($ctrl.selectedDate, $ctrl.time);

            $ctrl.delay = dateTools.getThen($ctrl.selectedDate).delay / msIn[$ctrl.selectedDelayUnit];

            $ctrl.onFullfill({dateProperties: {scheduledDate: $ctrl.selectedDate.valueOf(), delay: $ctrl.delay}});
        };

        // recalculating delay based on provided date
        $ctrl.checkDate = function () {
            //updating selected date with previously set time
            $ctrl.selectedDate = dateTools.setTime($ctrl.selectedDate, $ctrl.time);

            // this is just a proxy date value to correct time zone
            var correctDate = dateTools.getThen($ctrl.selectedDate);

            $ctrl.delay = correctDate.delay / msIn[$ctrl.selectedDelayUnit];

            $ctrl.onFullfill({dateProperties: {scheduledDate: correctDate.valueOf(), delay: $ctrl.delay}});
        };

        $ctrl.checkDelay = function () {
            var delayMs = $ctrl.delay * msIn[$ctrl.selectedDelayUnit];

            var now = dateTools.getNow();

            var newDate = dateTools.getThen(now.ms + delayMs);

            $ctrl.selectedDate = newDate.date;

            $ctrl.time = newDate.time;

            $ctrl.onFullfill({dateProperties: {scheduledDate: $ctrl.selectedDate.valueOf(), delay: $ctrl.delay}});
        };
    }

});