import constants from '../../../fixtures/constants.json'
import BasePage from "../basePage";

export class ZasnubyPage extends BasePage{

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

        // Check collapsed items
        const shortArray = array.slice(0,3)
        shortArray.forEach((item) =>
            cy.get(this.filterLabel).contains(item).should('be.visible')
        )

        if(array.length > 3) {
            // Expand and check all items
            this.clickElementByText(this.button, constants.showAll)
            array.forEach((item) =>
                cy.get(this.filterLabel).contains(item).should('be.visible')
            )}
    }
}
