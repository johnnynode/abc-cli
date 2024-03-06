#!/usr/bin/env node

const il = require('import-local');
const { log } = require('@abc.com/utils');
const entry = require('../lib/index.js');

if (il(__filename)) {
	log.info('abc-cli', '使用本地版本')
} else {
	entry(process.argv.slice(2));
}
