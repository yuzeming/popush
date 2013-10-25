/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	app.Members = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.user,

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			if (!this.length) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		comparator: function (member) {
			var value = "00";
			if (!member.owner)
				value[0] = '1';
			if (!member.online)
				value[1] = '1';
			return value + member.get('name');
		}
		
		isset: function(a) {
			return typeof(a) != "undefined" && a !== null;
		},
		
		update: function (data) {
			var col = this;
			col.reset();
			for (var i = 0; i < data.length; ++i)
				var d = data[i];
				col.add({
					name: col.isset(d.name) ? d.name : '',
					avatar: col.isset(d.avatar) ? d.avatar : '',
					online: col.isset(d.online) ? d.online : false,
					owner: col.isset(d.owner) ? d.owner : false
				});
		},
	});

})();
