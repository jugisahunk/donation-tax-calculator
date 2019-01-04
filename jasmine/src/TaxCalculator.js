class Calculator{
    constructor (tax_brackets){
        this.tax_brackets = tax_brackets;
    }

    calculate_federal_tax(filing_status, taxable_income){
        if(filing_status == 1) { //filing as single
            return this._calculate_tax(taxable_income, this.tax_brackets.federal.single);
        }
        else if(filing_status == 2) { //filing as married
            var married_brackets = this.tax_brackets.federal.married;
            return this._calculate_tax(taxable_income, married_brackets);
        }
    }

    calculate_state_tax(filing_status, taxable_income){
        if(filing_status == 1){
            var single_brackets = this.tax_brackets.state.single;
            return this._calculate_tax(taxable_income, single_brackets);
        }
        else if(filing_status == 2){
            var married_brackets = this.tax_brackets.state.married;
            return this._calculate_tax(taxable_income, married_brackets);
        }
    }

    _calculate_tax(taxable_income, tax_brackets){
        for(var i=0; i < tax_brackets.length; i++){
            var bracket_data = tax_brackets[i];
            var min_taxable_income = bracket_data.min_taxable_income;
            var max_taxable_income = bracket_data.max_taxable_income;

            if(taxable_income >= min_taxable_income && taxable_income <= max_taxable_income){
                var percentage = parseFloat(bracket_data.percentage);
                var constant   = parseFloat(bracket_data.constant);

                return taxable_income * percentage + constant;
            }
        }
    }

    calculate_cost_of_donation(desired_credit, federal_tax, state_tax, donation){
        return Math.ceil(desired_credit + federal_tax + state_tax - donation);
    }

    calculate_suggested_donation_amount(desired_credit, yearly_committment){
        return yearly_committment == 1 ? Math.ceil(desired_credit / .5) : Math.ceil(desired_credit / .75);
    }

}
