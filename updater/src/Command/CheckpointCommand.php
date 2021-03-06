<?php
/**
 * @author Victor Dubiniuk <dubiniuk@owncloud.com>
 *
 * @copyright Copyright (c) 2015, ownCloud, Inc.
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */

namespace Owncloud\Updater\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class CheckpointCommand extends Command {

	protected function configure(){
		$this
				->setName('upgrade:checkpoint')
				->setDescription('Create or restore owncloud core files')
				->addOption(
						'create', null, InputOption::VALUE_NONE, 'create a checkpoint'
				)
				->addOption(
						'restore', null, InputOption::VALUE_REQUIRED, 'revert files to a given checkpoint'
				)
				->addOption(
						'list', null, InputOption::VALUE_OPTIONAL, 'show all checkpoints'
				)
		;
	}

	protected function execute(InputInterface $input, OutputInterface $output){
		$checkpoint = $this->container['utils.checkpoint'];
		if ($input->getOption('create')){
			$checkpointName = $checkpoint->create();
			$output->writeln('Created checkpoint ' . $checkpointName);
		} elseif ($input->getOption('restore')) {
			$checkpointId = stripslashes($input->getOption('restore'));
			$checkpoint->restore($checkpointId);
		} else {
			$checkpoints = $checkpoint->getAll();
			if (count($checkpoints)){
				$output->writeln(implode(PHP_EOL, $checkpoints));
			} else {
				$output->writeln('No checkpoints found');
			}
		}
	}

}
