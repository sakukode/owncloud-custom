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
	var NS_OWNCLOUD = 'http://owncloud.org/ns';
	/**
	 * @class OCA.Comments.NoteModel
	 * @classdesc
	 *
	 * Comment
	 *
	 */
	var NoteModel = OC.Backbone.Model.extend(
		/** @lends OCA.Comments.NoteModel.prototype */ {
		sync: OC.Backbone.davSync,

		defaults: {
			actorType: 'users',
			objectType: 'files'
		},

		davProperties: {
			'id': '{' + NS_OWNCLOUD + '}id',
			'title': '{' + NS_OWNCLOUD + '}title',
			'content': '{' + NS_OWNCLOUD + '}content',
			'userId': '{' + NS_OWNCLOUD + '}userId',		
		},

		parse: function(data) {
			return {
				id: data.id,
				title: data.title,
				content: data.content,
				userId: data.user_id,			
			};
		}
	});

	OCA.Notes.NoteModel = NoteModel;
})(OC, OCA);

