const { argv } = process;
const isDebug = argv.includes('--debug') || argv.includes('-d');

module.exports = isDebug;