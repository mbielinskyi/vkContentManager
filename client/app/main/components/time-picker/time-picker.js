define([], function () {
  return {
    name: 'myDateTimePicker',
    config: {
      bindings: {
        onFullfill: "&"
      },
      controller: function(millSecondsToTimeStringFilter) {
        var $ctrl = this;
        var MS_IN_DAY = 86400000;
        var TIME_OFFSET = (new Date()).getTimezoneOffset() * 60 * 1000;

        // set time that came from bindings with selected data
        $ctrl.selectedDate = $ctrl.minDate = new Date();

        // deal with time zone
        $ctrl.time = getTimeArrayFromMs(((new Date()).valueOf() - TIME_OFFSET) % MS_IN_DAY);
        $ctrl.validTime = 0;
        $ctrl.delay = 1;

        // recalculating time and date based on provided delay
        $ctrl.checkDelay = function () {
          if (!$ctrl.delay) $ctrl.delay = 0;
          var delayMs = $ctrl.delay * 1000;

          $ctrl.selectedDate = new Date((new Date()).valueOf() + delayMs);


          // deal with time zone
          $ctrl.time = getTimeArrayFromMs(($ctrl.selectedDate - TIME_OFFSET) % MS_IN_DAY);
          $ctrl.validTime = calculateTime();

          $ctrl.onFullfill({date: $ctrl.selectedDate.valueOf()});
        };

        function getTimeArrayFromMs (ms) {
          var msAsTime = millSecondsToTimeStringFilter(ms);
          var msAsTimeShort = (msAsTime.length > 8)? msAsTime.substr(-8): msAsTime;
          return msAsTimeShort.split(":");
        }

        // recalculating delay and time based on provided date
        $ctrl.checkDate = function () {
          var dateMs = $ctrl.selectedDate.valueOf();
          var delayMs = dateMs - (new Date()).valueOf();

          $ctrl.delay = Math.floor(delayMs / 1000);
          $ctrl.time = getTimeArrayFromMs(delayMs);
          $ctrl.validTime = calculateTime();

          $ctrl.onFullfill({date: $ctrl.selectedDate.valueOf()});
        };


        $ctrl.checkTimeFormat = function () {
          if (!$ctrl.time) return;

          splitPairs();

          if ($ctrl.time[$ctrl.time.length - 1] )
          $ctrl.time = $ctrl.time.filter(function (el, i) {
            if (i > 2) {
              return false;
            }

            return true;
          });

          var lastPair = $ctrl.time[$ctrl.time.length - 1];


          if (lastPair.length < 2) return;

          $ctrl.time = $ctrl.time.map(validatePairs);

          $ctrl.validTime = calculateTime();

          // recalculating delay and date based on provided time
          $ctrl.time.forEach(function (el, i) {
            var dateModifications = {
              0: function (hours) {
                $ctrl.selectedDate.setHours(hours);
              },
              1: function (minutes) {
                $ctrl.selectedDate.setMinutes(minutes);
              },
              2: function (seconds) {
                $ctrl.selectedDate.setSeconds(seconds);
              }              
            };

            dateModifications[i](el);
          });

          $ctrl.delay = Math.floor(($ctrl.selectedDate.valueOf() - (new Date()).valueOf()) / 1000);

          $ctrl.onFullfill({date: $ctrl.selectedDate.valueOf()});
          //$ctrl.onFullfill({time: $ctrl.validTime});
        };

        function calculateTime () {
          var ms = 0;
          var multipliers = {
            0: 3600000,
            1: 60000,
            2: 1000
          };

          $ctrl.time.forEach(function (el, i) {
            ms += el * multipliers[i];
          });

          return ms;
        }

        function splitPairs () {
          var lastPair = $ctrl.time[$ctrl.time.length - 1];
          // check last el in array for length
          if (lastPair && lastPair.length > 2) {
            // split to two elements of 2 and rest

            var newPair = lastPair.slice(2, lastPair.length);

            // last pair reduced to 2 signs
            $ctrl.time[$ctrl.time.length - 1] = lastPair.slice(0,2);
            $ctrl.time = $ctrl.time.concat([newPair]);
          }
        }

        function validatePairs (el, i) {
            var firstChar = parseInt(el[0]);
            var secondChar = parseInt(el[1]);
            var validations = {
              0: checkFirstPair,
              1: checkRemainingPairs,
              2: checkRemainingPairs
            };

            // - when first sign is 0 or 1 - second should be 0 to 9
            // - when first sign is 2 - second should be 1,2,3
            // - when first sign is gt than 2
            function checkFirstPair (a, b) {
              if (a > 2) a = 2;
              if (a === 2 && b > 3) b = 3;
              return checkForNonDigits(a, b);
            }

            // - when 1st char is gt 5
            function checkRemainingPairs (a, b) {
              if (a > 5) a = 5;
              return checkForNonDigits(a, b);
            }

            // - when first or second chars are not numbers 
            function checkForNonDigits (a, b) {
                if (isNaN(a)) a = 0;
                if (isNaN(b)) b = 0;

                return a * 10 + b;
            }

            return validations[i](firstChar, secondChar);
          }
      },
      templateUrl: 'app/main/components/time-picker/time-picker.html'
    }
  };
});