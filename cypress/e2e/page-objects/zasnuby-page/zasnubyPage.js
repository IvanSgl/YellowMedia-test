import constants from '../../../fixtures/constants.json'

export class ZasnubyPage {

    filtersColumn = '.desktop_filters'
    filterTitle = '.desktop_filters .widget__title'
    filterLabel = '.widget__collections label'

    checkFiltersTitles() {
        constants.zasnubyFiltes.forEach((filter) =>
            cy.get(this.filterTitle).contains(filter).should('be.visible')
        )
    }

    checkFilterByTitle(title, array) {
        cy.get(this.filterTitle).contains(title).click();

        // TODO: need to check length
        // check that displays only first three items
        // cy.get(this.filterLabel).should('be.visible').and('have.length', 3);

        // Check collapsed items
        const shortArray = array.slice(0,3)
        shortArray.forEach((item) =>
            cy.get(this.filterLabel).contains(item).should('be.visible')
        )

        if(array.length > 3) {
            // Expand and check all items
            cy.get('button').contains('Zobraziť viac').click();
            array.forEach((item) =>
                cy.get(this.filterLabel).contains(item).should('be.visible')
            )}
    }


}