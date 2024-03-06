class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error('command instance must exists!')
    }
    this.program = instance;
    const cmd = this.program.command(this.command);
    cmd.description(this.description);
    // 这里插入两个钩子函数
    cmd.hook('preAction', () => {
      this.preAction();
    })
    cmd.hook('postAction', () => {
      this.postAction();
    })
    // 处理 option, 并支持多个 option
    if (this.options?.length > 0) {
      this.options.forEach(option => {
        cmd.option(...option);
      })
    }
    cmd.action((...params) => {
      this.action(params);
    })
  }

  get command() {
    throw new Error('command must be implements')
  }

  get description() {
    throw new Error('description must be implements')
  }

  get options() {
    return [];
  }

  get action() {
    throw new Error('action must be implements')
  }

  preAction() {
    // empty
  }

  postAction() {
    // empty
  }

}

module.exports = Command;
