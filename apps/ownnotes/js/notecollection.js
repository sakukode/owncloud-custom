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

		insert: function() {
			
		}	
	});

	OCA.Notes.NoteCollection = NoteCollection;
})(OC, OCA);

