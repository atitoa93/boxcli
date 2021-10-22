'use strict';

const BoxCommand = require('../../box-command');
const { flags } = require('@oclif/command');

const PRE_POPULATED_FILE_NAME = 'Get Started with Box.pdf';

class UsersDeletePrePopulatedContentCommand extends BoxCommand {
	async run() {
		const { flags, args } = this.parse(UsersDeletePrePopulatedContentCommand);

		// Set As-User header to perform the operations on behalf of the user
		this.client.asUser(args.userID);

		// Options to get the minimum data required for the validation
		const options = {
			fields: 'name',
			offset: 0,
			limit: 1,
		};
		const items = await this.client.folders.getItems(0, options);

		/**
		 * The validation:
		 * IF the user only owns 1 file
		 * AND that 1 file is named "Get Started with Box.pdf"
		 * THEN delete that file
		 */
		const { total_count: totalCount, entries } = items;
		if (totalCount === 1 && entries[0].type === 'file' && entries[0].name === PRE_POPULATED_FILE_NAME) {
			this.info(`User ${args.userID} has the pre populated file`);
			const fileId = entries[0].id;

			await this.client.files.delete(fileId);
			this.info('Deleted the pre populated file successfully');

			if (flags.force) {
				try {
					await this.client.files.deletePermanently(fileId);
					this.info('Deleted the pre populated file from the trash successfully');
				} catch (err) {
					// If the item can't be found in the trash, assume that it was already deleted or
					// that the enterprise didn't have trash enabled.  This should be regarded as a success case.
					if (err.statusCode !== 404) {
						throw err;
					}
				}
			}
		}
	}
}

UsersDeletePrePopulatedContentCommand.description = 'Delete pre populated content for provided user id';
UsersDeletePrePopulatedContentCommand.examples = ['box users:delete-pre-populated-content 22222'];

UsersDeletePrePopulatedContentCommand.flags = {
	...BoxCommand.flags,
	force: flags.boolean({
		char: 'f',
		description: 'Permanently delete the item, bypassing the trash',
	}),
};

UsersDeletePrePopulatedContentCommand.args = [
	{
		name: 'userID',
		required: true,
		hidden: false,
		description: 'User ID to delete their pre populated content',
	}
];

module.exports = UsersDeletePrePopulatedContentCommand;
