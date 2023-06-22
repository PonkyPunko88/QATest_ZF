describe('Modify meeting type and date', () => {
  it('User happy path', () => {
    cy.visit('https://portal-test.zoefin.com/reschedule/66965aa0-9c17-11ed-b52a-53af9ee871d5');
    // Waiting for web renderization
    cy.wait(5000);
    // Choosing 29th day of the actual month
    cy.get('[data-testid="calendar-day-28"]').click();
    // Choosing alternative Time Zone
    cy.get('[alt="Open dropdown arrow"]').click();
    cy.get(':nth-child(4) > .ZUIDropdown__options_single-option_text').click();
    // Choosing a specific hour for the new meeting
    cy.get('[data-testid="24-availability"]').click();
    // Modifying type of meeting
    cy.get('.styles-module_container__buttons__RoTWE > :nth-child(2)').click();
    // Confirming modifications (reschedule)
    cy.get('.ZUIButton--primary').click();
    // Modifying phone number value
    cy.get('[id="phone_number"]').as('input');
    cy.get('@input').invoke('val').then((presetValue) => {
        // Delete set value
        cy.get('@input').clear();
        // Define and input of the new value
        const ranValue =  Math.floor((Math.random()*10000));
        const newValue = (3087480000 + ranValue).toString();
        const typValue = '(308) 748-' + String(ranValue).padStart(4,'0');
        
        cy.get('@input').type(newValue);
    
        // Check that the new walue was set successfully
        cy.get('@input').should('have.value', typValue);
    
        // Check old value is not in the popup
        cy.get('@input').should('not.have.value', presetValue);
      });
    //Confirming modifications 
    cy.get('.styles_confirmationSchedule__cta__CHKbr > .ZUIButton--primary').click();
    // Waiting for confirmation popup
    cy.wait(3000);
    //Checking the popup confirmation
    cy.contains('You can now close this window');
  });
});