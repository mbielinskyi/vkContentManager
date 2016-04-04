define([], function () {
	return {
		name: "Constants",

		fn: function GroupsService () {
			return {
				'MS_IN_DAY'   : 24 * 60 * 60 * 1000,
	            'MS_IN_HOUR'  : 60 * 60 * 1000,
	            'MS_IN_MINUTE': 60 * 1000,
	            'MS_IN_SECOND': 1000 ,
	            'SEC_IN_MIN'  : 60,
	            'STATUSES': [
	            	{
	            		id: 0,
	            		name: "saved"
	            	},
	            	{
	            		id: 1,
	            		name: "queued"
	            	},
	            	{
	            		id: 2,
	            		name: "posted"
	            	},
	            	{
	            		id: 3,
	            		name: "deleted"
	            	},	            		            	
	            ]
			};
		}
	};
});