module.exports = {
    url: `${process.env.E2E_URL}/`,
    commands: [],
    // Elements present in page
    // Prefere use of [data-*] CSS selectors over class selector
    // to prevent breaks by style changes
    // You can use IDs but an ID must be unique on page
    elements: {
        purchaseCta: '[data-purchase-cta]',
        contacUsCta: '[data-contact-us-cta]',
    },
    sections: {},
};
