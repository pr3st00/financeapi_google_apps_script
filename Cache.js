/**
 *  Caching functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 23/05/2026
 * 
 * */

const DEFAULT_TTL = 21000; // seconds

/**
 * Retrieves a value from the caching system by key
 * 
 * @param key
 */
function getFromCache(key) {
  const cache = CacheService.getUserCache();
  const cached = cache.get(key);

  if (cached != null) {
    return cached;
  }

  return null;
}

/**
 * Adds the data to the caching system by key and sets the ttl
 * 
 * @param key
 * @param data
 * @param ttl
 */
function addToCache(key, data, ttl = DEFAULT_TTL) {
  const cache = CacheService.getUserCache();
  cache.put(key, data, ttl);

  return data;
}

// EOF