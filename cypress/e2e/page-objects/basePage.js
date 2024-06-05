export default class BasePage {

    spinner = 'div .preload-spinner'
    zasnubyPage = '.nav__item[href="/engagement-rings"]'
    ringsProducts = '[href="../engagement"]'
    initialPAge = '.nav__item[href="/collection/initials"]'

    openMainPage(mainUrl) {
        cy.visit(mainUrl);
    }

    waitForPageLoaded(){
        cy.get(this.spinner, { timeout: 10000 }).should('not.exist');
    }

    openZasnubyPage() {
        cy.get(this.zasnubyPage).click();
    }

    openRingsProducts() {
        cy.get(this.ringsProducts).first().click();
    }

    openInitialPage() {
        cy.get(this.initialPAge).click();
    }


    checkElementVisibility(selector) {
        cy.get(selector).scrollIntoView().should('be.visible')
    }

}
