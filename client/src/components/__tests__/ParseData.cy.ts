// Test for csv, tsv
import ParseData from "../ParseData.vue"
import { inputTypes, notificationTypes } from "../types/types"

describe('ParseInput', () => {

  it('should understand a csv', () => {
    cy.mount(ParseData, {
        props: {
            accepts: ".csv",
            description: "csv",
            verifyType: inputTypes.DSV
        }
    })
    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.csv")
    cy.get("@input").next().should('have.attr','data-notification').and('contain', notificationTypes.SUCCESS.valueOf())
  })

  it('should understand a tsv', () => {
    cy.mount(ParseData, {
        props: {
            accepts: ".tsv",
            description: "tsv",
            verifyType: inputTypes.DSV
        }
    })
    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.tsv")
    cy.get("@input").next().should('have.attr','data-notification').and('contain', notificationTypes.SUCCESS.valueOf())
  })

  it('should understand multiple formats', () => {
    cy.mount(ParseData, {
        props: {
            accepts: ".csv .tsv",
            description: "csv tsv",
            verifyType: inputTypes.DSV
        }
    })
    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.csv")
    cy.get("@input").next().should('have.attr','data-notification').and('contain', notificationTypes.SUCCESS.valueOf())

    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.tsv")
    cy.get("@input").next().should('have.attr','data-notification').and('contain', notificationTypes.SUCCESS.valueOf())
  })

  it('should fail on unsupported inputs', () => {
    cy.mount(ParseData, {
        props: {
            accepts: ".tsv .csv",
            description: "tsv, csv",
            verifyType: inputTypes.DSV
        }
    })
    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.wrongformat")
    cy.get("@input").next().should('have.attr','data-notification').and('contain', notificationTypes.FAILURE.valueOf())
    })
})
