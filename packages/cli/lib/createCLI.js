import path from 'node:path';
import fse from 'fs-extra';
import { program } from 'commander';
import { dirname } from 'dirname-filename-esm';
import { log } from '@abc.com/utils';
import semver from 'semver';

const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = fse.readJsonSync(pkgPath);
const LOWEST_NDDE_VERSION = '14.0.0'; // 最低允许运行的node版本


// 检查node版本
function checkNodeVersion() {
	log.verbose('node version: ', process.version);
	// 前面 大于等于后面这个, 取反判断，也就是如果不大于等于，处理相关逻辑
	if (!semver.gte(process.version, LOWEST_NDDE_VERSION)) {
		// 中断并报错
		throw new Error(`abc-cli 需要最低的nodejs版本为：${LOWEST_NDDE_VERSION}`)
	}
}

function preAction() {
	// 检查node版本
	checkNodeVersion()
}

export default function createCLI() {
	log.success('log test version', pkg.version); // 测试代码
	program
		.name(Object.keys(pkg.bin)[0])
		.usage('<command> [options]')
		.version(pkg.version)
		.option('-d, --debug', '是否开启调试模式', false)
		.hook('preAction', preAction);

	// 对属性的监听, 这里对全局的option 进行监听，如果是子命令的 option 在子命令里面可以获取
	program.on('option:debug', function() {
		// console.log(program.opts()) // 全局属性
		if(program.opts().debug) {
			log.verbose('debug', 'launch debug mode!')
		}
	})

	// 对命令的监听：命令兜底
	program.on('command:*', function(obj) {
		log.error('未知的命令：' + obj[0]);
	})
	return program;
}