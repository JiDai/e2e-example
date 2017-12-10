const constants = require('../constants');

/**
 * Empty values in localStorage
 *
 * ```
 * this.demoTest = function (browser) {
 *   browser.emptyAnalyticsLocalStorage()
 *   browser.emptyAnalyticsLocalStorage(WA_LOCAL_STORAGE_KEY)
 *   browser.emptyAnalyticsLocalStorage(GA_LOCAL_STORAGE_KEY)
 * };
 * ```
 *
 * @method emptyAnalyticsLocalStorage
 * @param {String|undefined} key Specify key to empty, empty all if undefined
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */
module.exports.command = function(key, callback) {
    const browser = this;

    browser.execute(
        function(key, constants) {
            try {
                if (!key) {
                    window.localStorage.setItem(constants.WA_LOCAL_STORAGE_KEY, '[]');
                    window.localStorage.setItem(constants.GA_LOCAL_STORAGE_KEY, '[]');
                } else {
                    window.localStorage.setItem(key, '[]');
                }
            } catch (e) {
                return;
            }
        },
        [key, constants],
        callback,
    );

    return browser;
};
