export class ProductPage {

    addToWishlist() {
        cy.get('button').contains('Pridať do zoznamu želaní').click();
    }
}
