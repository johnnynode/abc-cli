import log from 'npmlog';
import isDebug from './isDebug.js';

// 基于调试模式来确定输出日志的等级
if (isDebug) {
	log.level = 'verbose'
} else {
	log.level = 'info';
}

// 在log的前面加上标识：
log.heading = 'abc.com'

// 添加level功能
log.addLevel('success', 2000, { fg: 'green', bg: 'red', bold: true })


export default log;