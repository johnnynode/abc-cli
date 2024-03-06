const Command = require('@abc.com/command');
const { log } = require('@abc.com/utils');

class InitCommand extends Command {
  // 这个方法必须自行实现，否则走默认会报错
  get command() {
    return 'init [name]'
  }

  get description() {
    return 'init project'
  }

  get options() {
    return [
      ['-f, --force', '是否强制更新', false],
      ['-d, --debug', '是否调试模式', false],
    ]
  }

  // 注意这里没有 get 修饰
  action([name, opts]) {
    log.verbose('init ...')
    log.verbose(name)
    log.verbose(JSON.stringify(opts))
  }

  preAction() {
    console.log('pre');
  }

  postAction() {
    console.log('post');
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

module.exports = Init;
