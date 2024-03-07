import { log, isDebug } from '@abc.com/utils';

// 如果是 debug 模式，则输出错误栈，否则直接输出信息
function printErrorLog(e, type) {
	if (isDebug) {
		log.error(type, e);
	} else {
		log.error(type, e.message);
	}
}

process.on('uncaughtException', e => printErrorLog(e, 'error')); // 普通错误
process.on('unhandledRejection', e => printErrorLog(e, 'promise')); // promise错误