describe("Donation Calculator", function(){
    var calculator, filing_status, desired_credit, committment, tax_brackets;
    beforeEach(function() {
        tax_brackets = {
            "federal" : {
                "single" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "10",
                        "percentage" : ".08",
                        "constant" : "0"
                    },
                    {
                        "min_taxable_income" : "11",
                        "max_taxable_income" : "50",
                        "percentage" : ".11",
                        "constant" : "4"
                    }
                ],
                "married" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "10",
                        "percentage" : ".1",
                        "constant" : "0"
                    },
                    {
                        "min_taxable_income" : "11",
                        "max_taxable_income" : "50",
                        "percentage" : ".12",
                        "constant" : "6"
                    }
                ]
            },
            "state" : {
                "single" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "10",
                        "percentage" : ".01",
                        "constant" : "0"
                    },
                    {
                        "min_taxable_income" : "11",
                        "max_taxable_income" : "50",
                        "percentage" : ".05",
                        "constant" : "2"
                    }
                ],
                "married" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "10",
                        "percentage" : ".02",
                        "constant" : "0"
                    },
                    {
                        "min_taxable_income" : "11",
                        "max_taxable_income" : "50",
                        "percentage" : ".09",
                        "constant" : "4.5"
                    }
                ]
            }
        }

        calculator = new Calculator(tax_brackets);
    });

    describe("given a taxable income and filing as 'single'", function(){
        var filing_status, taxable_income;

        beforeEach(function(){
            filing_status = 1;
            taxable_income = 5;
        });

        it("should calculate a federal tax amount (bracket % * taxable income) + bracket flat amount", function(){
            //arrange
            var expected_fed_tax = .4;

            //act
            actual_fed_tax = calculator.calculate_federal_tax(filing_status, taxable_income);

            //assert
            expect(actual_fed_tax).toEqual(expected_fed_tax);
        });

        it("should calculate a state tax amount (bracket % * taxable income) + bracket flat amount", function(){
            //arrange
            var expected_state_tax = .05;

            //act
            actual_state_tax = calculator.calculate_state_tax(filing_status, taxable_income);

            //assert
            expect(actual_state_tax).toEqual(expected_state_tax);
        });
    });

    describe("given a taxable income and filing as 'married'", function(){
        var filing_status, taxable_income;

        beforeEach(function(){
            filing_status = 2;
                taxable_income = 35;
        });

        it("should calculate a federal tax amount (bracket % * taxable income) + bracket flat amount", function(){
            //arrange
            var expected_fed_tax = 10.2;

            //act
            actual_fed_tax = calculator.calculate_federal_tax(filing_status, taxable_income);

            //assert
            expect(actual_fed_tax).toEqual(expected_fed_tax);
        });

        it("should calculate a state tax amount (bracket % * taxable income) + bracket flat amount", function(){
            //arrange
            var expected_state_tax = 7.65;

            //act
            actual_state_tax = calculator.calculate_state_tax(filing_status, taxable_income);

            //assert
            expect(actual_state_tax).toEqual(expected_state_tax);
        });
    });

    describe("given donation commitment of 1 year", function(){
        it("should calculate a suggested donation amount twice the credit amount desired.", function(){
            //arrange
            var desired_credit = 1000, yearly_committment = 1;
            var expected_donation_amount = 2000;

            //act
            var actual_donation_amount = calculator.calculate_suggested_donation_amount(desired_credit, yearly_committment);
            //assert
            expect(actual_donation_amount).toEqual(expected_donation_amount);
        });
    });

    describe("given donation commitment of 2 years", function(){
        it("should calculate a suggested donation amount 4/3rds the credit amount desired.", function(){
            //arrange
            var desired_credit = 1000, yearly_committment = 2;
            var expected_donation_amount = 1334;

            //act
            var actual_donation_amount = calculator.calculate_suggested_donation_amount(desired_credit, yearly_committment);
            //assert
            expect(actual_donation_amount).toEqual(expected_donation_amount);
        });
    });

    describe("given desired credit, fed and state tax amounts, and suggested donation amount", function(){
        it("should calculate net cost of donation as desired credit + fed tax + state tax - suggested donation", function(){
            //arrange
            //credit + fed tax + state tax - donation
            var desired_credit = 5000,
                federal_tax = 150,
                state_tax = 78.4,
                donation = 6000,
                expected_cost = -771;

            //act
            var actual_cost = calculator.calculate_cost_of_donation(desired_credit, federal_tax, state_tax, donation);

            //assert
            expect(actual_cost).toEqual(expected_cost);
        });
    });
    /*
     *
            var desired_credit = 5000,
                federal_tax = 150,
                state_tax = 78.4,
                donation = 6000,
     */

    //TODO: create failure test if invalid donation value is used
    //TODO: create failure test if invalid state tax value is used
    //TODO: create failure test if invalid federal tax value is used
    //TODO: create failure test if invalid desired credit value is used
    //TODO: create failure test if invalid yearly commitment value is used
    //TODO: create failure test if invalid commitment value is used
    //TODO: create failure test if invalid filing status is used
    //TODO: create failure test if invalid taxable amount is used
    //TODO: create state tax tests to match federal
});
