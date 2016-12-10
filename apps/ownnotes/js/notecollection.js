/*
 * Copyright (c) 2016
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function(OC, OCA) {

	/**
	 * @class OCA.Notes.NoteCollection
	 * @classdesc
	 *
	 * Collection of notes assigned to a file
	 *
	 */
	var NoteCollection = OC.Backbone.Collection.extend(
		/** @lends OCA.Notes.NoteCollection.prototype */ {

		sync: OC.Backbone.davSync,		
		
		_baseUrl: OC.generateUrl('/apps/ownnotes/notes'),
		/**
		 * Object type
		 *
		 * @type string
		 */
		_objectType: 'files',

		/**
		 * Object id
		 *
		 * @type string
		 */
		_objectId: null,		
		setObjectId: function(objectId) {
			this._objectId = objectId;
		},		

		insert: function(data) {
			console.log(data);

			var deferred = $.Deferred();
	        var self = this;
	        $.ajax({
	            url: this._baseUrl,
	            method: 'POST',
	            contentType: 'application/json',
	            data: data
	        }).done(function (note) {	            
	            deferred.resolve();
	        }).fail(function () {
	            deferred.reject();
	        });

	        return deferred.promise();
		}	
	});

	OCA.Notes.NoteCollection = NoteCollection;
})(OC, OCA);

