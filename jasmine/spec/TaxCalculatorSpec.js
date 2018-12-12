describe("Donation Calculator", function(){
    var calculator, filing_status, desired_credit, committment;
    beforeEach(function() {
        calculator = new Calculator();
    });

    describe("when desired credit, fed and state tax brackets and donation amount are known", function(){
        it("should calculate net cost of donation", function(){
            //arrange
            //credit + fed tax + state tax - donation
            var 
                desired_credit = 5000,
                federal_tax = 150,
                state_tax = 78.4,
                donation = 6000,
                expected_cost = -771;

            //act
            var actual_cost = calculator.calculate_cost_of_donation(desired_credit, federal_tax, state_tax, donation);
            
            //assert
            expect(expected_cost).toEqual(actual_cost);
        });
    });

    describe("when committment is for 1 year", function(){
        it("should calculate a suggested donation amount twice the credit amount desired.", function(){
            //arrange
            var desired_credit = 1000, yearly_committment = 1;
            var expected_donation_amount = 2000;

            //act
            var actual_donation_amount = calculator.calculate_suggested_donation_amount(desired_credit, yearly_committment);
            //assert
            expect(expected_donation_amount).toEqual(actual_donation_amount);
        });
    });

    describe("when committment is for 2 years", function(){
        it("should calculate a suggested donation amount 4/3rds the credit amount desired.", function(){
            //arrange
            var desired_credit = 1000, yearly_committment = 2;
            var expected_donation_amount = 1334;

            //act
            var actual_donation_amount = calculator.calculate_suggested_donation_amount(desired_credit, yearly_committment);
            //assert
            expect(expected_donation_amount).toEqual(actual_donation_amount);
        });
    });

});
