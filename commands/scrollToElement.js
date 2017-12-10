/**
 * Scroll to an element
 *
 * ```
 * this.demoTest = function (browser) {
 *   browser.scrollToElement('#my-element', function () {
 *       // Do some stuff after scroll
 *   })
 * };
 * ```
 *
 * @method scrollToElement
 * @param {String} selector Dom selector.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */
module.exports.command = function(selector, callback) {
    const browser = this;

    browser.execute(
        function(selector) {
            window.document.querySelector(selector).scrollIntoView(true);
        },
        [selector],
        function() {
            if (typeof callback === 'function') {
                callback.call(browser);
            }
        },
    );

    return browser;
};
