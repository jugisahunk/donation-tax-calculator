const FilingStatus = Object.freeze({
    SINGLE:   "single",
    MARRIED:  "married",
    PASSTHROUGH: "pass-through"
});

const Government = Object.freeze({
    FEDERAL:    "federal",
    STATE:      "state"
});

class Calculator{
    constructor (tax_brackets){
        this.tax_brackets = tax_brackets;
    }

    static get FilingStatus(){ return FilingStatus; }
    static get Government(){ return Government; }

    calculate_cost_of_donation(desired_credit, federal_tax, state_tax, donation){
        return Math.ceil(desired_credit + federal_tax + state_tax - donation);
    }

    calculate_suggested_donation_amount(desired_credit, yearly_committment){
        return yearly_committment == 1 ? Math.ceil(desired_credit / .5) : Math.ceil(desired_credit / .75);
    }

    get_tax_bracket(federal_or_state, taxable_income, filing_status){
        var tax_brackets = this.tax_brackets[federal_or_state][filing_status];

        for(var i=0; i < tax_brackets.length; i++){
            var bracket_data = tax_brackets[i];
            var min_taxable_income = bracket_data.min_taxable_income;
            var max_taxable_income = bracket_data.max_taxable_income;

            if(i == tax_brackets.length -1) { //reached top of bracket
                var percentage = parseFloat(bracket_data.percentage);
                var constant   = parseFloat(bracket_data.constant);

                return { "filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : percentage, "constant" : constant };
            }
            else if(taxable_income >= min_taxable_income && taxable_income <= max_taxable_income){
                var percentage = parseFloat(bracket_data.percentage);
                var constant   = parseFloat(bracket_data.constant);

                return { "filing_status" : filing_status, "federal_or_state" : federal_or_state, "percentage" : percentage, "constant" : constant };
            }
        }
        
    }

    calculate_federal_tax(taxable_income, donation_amount, desired_credit, filing_status) {
        var tax_bracket = this.get_tax_bracket("federal", taxable_income, filing_status);
        return this.__calculate_tax(donation_amount, desired_credit, tax_bracket);
    }

    calculate_state_tax(taxable_income, donation_amount, desired_credit, filing_status) {
        var tax_bracket = this.get_tax_bracket("state", taxable_income, filing_status);
        return this.__calculate_tax(donation_amount, desired_credit, tax_bracket);
    }

    __calculate_tax(donation_amount, desired_credit, tax_bracket){
        if(tax_bracket.filing_status == 3) { //pass-through

        }
        else {
            return ((donation_amount - desired_credit) * tax_bracket.percentage) + tax_bracket.constant;
        }

    }
}
