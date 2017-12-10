
module.exports = {
    before: function (browser) {
        browser.maximizeWindow();
    },

    beforeEach: function (browser) {
        browser.emptyAnalyticsLocalStorage();
    },

    'Page loads with analytics': function (browser) {
    },
};
