export default class BasePage {

    spinner = 'div .preload-spinner'
    button = 'button'
    zasnubyPage = '.nav__item[href="/engagement-rings"]'
    ringsProducts = '[href="../engagement"]'
    initialPage = '.nav__item[href="/collection/initials"]'

    openMainPage(mainUrl) {
        cy.visit(mainUrl);
    }

    clickElement(selector) {
        cy.get(selector).first().click()
    }

    clickElementByText(selector, text) {
        cy.get(selector).contains(text).click()
    }

    waitForPageLoaded(){
        cy.get(this.spinner, { timeout: 10000 }).should('not.exist');
    }

    checkElementVisibility(selector) {
        cy.get(selector).scrollIntoView().should('be.visible')
    }
}
