import path from 'node:path';
import { execa } from 'execa';

const CLI = path.join(__dirname, '../bin/cli.js');
const bin = () => (...args) => execa(CLI, args);

// 正常测试
test('run normal test', () => {
	expect(1 + 1).toBe(2);
})

// 测试 cli 未注册命令
test('run cli', async () => {
	const { stderr } = await bin()('iii');
	expect(stderr).toContain('未知的命令：iii')
})

// 测试 --help
test('test --help', async () => {
	let error = null;
	try {
		await bin()('--help');
	} catch(e) {
		error = e;
	}
	expect(error).toBe(null);
})

// 测试 -V
test('test --version', async () => {
	const { stderr } = await bin()('-V');
	expect(stderr).toContain(require('../package.json').version)
})

// 测试是否开启 debug 模式
test('test --debug', async () => {
	let error = null;
	try {
		await bin()('-d');
	} catch(e) {
		error = e;
	}
	expect(error.message).toContain('launch debug mode');
})