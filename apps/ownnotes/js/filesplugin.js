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
	OCA.Notes = OCA.Notes || {};

	/**
	 * @namespace
	 */
	OCA.Notes.Util = {
		/**
		 * Initialize the versions plugin.
		 *
		 * @param {OCA.Files.FileList} fileList file list to be extended
		 */
		attach: function(fileList) {
			if (fileList.id === 'trashbin' || fileList.id === 'files.public') {
				return;
			}

			fileList.registerTabView(new OCA.Notes.NotesTabView('notesTabView', {order: 0}));
		}
	};
})();

OC.Plugins.register('OCA.Files.FileList', OCA.Notes.Util);

