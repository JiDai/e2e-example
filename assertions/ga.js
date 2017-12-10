const { deepEqual } = require('../helpers/ObjectHelpers');
const constants = require('../constants');

/**
 * Checks if a Google Analytics call has been process
 * It use the `window.localStorage` to get entries, and empty it after assertion
 *
 * ```
 *    this.demoTest = function (client) {
 *        browser.verify.ga('Event Category', 'event action', 'event label')
 *        browser.assert.ga('Event Category', 'event action', 'event label')
 *    };
 * ```
 *
 * @method ga
 * @param {string} hitType The GA event hitType
 * @param {string} eventCategory The GA event Category
 * @param {string} eventAction The GA event Action
 * @param {string} eventLabel The GA event Label
 * @param {Object} eventOptions The GA event option (nonInteraction...)
 * @param {string} message Message to log
 * @api assertions
 */
module.exports.assertion = function(hitType, eventCategory, eventAction, eventLabel, eventOptions, message) {
    this.expectedObject = Object.assign(
        {
            hitType: hitType ? hitType : null,
            eventCategory: eventCategory ? eventCategory : null,
            eventAction: eventAction ? eventAction : null,
            eventLabel: eventLabel ? eventLabel : null,
        },
        eventOptions,
    );

    /**
     * The message which will be used in the test output and
     * inside the XML reports
     * @type {string}
     */
    this.message = message || `GA Event ${JSON.stringify(hitType)} ${JSON.stringify(eventCategory)} ${JSON.stringify(eventAction)}`;

    /**
     * A value to perform the assertion on. If a function is
     * defined, its result will be used.
     * @type {function|*}
     */
    this.expected = JSON.stringify(this.expectedObject);

    /**
     * The method which performs the actual assertion. It is
     * called with the result of the value method as the argument.
     * @type {function}
     */
    this.pass = function(gaLogEntries) {
        if (constants.getBrowserName(this.api) !== 'chrome') {
            return true;
        }

        return gaLogEntries && this.search(gaLogEntries).length === 1;
    };

    /**
     * The method which returns the value to be used on the
     * assertion. It is called with the result of the command's
     * callback as argument.
     * @type {function}
     */
    this.value = function(logEntries) {
        const matches = this.search(logEntries);
        return matches && matches.length === 1 ? matches : [];
    };

    this.search = function(entries) {
        return entries && entries.filter(ga => deepEqual(ga, this.expectedObject));
    };

    /**
     * Performs a protocol command/action and its result is
     * passed to the value method via the callback argument.
     * @type {function}
     */
    this.command = function(callback) {
        const browser = this;

        if (constants.getBrowserName(browser.api) !== 'chrome') {
            // TODO Why an NOOP
            constants.noop(browser.api, callback);
        } else {
            browser.api.execute(
                function getLocalStorage(storageKey) {
                    return window.localStorage.getItem(storageKey);
                },
                [constants.GA_LOCAL_STORAGE_KEY],
                function(result) {
                    if (typeof callback === 'function') {
                        let analyticsLogEntries = undefined;
                        try {
                            analyticsLogEntries = JSON.parse(result.value);
                        } catch (e) {
                            global.console.error(e);
                        }

                        if (constants.GA_DEBUG) {
                            global.console.log(analyticsLogEntries);
                        }

                        callback.call(browser, analyticsLogEntries);
                    }
                },
            );
        }

        return this;
    };
};
