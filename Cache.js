/**
 *  Caching functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 23/05/2026
 * 
 * */

const DEFAULT_TTL = 21000; // seconds

function getFromCache(key) {
  const cache = CacheService.getUserCache();
  const cached = cache.get(key);

  if (cached != null) {
    return cached;
  }

  return null;
}

function addToCache(key, data, ttl = DEFAULT_TTL) {
  const cache = CacheService.getUserCache();
  cache.put(key, data, ttl);

  return data;
}

// EOF
