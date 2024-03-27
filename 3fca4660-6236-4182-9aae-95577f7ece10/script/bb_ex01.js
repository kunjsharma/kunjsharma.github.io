/**
 * @author Kunj.Sharma
 */
Person = Backbone.Model.extend({
	initialize : function() {
		alert("Welcome to this world");
	},
	aa: function() {
		alert('aaaaaa');
	}
});

var person = new Person; 
person.aa();
