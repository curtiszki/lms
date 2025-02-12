// Test for csv, tsv
import ParseData from "../ParseData.vue"

describe('ParseInput', () => {

  it('should understand a csv', () => {
    cy.mount(ParseData, {
        props: {
            accepts: ".csv",
            description: "csv"
        }
    })
    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.csv")
    cy.get("@input").next().invoke('css', 'display').should('equal', 'none')
  })

  it('should understand a tsv', () => {
    cy.mount(ParseData, {
        props: {
            accepts: ".tsv",
            description: "tsv"
        }
    })
    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.tsv")
    cy.get("@input").next().invoke('css', 'display').should('equal', 'none')
  })

  it('should understand multiple formats', () => {
    cy.mount(ParseData, {
        props: {
            accepts: ".csv .tsv",
            description: "csv tsv"
        }
    })
    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.csv")
    cy.get("@input").next().invoke('css', 'display').should('equal', 'none')

    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.tsv")
    cy.get("@input").next().invoke('css', 'display').should('equal', 'none')
  })

  it('should fail on unsupported inputs', () => {
    cy.mount(ParseData, {
        props: {
            accepts: ".tsv .csv",
            description: "tsv, csv"
        }
    })
    cy.get('input[type=file]').then(
        input => {
            cy.wrap(input).as("input")
        }
    )
    cy.get("@input").selectFile("cypress/fixtures/test.wrongformat")
    cy.get("@input").next().invoke('css', 'display').should('equal', 'block')
  })
})
