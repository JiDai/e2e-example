const { GA_LOCAL_STORAGE_KEY } = require('../constants');

/**
 * Inject a script to the page to be able to log all Google Analytics events
 *
 * ```
 * this.demoTest = function (browser) {
 *   browser.mockGA()
 * };
 * ```
 *
 * @method mockGA
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */
module.exports.command = function (callback) {
    const browser = this;

    browser.execute(
        function (storageKey) {
            console.log("window.orignalGa : ", window.orignalGa);
            window.orignalGa = window.ga;
            window.ga = function () {
                // Send to Google Analytics
                if(typeof window.orignalGa === 'function') {
                    window.orignalGa.apply(window.orignalGa, arguments);
                }

                // Handle different ways to call GA
                if (typeof arguments[1] === 'object') {
                    // use case : ga('event', {})
                    consoleLogData = arguments[1];
                }
                else {
                    // use case : ga('event', 'category', 'action', 'label') or ga('event', 'category', 'action')
                    consoleLogData = {
                        hitType: arguments[0],
                        eventCategory: arguments[1],
                        eventAction: arguments[2],
                        eventLabel: arguments[3],
                    };
                }
                var logEntries = JSON.parse(window.localStorage.getItem(storageKey)) || [];
                var logData = arguments[1]; // use case : ga('event', {})
                logEntries.push(logData);
                // Replace undefined values by null to keep keys in object
                // to avoid NightWatch assertions to fail
                try {
                    localStorage.setItem(storageKey, JSON.stringify(logEntries, function (k, v) {
                        if (v === undefined) {
                            return null;
                        }
                        return v;
                    }));
                } catch (e) {
                    console.error(e);
                }
                // For visual debug
                console.log('ga', logData);
            };
        },
        [GA_LOCAL_STORAGE_KEY],
        function () {
            if (typeof callback === 'function') {
                callback.call(browser);
            }
        },
    );

    return browser;
};
