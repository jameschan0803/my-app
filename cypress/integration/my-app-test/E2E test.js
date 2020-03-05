describe("E2E test:visit the app", function() {
  it("test case 1:visit the app", function() {
    //open the app
    cy.visit("http://localhost:3000");

    //the main page is display properly
    cy.contains("Would you like to view some lovely dog pictures?").wait(5);

    //after API call, the breed select  and
    cy.get("#breedList")
      .should("be.visible") // should be visible
      .should("not.have.value") //should not have value
      .find("option")
      .within(() => {
        //has one breed option african, akita, australian
        //load the api successfully
        cy.contains("african");
        cy.contains("akita");
        cy.contains("australian");
      });

    //the sub breed select droplist should be not visible
    cy.get("#subbreedList").should("not.be.visible");
  });

  it("test case 2: select breed option in dropdownlist", function() {
    //after loading , select "african" from select option
    cy.get("#breedList")
      .select("african")
      .should("have.value", "african");

    //loader will appear during API call
    //no idea how to keep cypress wait until an element disppear, so assuming wait for 10s here
    cy.get("#loader")
      .should("be.visible")
      .wait(10);

    //after 10s, the loader will be gone
    cy.get("#loader").should("not.be.visible");

    //as breed "african" doesnot have subbreed, sub breedList should not be visible
    cy.get("#subbreedList").should("not.be.visible");

    cy.get(".card")
      .find("img")
      .should($pics => {
        expect($pics).length > 100; // img number more than 100
      })
      .wait(5);
  });

  it("test case 3: select breed and sub breed in dropdownlist", function() {
    //after loading , select "australian" from select option
    cy.get("#breedList")
      .select("australian")
      .should("have.value", "australian");

    cy.get("#loader")
      .should("be.visible")
      .wait(10);
    cy.get("#loader").should("not.be.visible");

    //select sub breed "australian"
    cy.get("#subbreedList")
      .should("be.visible") //sub breedList should  be visible
      .and("not.have.value") //should not have selected value
      .find("option")
      .should($p => {
        expect($p).to.have.length(2); // has 2 options in sub breed droplist
        expect($p.eq(1)).to.have.value("shepherd"); // one is select subbreed , the other is shepherd
      });

    cy.get(".card")
      .find("img")
      .should($pics => {
        expect($pics).length(1); // img number more than 100
      });
  });  

    it("test case 4: deep-link to some certain breed / subbreed", function() {
      
      //visit hound breed
      cy.visit("http://localhost:3000/breed/hound");
      
      //loader will show
      cy.get("#loader")
      .should("be.visible")
      .wait(10);
    cy.get("#loader").should("not.be.visible");

    //breed name display on page
    cy.get(".data")
    . contains("hound")

    //its pic and show as well
    cy.get("#image-container")
    .find("img")
    .should($p2 => {
      expect($p2).to.have.length(1); // img number more than 100
    })
    .wait(5);
    


    //visit hound breed , subreed afghan
    cy.visit("http://localhost:3000/breed/hound/afghan");
      
    //loader will show
    cy.get("#loader")
    .should("be.visible")
    .wait(10);
    cy.get("#loader").should("not.be.visible");

  //breed name display on page
  cy.get(".data")
  . contains("hound")
  
  cy.get(".data")
  . contains("afghan")

  //its pic and show as well
  cy.get("#image-container")
  .find("img")
  .should($p2 => {
    expect($p2).to.have.length(1); // img number more than 100
  })

     
  }); 
});
