<?php
/**
 * @author Arthur Schiwon <blizzz@owncloud.com>
 * @author Morris Jobke <hey@morrisjobke.de>
 * @author Thomas Müller <thomas.mueller@tmit.eu>
 *
 * @copyright Copyright (c) 2016, ownCloud, Inc.
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

namespace OCA\user_ldap\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use \OCA\user_ldap\lib\Helper;
use \OCA\user_ldap\lib\Connection;

class TestConfig extends Command {

	protected function configure() {
		$this
			->setName('ldap:test-config')
			->setDescription('tests an LDAP configuration')
			->addArgument(
					'configID',
					InputArgument::REQUIRED,
					'the configuration ID'
				     )
		;
	}

	protected function execute(InputInterface $input, OutputInterface $output) {
		$helper = new Helper();
		$availableConfigs = $helper->getServerConfigurationPrefixes();
		$configID = $input->getArgument('configID');
		if(!in_array($configID, $availableConfigs)) {
			$output->writeln("Invalid configID");
			return;
		}

		$result = $this->testConfig($configID);
		if($result === 0) {
			$output->writeln('The configuration is valid and the connection could be established!');
		} else if($result === 1) {
			$output->writeln('The configuration is invalid. Please have a look at the logs for further details.');
		} else if($result === 2) {
			$output->writeln('The configuration is valid, but the Bind failed. Please check the server settings and credentials.');
		} else {
			$output->writeln('Your LDAP server was kidnapped by aliens.');
		}
	}

	/**
	 * tests the specified connection
	 * @param string $configID
	 * @return int
	 */
	protected function testConfig($configID) {
		$lw = new \OCA\user_ldap\lib\LDAP();
		$connection = new Connection($lw, $configID);

		//ensure validation is run before we attempt the bind
		$connection->getConfiguration();

		if(!$connection->setConfiguration(array(
			'ldap_configuration_active' => 1,
		))) {
			return 1;
		}
		if($connection->bind()) {
			return 0;
		}
		return 2;
	}
}
