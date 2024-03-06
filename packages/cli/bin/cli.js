#!/usr/bin/env node

import il from 'import-local';
import { log } from '@abc.com/utils';
import entry from '../lib/index.js';
import { filename } from 'dirname-filename-esm';

const __filename = filename(import.meta);

if (il(__filename)) {
	log.info('abc-cli', '使用本地版本')
} else {
	entry(process.argv.slice(2));
}
