/*
 * Copyright (c) 2015
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function() {
	var TEMPLATE =
		'<div><label>Note</label><br /><input type="text" class="form-control" name="note" /></div>';

	/**
	 * @memberof OCA.Versions
	 */
	var NotesTabView = OCA.Files.DetailTabView.extend(
		/** @lends OCA.Versions.NotesTabView.prototype */ {
		id: 'notesTabView',
		className: 'tab notesTabView',

		_template: null,

		$versionsContainer: null,

		events: {
			
		},

		initialize: function() {
			OCA.Files.DetailTabView.prototype.initialize.apply(this, arguments);
			this.collection = new OCA.Versions.VersionCollection();
			this.collection.on('request', this._onRequest, this);
			this.collection.on('sync', this._onEndRequest, this);
			this.collection.on('update', this._onUpdate, this);
			this.collection.on('error', this._onError, this);
			this.collection.on('add', this._onAddModel, this);
		},

		getLabel: function() {
			return t('files_notes', 'Notes');
		},

		_toggleLoading: function(state) {
			this._loading = state;
			this.$el.find('.loading').toggleClass('hidden', !state);
		},

		setFileInfo: function(fileInfo) {
			console.log(fileInfo)
			this.render();
		},
		
		template: function(data) {
			if (!this._template) {
				this._template = Handlebars.compile(TEMPLATE);
			}

			return this._template(data);
		},

		/**
		 * Renders this details view
		 */
		render: function() {
			this.$el.html(this.template({
				emptyNotesLabel: t('files_notes', 'No notes available'),				
			}));		
		},

		/**
		 * Returns true for files, false for folders.
		 *
		 * @return {bool} true for files, false for folders
		 */
		canDisplay: function(fileInfo) {
			if (!fileInfo) {
				return false;
			}
			return !fileInfo.isDirectory();
		}
	});

	OCA.Notes = OCA.Notes || {};

	OCA.Notes.NotesTabView = NotesTabView;
})();
