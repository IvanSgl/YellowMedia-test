export class InitialPage {

    productItem = '[data-e2e-link="product-name"]'

    openProductByName(name) {
        cy.get(this.productItem).contains(name).click();
    }
}
