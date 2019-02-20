describe("Donation Calculator", function(){
    var calculator, filing_status, desired_credit, committment, tax_brackets;
    beforeEach(function() {
        tax_brackets = {
            "federal" : {
                "single" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "9525",
                        "percentage" : ".1"
                    },
                    {
                        "min_taxable_income" : "9526",
                        "max_taxable_income" : "38700",
                        "percentage" : ".12"
                    },
                    {
                        "min_taxable_income" : "38701",
                        "max_taxable_income" : "82500",
                        "percentage" : ".22"
                    },
                    {
                        "min_taxable_income" : "82501",
                        "max_taxable_income" : "157500",
                        "percentage" : ".24"
                    },
                    {
                        "min_taxable_income" : "157501",
                        "max_taxable_income" : "200000",
                        "percentage" : ".32"
                    },
                    {
                        "min_taxable_income" : "200001",
                        "max_taxable_income" : "500000",
                        "percentage" : ".35"
                    },
                    {
                        "min_taxable_income" : "500001",
                        "percentage" : ".37"
                    }

                ],
                "married" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "19050",
                        "percentage" : ".1"
                    },
                    {
                        "min_taxable_income" : "19051",
                        "max_taxable_income" : "77400",
                        "percentage" : ".12"
                    },
                    {
                        "min_taxable_income" : "77401",
                        "max_taxable_income" : "165000",
                        "percentage" : ".22"
                    },
                    {
                        "min_taxable_income" : "165001",
                        "max_taxable_income" : "315000",
                        "percentage" : ".24"
                    },
                    {
                        "min_taxable_income" : "315001",
                        "max_taxable_income" : "400000",
                        "percentage" : ".32"
                    },
                    {
                        "min_taxable_income" : "400001",
                        "max_taxable_income" : "600000",
                        "percentage" : ".35"
                    },
                    {
                        "min_taxable_income" : "600001",
                        "percentage" : ".37"
                    }
                ]
            },
            "state" : {
                "single" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "1000",
                        "percentage" : ".005"
                    },
                    {
                        "min_taxable_income" : "1001",
                        "max_taxable_income" : "2500",
                        "percentage" : ".01"
                    },
                    {
                        "min_taxable_income" : "2501",
                        "max_taxable_income" : "3750",
                        "percentage" : ".02"
                    },
                    {
                        "min_taxable_income" : "3751",
                        "max_taxable_income" : "4900",
                        "percentage" : ".03"
                    },
                    {
                        "min_taxable_income" : "4901",
                        "max_taxable_income" : "7200",
                        "percentage" : ".04"
                    },
                    {
                        "min_taxable_income" : "7201",
                        "percentage" : ".05"
                    }

                ],
                "married" : [
                    {
                        "min_taxable_income" : "0",
                        "max_taxable_income" : "2000",
                        "percentage" : ".005"
                    },
                    {
                        "min_taxable_income" : "2001",
                        "max_taxable_income" : "5000",
                        "percentage" : ".01"
                    },
                    {
                        "min_taxable_income" : "5001",
                        "max_taxable_income" : "7500",
                        "percentage" : ".02"
                    },
                    {
                        "min_taxable_income" : "7501",
                        "max_taxable_income" : "9800",
                        "percentage" : ".03"
                    },
                    {
                        "min_taxable_income" : "9801",
                        "max_taxable_income" : "12200",
                        "percentage" : ".04"
                    },
                    {
                        "min_taxable_income" : "12201",
                        "percentage" : ".05"
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

    describe("max credit suggestions", function(){
        it("filing single should return a max credit suggestion of $1,000", function(){
            //arrange
            var filing_status = Calculator.FilingStatus.SINGLE;
            var expected_max_credit_suggestion = 1000;

            //act
            var actual_max_credit_suggestion = calculator.get_max_credit_suggestion(filing_status); 

            //assert
            expect(actual_max_credit_suggestion).toEqual(expected_max_credit_suggestion);
        });

        it("filing married should return a max credit suggestion of $2,000", function(){
            //arrange
            var filing_status = Calculator.FilingStatus.MARRIED;
            var expected_max_credit_suggestion = 2000;

            //act
            var actual_max_credit_suggestion = calculator.get_max_credit_suggestion(filing_status); 

            //assert
            expect(actual_max_credit_suggestion).toEqual(expected_max_credit_suggestion);
        });

        it("filing as a pass-through entity should return a max credit suggestion of $100,000", function(){
            //arrange
            var filing_status = Calculator.FilingStatus.MARRIED;
            var is_pass_through = true;
            var expected_max_credit_suggestion = 100000;

            //act
            var actual_max_credit_suggestion = calculator.get_max_credit_suggestion(filing_status, is_pass_through); 

            //assert
            expect(actual_max_credit_suggestion).toEqual(expected_max_credit_suggestion);
        });
    });

    describe("given a state tax bracket", function(){
        it("should return the maximum state tax rate found regardless of filing status", function(){
            //arrange
            var expected_max_state_tax_rate = .05;
            //act
            var actual_max_state_tax_rate = calculator.get_max_state_tax_rate();
            //assert
            expect(actual_max_state_tax_rate).toEqual(expected_max_state_tax_rate); 

        })
    })

    describe("given taxable income and filing status", function(){
        var federal_or_state;
        var filing_status;

        beforeEach(function(){
            filing_status = Calculator.FilingStatus.SINGLE;
        });

        describe("federal benefit calculations", function(){
            beforeEach(function(){
                federal_or_state = Calculator.Government.FEDERAL;
            });

            it("should retrieve federal tax bracket rate below top bracket", function(){
                //arrange
                var taxable_income = 50001;
                var expected_tax_bracket = {"filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : parseFloat(".22")};

                //act
                var actual_tax_bracket = calculator.get_tax_bracket(federal_or_state, taxable_income, filing_status);

                //assert
                expect(actual_tax_bracket).toEqual(expected_tax_bracket);
            });

            it("should retrieve federal tax bracket rate and flat amount for max tax bracket", function(){
                //arrange
                var taxable_income = Number.MAX_SAFE_INTEGER;
                var expected_tax_bracket = {"filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : parseFloat(".37")};

                //act
                var actual_tax_bracket = calculator.get_tax_bracket(federal_or_state, taxable_income, filing_status);

                //assert
                expect(actual_tax_bracket).toEqual(expected_tax_bracket);
            });
        });

        describe("state calculations", function(){
            beforeEach(function(){
                federal_or_state = Calculator.Government.STATE;
            });

            it("should retrieve state tax bracket rate and flat amount below top bracket", function(){
                //arrange
                var taxable_income = 5000;
                var expected_tax_bracket = {"filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : parseFloat(".04")};

                //act
                var actual_tax_bracket = calculator.get_tax_bracket(federal_or_state, taxable_income, filing_status);

                //assert
                expect(actual_tax_bracket).toEqual(expected_tax_bracket);
            });

            it("should retrieve state tax bracket rate and flat amount for max tax bracket", function(){
                //arrange
                var taxable_income = Number.MAX_SAFE_INTEGER;
                var expected_tax_bracket = {"filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : parseFloat(".05")};

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

            it("should calculate a federal tax benefit: (donation amount - desired credit) * bracket percentage", function(){
                //arrange
                var taxable_income = 50000;
                var expected_fed_tax_benefit = (.22 * (donation_amount - desired_credit));

                //act
                actual_fed_tax_benefit = calculator.calculate_federal_tax_benefit(taxable_income, donation_amount, desired_credit, filing_status);

                //assert
                expect(actual_fed_tax_benefit).toEqual(expected_fed_tax_benefit);
            });

            it("should calculate a state tax benefit: (donation amount - desired credit) * bracket %", function(){
                //arrange
                var taxable_income = 4000;
                var expected_state_tax_benefit = (.03 * (donation_amount - desired_credit));

                //act
                actual_state_tax_benefit = calculator.calculate_state_tax_benefit(taxable_income, donation_amount, desired_credit, filing_status);

                //assert
                expect(actual_state_tax_benefit).toEqual(expected_state_tax_benefit);
            });
        });

        describe("filing married", function(){
            var filing_status;

            beforeEach(function(){
                filing_status = Calculator.FilingStatus.MARRIED;
            });

            it("should calculate a federal tax benefit as : (donation amount - desired credit) * bracket %", function(){
                //arrange
                var taxable_income = 50000;
                var expected_fed_tax_benefit = .12 * (donation_amount - desired_credit);

                //act
                actual_fed_tax_benefit = calculator.calculate_federal_tax_benefit(taxable_income, donation_amount, desired_credit, filing_status);

                //assert
                expect(actual_fed_tax_benefit).toEqual(expected_fed_tax_benefit);
            });

            it("should calculate a state tax benefit: (donation amount - desired credit) * bracket % + bracket flat amount", function(){
                //arrange
                var taxable_income = 30000;
                var expected_state_benefit = (donation_amount - desired_credit) * .05;

                //act
                actual_state_tax_benefit = calculator.calculate_state_tax_benefit(taxable_income, donation_amount, desired_credit, filing_status);

                //assert
                expect(actual_state_tax_benefit).toEqual(expected_state_benefit);
            });
        });
    });

    describe("given desired credit, fed and state tax benefits, and suggested donation amount", function(){
        it("should calculate net cost of a donation as: suggested donation - (desired credit + fed tax + state tax)", function(){
            //arrange
            var desired_credit = 2000,
                federal_tax_benefit = 150,
                state_tax_benefit = 78.4,
                donation = 4000,
                expected_cost = 1771;

            //act
            var actual_cost = calculator.calculate_cost_of_donation(desired_credit, federal_tax_benefit, state_tax_benefit, donation);

            //assert
            expect(actual_cost).toEqual(expected_cost);
        });
    });

    describe("given fed and state tax benefits, and suggested donation amount", function(){
        it("should calculate next cost of a donation to a typical, 501(3)(c) org as: suggested donation - (fed tax benefit + max state tax benefit)", function(){
            //arrange
            var federal_tax_benefit = 150,
                state_tax_benefit = 78.4,
                donation = 4000,
                expected_cost = 3771;

            //act
            var actual_cost = calculator.calculate_cost_of_typical_donation(federal_tax_benefit, state_tax_benefit, donation);

            //assert
            expect(actual_cost).toEqual(expected_cost);
        })
    })
});
