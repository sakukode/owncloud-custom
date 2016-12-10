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

		model: OCA.Notes.NoteModel,

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
		/**
		 * Initializes the collection
		 *
		 * @param {string} [options.objectType] object type
		 * @param {string} [options.objectId] object id
		 */
		initialize: function(models, options) {
			options = options || {};
			if (options.objectType) {
				this._objectType = options.objectType;
			}
			if (options.objectId) {
				this._objectId = options.objectId;
			}
		},

		url: function() {
			return OC.linkToRemote('dav') + '/notes/' +
				encodeURIComponent(this._objectType) + '/' +
				encodeURIComponent(this._objectId) + '/';
		},

		setObjectId: function(objectId) {
			this._objectId = objectId;
		},		
		/**
		 * Returns the matching summary model
		 *
		 * @return {OCA.Notes.NoteSummaryModel} summary model
		 */
		getSummaryModel: function() {
			if (!this._summaryModel) {
				this._summaryModel = new OCA.Notes.NoteSummaryModel({
					id: this._objectId,
					objectType: this._objectType
				});
			}
			return this._summaryModel;
		},

		/**
		 * Updates the read marker for this comment thread
		 *
		 * @param {Date} [date] optional date, defaults to now
		 * @param {Object} [options] backbone options
		 */
		updateReadMarker: function(date, options) {
			options = options || {};

			return this.getSummaryModel().save({
				readMarker: (date || new Date()).toUTCString()
			}, options);
		}
	});

	OCA.Notes.NoteCollection = NoteCollection;
})(OC, OCA);

