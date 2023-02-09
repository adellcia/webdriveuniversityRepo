let baseUrl = ('https://webdriveruniversity.com/')

var firstName = 'Brad'
var lastName = 'Pitt'
var emailAddress = 'brad.pitt@gmail.com'
var Comments = 'Hello, how to get to the station?'


describe('template spec', () => {
  it.only('1', () => {
    cy.visit(baseUrl)
    cy.get('#contact-us').invoke("removeAttr", "target").click()


    cy.get('[placeholder="First Name"]').type(firstName)
    cy.get('[placeholder="Last Name"]').type(lastName)
    cy.get('[placeholder="Email Address"]').type(emailAddress)
    cy.get('[placeholder="Comments"]').type(Comments)
    cy.get('input[type="reset"]').click()
    cy.get('input[placeholder], textarea[placeholder="Comments"]')
    .should('have.value', "")
    
    })
    
  it('2', () => {
    cy.visit(baseUrl)
    cy.get('#contact-us').invoke("removeAttr", "target").click()
    
    cy.get('[placeholder="First Name"]').type(firstName)
    cy.get('[placeholder="Last Name"]').type(lastName)
    cy.get('[placeholder="Email Address"]').type(emailAddress)


    cy.get('input[type="submit"]').click()
    cy.url().should('eq', 'https://webdriveruniversity.com/Contact-Us/contact_us.php')
    cy.get('body').should('contain', 'Error: all fields are required')

    })

  it('3', () => {
    cy.visit(baseUrl)
    cy.get('#contact-us').invoke("removeAttr", "target").click()
    
    cy.get('[placeholder="First Name"]').type(firstName)
    cy.get('[placeholder="Last Name"]').type(lastName)
    cy.get('[placeholder="Email Address"]').type('brad.pitt.gmail.com')
    cy.get('[placeholder="Comments"]').type(Comments)

    cy.get('input[type="submit"]').click()
    cy.get('body').should('contain', 'Error: Invalid email address')


    })
    it('4', () => {
      cy.visit(baseUrl)
      cy.get('#contact-us').invoke("removeAttr", "target").click()
      
      cy.get('[placeholder="First Name"]').type(firstName)
      cy.get('[placeholder="Last Name"]').type(lastName)
      cy.get('[placeholder="Email Address"]').type(emailAddress)
      cy.get('[placeholder="Comments"]').type(Comments)
      cy.get('input[type="submit"]').click()

      cy.url().should('eq', 'https://webdriveruniversity.com/Contact-Us/contact-form-thank-you.html')
      cy.get('body').should('contain', 'Thank You for your Message!')
    
})


it('5', () => {
  cy.visit(baseUrl)
  cy.get('#dropdown-checkboxes-radiobuttons').invoke("removeAttr", "target").click()

  cy.get('.thumbnail').first().should('contain', 'Dropdown Menu(s)').find('.dropdown-menu-lists').first()
  .select('JAVA').should('have.value', 'java')
  .select('C#').should('have.value', 'c#')
  .select('Python').should('have.value', 'python')
  .select('SQL').should('have.value', 'sql')

  cy.get('.thumbnail').first().should('contain', 'Dropdown Menu(s)').find('.dropdown-menu-lists').eq(1)
  .select('Eclipse').should('have.value', 'eclipse')
  .select('Maven').should('have.value', 'maven')
  .select('TestNG').should('have.value', 'testng')
  .select('JUnit').should('have.value', 'junit')

  cy.get('.thumbnail').first().should('contain', 'Dropdown Menu(s)').find('.dropdown-menu-lists').eq(2)
  .select('HTML').should('have.value', 'html')
  .select('CSS').should('have.value', 'css')
  .select('JavaScript').should('have.value', 'javascript')
  .select('JQuery').should('have.value', 'jquery')
      
  })
it('6', () => {
  cy.visit(baseUrl)
  cy.get('#dropdown-checkboxes-radiobuttons').invoke("removeAttr", "target").click()

  cy.get('.thumbnail').eq(1).should('contain', 'Checkboxe(s)')
  .find('input','[type="checkbox"]')
  .check()
  .should('be.checked')

  
  cy.get('.thumbnail').eq(1).should('contain', 'Checkboxe(s)').find('input','[type="checkbox"]').then ( input => {
    cy.wrap(input).eq(1)
    .uncheck().should('not.be.checked')
    cy.wrap(input).eq(3)
    .uncheck().should('not.be.checked')
  })  
  })
it('7', () => {
  cy.visit(baseUrl)
  cy.get('#dropdown-checkboxes-radiobuttons').invoke("removeAttr", "target").click()

  cy.get('.thumbnail').eq(2).should('contain', 'Radio Button(s)').find('input','[type="radiobutton"]').then (radiobutton => {
    cy.wrap(radiobutton)
    .first()
    .check()
    .should('be.checked')

    cy.wrap(radiobutton)
    .eq(1)
    .check()
    .should('be.checked')

    cy.wrap(radiobutton)
    .eq(2)
    .check()
    .should('be.checked')

    cy.wrap(radiobutton)
    .eq(3)
    .check()
    .should('be.checked')

    cy.wrap(radiobutton)
    .eq(4)
    .check()
    .should('be.checked')
  })
  })
it('8', () => {
  cy.visit(baseUrl)
  cy.get('#datepicker').invoke("removeAttr", "target").click()

  let date = new Date()
  date.setDate(date.getDate() + 2)
  let futureDay = date.getDate('default')
  let futureMonth = date.toLocaleString('default', {month: 'long'})
  let assertMonth = date.toLocaleString('default', {month: '2-digit'})
  let dateAssert = assertMonth+'-'+futureDay+'-'+date.getFullYear()

  cy.get('#datepicker').find('input').then( input => {
    cy.wrap(input).click()
    selectDayFromCurrent()
    function selectDayFromCurrent(){
      cy.get('.datepicker-switch').invoke('prop', 'textContent').then( dateAttribute => {
          if(!dateAttribute.includes(futureMonth)) {
            cy.get('.next').eq(0).click()
            selectDayFromCurrent()
          } else {
            cy.get('.day').contains(futureDay).click()
          }
    })    
}
   
cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    })
  })


it('9', () => {
  cy.visit(baseUrl)
  cy.get('#autocomplete-textfield').invoke("removeAttr", "target").click()

cy.get('section').find('form').find('div', '.autocomplete').click().type('chi')
cy.get('#myInputautocomplete-list').find('div').eq(1).click()
cy.get('section').find('form').find('input').first().then( input => {
  cy.wrap(input)
  .should('have.value', 'Chips')
})
})

it('10', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  }) 
  cy.visit(baseUrl)
  cy.get('#ajax-loader').invoke("removeAttr", "target").click().wait(1000)
  cy.get('#button1').click()
  cy.get('.modal-content').find('.modal-body').should('contain', 'The waiting game can be a tricky one; this exercise will hopefully improve your understandings of the various types of waits.')

})
})
