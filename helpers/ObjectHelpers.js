/**
 * Check if two items are deeply equals.
 * @param  {*} o1 First item
 * @param  {*} o2 Second item
 * @return {Boolean} True is they are deeply equal, false otherwise
 */
function deepEqual(o1, o2) {
    if (o1 === o2) {
        return true;
    }

    if (typeof o1 !== typeof o2) {
        return false;
    }

    const typeO1 = typeof o1;

    if (typeO1 === 'number' && isNaN(o1) && isNaN(o2)) {
        return true;
    }

    if (typeO1 === 'undefined' || (typeO1 === 'object' && o1 === null) || typeO1 === 'null' || typeO1 === 'string' || typeO1 === 'number' || typeO1 === 'boolean') {
        return false;
    }

    if (o1 instanceof Date && o2 instanceof Date) {
        return o1.getTime() === o2.getTime();
    }

    if (Array.isArray(o1)) {
        if (o1.length !== o2.length) {
            return false;
        }

        for (let i = 0, size = o1.length; i < size; i += 1) {
            if (!deepEqual(o1[i], o2[i])) {
                return false;
            }
        }
    }

    const o1Keys = Object.keys(o1).sort();
    const o2Keys = Object.keys(o2).sort();

    if (o1Keys.join(',') !== o2Keys.join(',')) {
        return false;
    }

    for (let i = 0, size = o1Keys.length; i < size; i += 1) {
        const key = o1Keys[i];
        if (!deepEqual(o1[key], o2[key])) {
            return false;
        }
    }
    return true;
}

/**
 * Retun the browser name from Browser NightWatch object
 * @param {Object} browser
 * @return {String}
 */
function getBrowserName(browser) {
    if (typeof browser.capabilities.browserName !== 'undefined') {
        return browser.capabilities.browserName;
    } else if (browser.options && browser.options.options && browser.options.desiredCapabilities && typeof browser.options.desiredCapabilities.browserName !== 'undefined') {
        return browser.options.desiredCapabilities.browserName;
    }
    return 'unknown';
}

function noop(browser, callback) {
    browser.execute(() => null, [], function () {
        if (typeof callback === 'function') {
            callback.call(browser, []);
        }
    })
}

module.exports = {
    deepEqual,
    getBrowserName,
    noop,
};
