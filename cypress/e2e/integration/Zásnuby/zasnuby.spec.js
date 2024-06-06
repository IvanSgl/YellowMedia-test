import BasePage from "../../page-objects/basePage";
import {ZasnubyPage} from "../../page-objects/zasnuby-page/zasnubyPage";
import constants from '../../../fixtures/constants.json'

const basePage = new BasePage();
const zasnubyPage = new ZasnubyPage();

describe('Zasnuby page', () => {
    beforeEach('Intercept requests', () => {
        // Intercept
        cy.intercept('GET', '/api/v1/pages/engagement-rings').as('engagementRingsRequest');
        cy.intercept('GET', '/api/v1/pages/engagement').as('engagementRequest');
    });

    it('should check responses and filters on "Zasnuby" page', () => {
        // Open Zasnuby page
        basePage.clickElement(basePage.zasnubyPage);

        // Check responses
        cy.wait('@engagementRingsRequest').its('response.statusCode').should('equal', 200);
        cy.get('@engagementRingsRequest').should(({ request, response }) => {
            expect(request.method).to.equal('GET')
            expect(response.statusCode).to.equal(200)

            /**
             * Checked part of the response due to some requests have a massive response, and it could waste runtime and machine performance
             * It could be extended if it needs to check some special params in response
             */
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('slug');
            expect(response.body.data).to.have.property('blocks');
        });

        // Open page with rings
        basePage.clickElement(basePage.ringsProducts);
        basePage.waitForPageLoaded();

        // Check responses
        cy.wait('@engagementRequest').its('response.statusCode').should('equal', 200);
        cy.get('@engagementRequest').should(({request, response}) => {
            expect(request.method).to.equal('GET')
            expect(response.statusCode).to.equal(200)

            /**
             * Checked part of the response due to some requests have a massive response, and it could waste runtime and machine performance
             * It could be extended if it needs to check some special params in response
             */
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('slug');
            expect(response.body.data).to.have.property('blocks');
            expect(response.body.data).to.have.property('translations');
        });

        // Check filters
        basePage.checkElementVisibility(zasnubyPage.filtersColumn);
        zasnubyPage.checkFiltersTitles();
        zasnubyPage.checkFilterByTitle(constants.zasnubyFiltes[1], constants.kategoria);
        zasnubyPage.checkFilterByTitle(constants.zasnubyFiltes[2], constants.kovy);
        zasnubyPage.checkFilterByTitle(constants.zasnubyFiltes[3], constants.tvarPrstena);
        zasnubyPage.checkFilterByTitle(constants.zasnubyFiltes[4], constants.tvarKamenov);
        zasnubyPage.checkFilterByTitle(constants.zasnubyFiltes[5], constants.stylyHlavyPrstena);
        zasnubyPage.checkFilterByTitle(constants.zasnubyFiltes[6], constants.stylOsadeniaKamena);
    })
})
