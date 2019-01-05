describe("Donation Calculator", function(){
    var calculator, filing_status, desired_credit, committment, tax_brackets;
    beforeEach(function() {
        tax_brackets = {
            "federal" : {
                "single" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "50000",
                        "percentage" : ".08",
                        "constant" : "0"
                    },
                    {
                        "min_taxable_income" : "50001",
                        "max_taxable_income" : "100000",
                        "percentage" : ".11",
                        "constant" : "1000"
                    },
                    {
                        "min_taxable_income" : "100001",
                        "percentage" : ".99",
                        "constant" : "1000000000"
                    }
                ],
                "married" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "50000",
                        "percentage" : ".1",
                        "constant" : "0"
                    },
                    {
                        "min_taxable_income" : "50001",
                        "max_taxable_income" : "100000",
                        "percentage" : ".12",
                        "constant" : "1200"
                    }
                ]
            },
            "state" : {
                "single" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "30000",
                        "percentage" : ".01",
                        "constant" : "100"
                    },
                    {
                        "min_taxable_income" : "30001",
                        "max_taxable_income" : "80000",
                        "percentage" : ".05",
                        "constant" : "120"
                    },
                    {
                        "min_taxable_income" : "80001",
                        "percentage" : ".99",
                        "constant" : "1000000000"
                    }

                ],
                "married" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "30000",
                        "percentage" : ".02",
                        "constant" : "150"
                    },
                    {
                        "min_taxable_income" : "30001",
                        "max_taxable_income" : "80000",
                        "percentage" : ".09",
                        "constant" : "200"
                    }
                ]
            }
        }

        calculator = new Calculator(tax_brackets);
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

    describe("given taxable income and filing status", function(){
        var federal_or_state;
        var filing_status;

        beforeEach(function(){
            filing_status = Calculator.FilingStatus.SINGLE;
        });

        describe("federal calculations", function(){
            beforeEach(function(){
                federal_or_state = "federal";
            });

            it("should retrieve federal tax bracket rate and flat amount below top bracket", function(){
                //arrange
                var taxable_income = 50001;
                var expected_tax_bracket = {"filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : parseFloat(".11"), "constant" : parseFloat("1000")};

                //act
                var actual_tax_bracket = calculator.get_tax_bracket(federal_or_state, taxable_income, filing_status);

                //assert
                expect(actual_tax_bracket).toEqual(expected_tax_bracket);
            });

            it("should retrieve federal tax bracket rate and flat amount for max tax bracket", function(){
                //arrange
                var taxable_income = Number.MAX_SAFE_INTEGER;
                var expected_tax_bracket = {"filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : parseFloat(".99"), "constant" : parseFloat("1000000000")};

                //act
                var actual_tax_bracket = calculator.get_tax_bracket(federal_or_state, taxable_income, filing_status);

                //assert
                expect(actual_tax_bracket).toEqual(expected_tax_bracket);
            });
        });

        describe("state calculations", function(){
            beforeEach(function(){
                federal_or_state = "state";
            });

            it("should retrieve state tax bracket rate and flat amount below top bracket", function(){
                //arrange
                var taxable_income = 30001;
                var expected_tax_bracket = {"filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : parseFloat(".05"), "constant" : parseFloat("120")};

                //act
                var actual_tax_bracket = calculator.get_tax_bracket(federal_or_state, taxable_income, filing_status);

                //assert
                expect(actual_tax_bracket).toEqual(expected_tax_bracket);
            });

            it("should retrieve state tax bracket rate and flat amount for max tax bracket", function(){
                //arrange
                var taxable_income = Number.MAX_SAFE_INTEGER;
                var expected_tax_bracket = {"filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : parseFloat(".99"), "constant" : parseFloat("1000000000")};

                //act
                var actual_tax_bracket = calculator.get_tax_bracket(federal_or_state, taxable_income, filing_status);

                //assert
                expect(actual_tax_bracket).toEqual(expected_tax_bracket);
            });
        });
    });

    describe("given a taxable income, donation amount, desired credit", function(){
        var donation_amount, desired_credit;

        beforeEach(function(){
            donation_amount = 1000;
            desired_credit = 500;
        });

        describe("filing single", function(){
            var filing_status;

            beforeEach(function(){
                filing_status = Calculator.FilingStatus.SINGLE;
            });

            it("should calculate a federal tax amount as : (donation amount - desired credit) * bracket % + bracket flat amount", function(){
                //arrange
                var taxable_income = 50000;
                var expected_fed_tax = 40;

                //act
                actual_fed_tax = calculator.calculate_federal_tax(taxable_income, donation_amount, desired_credit, filing_status);

                //assert
                expect(actual_fed_tax).toEqual(expected_fed_tax);
            });

            it("should calculate a state tax amount as : (donation amount - desired credit) * bracket % + bracket flat amount", function(){
                //arrange
                var taxable_income = 30000;
                var expected_state_tax = 105;

                //act
                actual_state_tax = calculator.calculate_state_tax(taxable_income, donation_amount, desired_credit, filing_status);

                //assert
                expect(actual_state_tax).toEqual(expected_state_tax);
            });
        });

        describe("filing married", function(){
            var filing_status;

            beforeEach(function(){
                filing_status = Calculator.FilingStatus.MARRIED;
            });

            it("should calculate a federal tax amount as : (donation amount - desired credit) * bracket % + bracket flat amount", function(){
                //arrange
                var taxable_income = 50000;
                var expected_fed_tax = 50;

                //act
                actual_fed_tax = calculator.calculate_federal_tax(taxable_income, donation_amount, desired_credit, filing_status);

                //assert
                expect(actual_fed_tax).toEqual(expected_fed_tax);
            });

            it("should calculate a state tax amount as : (donation amount - desired credit) * bracket % + bracket flat amount", function(){
                //arrange
                var taxable_income = 30000;
                var expected_state_tax = 160;

                //act
                actual_state_tax = calculator.calculate_state_tax(taxable_income, donation_amount, desired_credit, filing_status);

                //assert
                expect(actual_state_tax).toEqual(expected_state_tax);
            });
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

    //TODO: create federal / state enum
    //TODO: create pass-through tests
});
