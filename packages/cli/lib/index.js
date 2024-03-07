import createInitCommand from '@abc.com/init';
import createCLI from './createCLI.js';
import './exception.js';

export default () => {
	const program = createCLI();
	createInitCommand(program); // 注册命令
	program.parse(process.argv)
}