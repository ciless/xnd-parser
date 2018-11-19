/* eslint-disable indent */
/* eslint-disable guard-for-in */
import chokidar from 'chokidar';
import fs from 'fs';

const WATCHER_CONFIG = {
  persistent: true,
  depth: 0,
  usePolling: true,
};

function test(folder) {
  console.log('EXIST ' + folder + ' ' + fs.existsSync(folder));
  return fs.existsSync(folder);
}

function reconnect(name, path, callback) {
  const timer = setInterval(() => {
    if (test(path)) {
      callback('connect', name, path);
      watch(path, name, callback);
      clearInterval(timer);
    } else callback('disconnect', name, path);
  }, 10000);
}

function watch(path, name, callback) {
  if (!test(path)) {
    reconnect(name, path, callback);
  } else {
    chokidar
      .watch(path, WATCHER_CONFIG)
      .on('change', (path) => {
        callback('change', name, path);
      })
      .on('unlink', (path) => {
        if (path.indexOf('watcher_trigger') !== -1) {
          this.reconnect(name, path, callback);
        } else callback('unlink', name, path);
      });
  }
}

export default {
  watch(contracts, callback) {
    let name = null;

    for (name in contracts) {
      const contractsName = name;

      if (!test(contracts[contractsName])) {
        reconnect(contractsName, contracts[contractsName], callback);
      } else {
        chokidar
          .watch(contracts[contractsName], WATCHER_CONFIG)

          .on('change', (path) => {
            callback('change', contractsName, path);
          })
          .on('unlink', (path) => {
            if (path.indexOf('watcher_trigger') !== -1) {
              reconnect(contractsName, contracts[name], callback);
            } else callback('unlink', contractsName, path);
          });
      }
    }
  },
};
