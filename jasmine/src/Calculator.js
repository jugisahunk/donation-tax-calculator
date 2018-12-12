class Calculator{
    constructor (){

    }

    calculate_donation_amount(desired_credit, federal_tax, state_tax, donation){
        return desired_credit + federal_tax + state_tax - donation;
    }
}
