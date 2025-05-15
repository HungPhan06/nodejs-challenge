const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // TTL 60s

module.exports = {
  get(key) {
    return cache.get(key);
  },
  set(key, value) {
    return cache.set(key, value);
  },
  del(key) {
    return cache.del(key);
  },
  flush() {
    return cache.flushAll();
  },
  deleteCacheByPrefix(prefix) {
    const keys = cache.keys();
    const keysToDelete = keys.filter(key => key.startsWith(prefix));
    cache.del(keysToDelete);
  }
};
