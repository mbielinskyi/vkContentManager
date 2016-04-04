define([], function () {

	function MsToTimeFilter () {
		return function(millseconds) {
			var SEC_IN_DAY = 86400;
			var SEC_IN_HOUR = 3600;
			var SEC_IN_MIN = 60;
			var MS_IN_SEC = 1000;
		    var seconds = Math.floor(millseconds / MS_IN_SEC);
		    var days = Math.floor(seconds / SEC_IN_DAY);
		    var timeZoneOffset = 0;
		    //var timeZoneOffset = (new Date()).getTimezoneOffset() * SEC_IN_MIN;
		    var hours = Math.floor(((seconds - timeZoneOffset) % SEC_IN_DAY) / SEC_IN_HOUR);
		    var minutes = Math.floor(((seconds % SEC_IN_DAY) % SEC_IN_HOUR) / SEC_IN_MIN);
		    var timeString = '';
		    if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
			timeString += ("00" + hours).substr(-2) + ":";
			timeString += ("00" + minutes).substr(-2) + ":";
			timeString += ("00" + seconds % SEC_IN_MIN).substr(-2);
		    return timeString;
		};
	}

	return {
		name: "msToTime",
		fn: MsToTimeFilter
	};
});