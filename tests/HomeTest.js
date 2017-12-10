module.exports = {
    before: function (browser) {
        browser.maximizeWindow();

        const Home = browser.page.HomePage();
        Home.navigate().waitForElementVisible('@purchaseCta', 5000, true);
        browser.mockGA();
    },

    beforeEach: function (browser) {
        // Clean local storage to empty analytics log entries
        browser.emptyAnalyticsLocalStorage();
    },

    'click on purchase button': function (browser) {
        const Home = browser.page.HomePage();
        Home.click('@purchaseCta');
        browser.assert.ga('event', 'Home', 'purchase', 'purchase-hero-button');
    },

    'click on contact button': function (browser) {
        const Home = browser.page.HomePage();
        browser.scrollToElement(Home.elements.contacUsCta.selector);
        Home.click('@contacUsCta');
        browser.assert.ga('event', 'Home', 'contact-us', 'first-contact-us-button');
    },

    after: browser => browser.end(),
};
