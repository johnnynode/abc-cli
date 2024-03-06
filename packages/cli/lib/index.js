const commander = require('commander');
const createInitCommand = require('@abc.com/init');
const { log, isDebug } = require('@abc.com/utils');
const { program } = commander;
const pkg = require('../package.json');
const semver = require('semver');

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


process.on('uncaughtException', function(e) {
	// 如果是 debug 模式，则输出错误栈，否则直接输出信息
	if (isDebug) {
		console.log(e);
	} else {
		console.log(e.message);
	}
})


module.exports = (args) => {
	log.success('log test version', pkg.version);
	program
		.name(Object.keys(pkg.bin)[0])
		.usage('<command> [options]')
		.version(pkg.version)
		.option('-d, --debug', '是否开启调试模式', false)
		.hook('preAction', preAction);

	createInitCommand(program); // 注册命令

	program.parse(process.argv)
}