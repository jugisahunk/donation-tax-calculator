describe("Donation Calculator", function(){
    var calculator, filing_status, desired_credit, committment;
    beforeEach(function() {
        calculator = new Calculator();
    });

    it("should calculate cost of donation", function(){
        //arrange
        //credit + fed tax + state tax - donation
        var 
            desired_credit = 5000,
            federal_tax = 150,
            state_tax = 78,
            donation = 6000,
            expected_cost = -772;

        //act
        var actual_cost = calculator.calculate_donation_amount(desired_credit, federal_tax, state_tax, donation);
        
        //assert
        expect(expected_cost).toEqual(actual_cost);
    });

    xit("should calculate a necessary donation amount based on desired credit amount", function(){
        //arrange

        //act
        //assert
    });
});
