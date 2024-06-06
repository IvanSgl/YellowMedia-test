import BasePage from "../../page-objects/basePage";
import {InitialPage} from "../../page-objects/initial-page/initialPage";
import constants from '../../../fixtures/constants.json'

const basePage = new BasePage();
const initialPage = new InitialPage();

describe('Initial page', () => {
    beforeEach('Intercept requests', () => {
        // Intercept
        cy.intercept('GET', '/api/v1/products/jednoduchynahrdelnikspismenomnaretiazke').as('abracadabraRequest');
        cy.intercept('GET', '/api/v1/blocks/product-question-form').as('questionFormRequest');
        cy.intercept('GET', '/api/v1/blocks/product-ship-return').as('shipReturnRequest');
        cy.intercept('GET', '/api/v1/blocks/product-ask-question').as('askQuestionRequest');
        cy.intercept('POST', '/api/v1/wishlists').as('wishlistsRequest');
    });

    it('should check responses and filters on "Zasnuby" page', () => {
        // Open Initial page
        basePage.clickElement(basePage.initialPage);

        // Open product page
        basePage.clickElementByText(initialPage.productItem, constants.productName);

        // Check responses
        cy.wait('@abracadabraRequest').its('response.statusCode').should('equal', 200);
        cy.get('@abracadabraRequest').should(({request, response}) => {
            expect(request.method).to.equal('GET')
            expect(response.statusCode).to.equal(200)

            /**
             * Checked part of the response due to some requests have a massive response, and it could waste runtime and machine performance
             * It could be extended if it needs to check some special params in response
             */
            expect(response.body).to.have.property('data');
            expect(response.body.data.slug).to.equal('jednoduchynahrdelnikspismenomnaretiazke');
            expect(response.body.data.id).to.equal(7);
            expect(response.body.data.sort_order).to.equal(-93);
            expect(response.body.data).to.have.property('materials');
            expect(response.body.data).to.have.property('translations');
        });

        cy.wait('@questionFormRequest').its('response.statusCode').should('equal', 200);
        cy.get('@questionFormRequest').should(({request, response}) => {
            expect(request.method).to.equal('GET')
            expect(response.statusCode).to.equal(200)

            /**
             * Checked part of the response due to some requests have a massive response, and it could waste runtime and machine performance
             * It could be extended if it needs to check some special params in response
             */
            expect(response.body).to.have.property('data');
            expect(response.body.data.name).to.equal('product-question-form');
            expect(response.body.data).to.have.property('type');
            expect(response.body.data).to.have.property('translations');
        });

        cy.wait('@shipReturnRequest').its('response.statusCode').should('equal', 200);
        cy.get('@shipReturnRequest').should(({request, response}) => {
            expect(request.method).to.equal('GET')
            expect(response.statusCode).to.equal(200)

            /**
             * Checked part of the response due to some requests have a massive response, and it could waste runtime and machine performance
             * It could be extended if it needs to check some special params in response
             */
            expect(response.body).to.have.property('data');
            expect(response.body.data.name).to.equal('product-ship-return');
            expect(response.body.data).to.have.property('type');
            expect(response.body.data).to.have.property('translations');
        });

        cy.wait('@askQuestionRequest').its('response.statusCode').should('equal', 200);
        cy.get('@askQuestionRequest').should(({request, response}) => {
            expect(request.method).to.equal('GET')
            expect(response.statusCode).to.equal(200)

            /**
             * Checked part of the response due to some requests have a massive response, and it could waste runtime and machine performance
             * It could be extended if it needs to check some special params in response
             */
            expect(response.body).to.have.property('data');
            expect(response.body.data.name).to.equal('product-ask-question');
            expect(response.body.data).to.have.property('type');
            expect(response.body.data).to.have.property('translations');
        });

        // Add to wishlist
        basePage.clickElementByText(basePage.button, constants.addToWishlist);

        /**
         * I couldn't find a button to add to the comparison list, it looks like that feature has been removed.
         */

        // Check response
        cy.wait('@wishlistsRequest').its('response.statusCode').should('equal', 200);
        cy.get('@wishlistsRequest').should(({request, response}) => {
            expect(request.method).to.equal('POST')
            expect(response.statusCode).to.equal(200)

            /**
             * Checked part of the response due to some requests have a massive response, and it could waste runtime and machine performance
             * It could be extended if it needs to check some special params in response
             */
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('unique_id');
            expect(response.body.data).to.have.property('baggage');
        });
    });
});
