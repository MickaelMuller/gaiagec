/**
 * Check if code is execute on server side
 *
 * @returns {boolean}
 */
export const isServer = typeof window === 'undefined';

/**
 * Check if code is execute on client side
 *
 * @returns {boolean}
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if NODE_ENV is production
 *
 * @type {boolean}
 */
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Check if NODE_ENV is development
 *
 * @type {boolean}
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Check if we are on staging environment
 *
 * @type {boolean}
 */
export const isStaging = process.env.APP_ENV === 'pprod';
