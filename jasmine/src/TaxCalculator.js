class Calculator{
    constructor (){

    }

    calculate_cost_of_donation(desired_credit, federal_tax, state_tax, donation){
        return Math.ceil(desired_credit + federal_tax + state_tax - donation);
    }

    calculate_suggested_donation_amount(desired_credit, yearly_committment){
        return yearly_committment == 1 ? Math.ceil(desired_credit / .5) : Math.ceil(desired_credit / .75);
    }
}
