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
		'<form class="formMetaData" method="post">' +
		'<div><label>Client Name</label><br /><input type="text" class="form-control" id="clientName" /></div><br />' +
		'<div><label>Facture</label><br /><input type="text" class="form-control" id="facture" /></div><br />' +
		'<div><button type="submit" class="submit">Save</button></div>' +
		'</form>';

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
			'submit .formMetaData': '_onSubmitMetaData',
		},

		initialize: function() {
			OCA.Files.DetailTabView.prototype.initialize.apply(this, arguments);
			this.collection = new OCA.Notes.NoteCollection();
			// this.collection.on('request', this._onRequest, this);
			// this.collection.on('sync', this._onEndRequest, this);
			// this.collection.on('update', this._onUpdate, this);
			// this.collection.on('error', this._onError, this);
			// this.collection.on('add', this._onAddModel, this);			
		},

		getLabel: function() {
			return t('files_notes', 'Notes');
		},

		_toggleLoading: function(state) {
			this._loading = state;
			this.$el.find('.loading').toggleClass('hidden', !state);
		},

		setFileInfo: function(fileInfo) {
			if (fileInfo) {		
				this.render();
				this.collection.setObjectId(fileInfo.id);				
			} else {				
				this.render();
				this.collection.reset();
			}		
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
		},

		_onSubmitMetaData: function(e) {
			var self = this;
			var $form = $(e.target);		
			var currentUser = OC.getCurrentUser();		
			var $inputClientName = $form.find('#clientName');
			var $inputFacture = $form.find('#facture');
			var clientName = $inputClientName.val().trim();
			var facture    = $inputFacture.val().trim();			

			e.preventDefault();
							
			this.collection.insert({
				userId: currentUser.uid,				
				clientName: clientName,
				facture: facture
			}, {
				at: 0,
					// wait for real creation before adding
					wait: true,
					success: function() {
						console.log("success save");
					},
					error: function(msg) {					
						OC.Notification.showTemporary(msg);
					}
			});
	
			//return false;
		},
	});

	OCA.Notes = OCA.Notes || {};

	OCA.Notes.NotesTabView = NotesTabView;
})();
