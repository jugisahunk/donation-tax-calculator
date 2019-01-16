jQuery( document ).ready(function($) {

    var committment=0, filing_status=Calculator.FilingStatus.SINGLE, desired_credit=0, taxable_income=0, donation_amount=0, net_cost_of_donation=0, is_pass_through=false, calculator; 

    (function($) {})( jQuery );

    function initializeCalculator(){
        calculator = new Calculator(window.tax_brackets);
        $("#committment-single-year").trigger("click");
        $("#status-single").trigger("click");
        $("#status-business-no").trigger("click");
        $("#single-year-text").text(get_commitment_year_text(1));
        $("#two-year-text").text(get_commitment_year_text(2));
    }

    function validate_max_credit_amount(){
        var max_credit_suggestion = calculator.get_max_credit_suggestion(filing_status, is_pass_through);

        if(desired_credit > max_credit_suggestion){
            desired_credit = max_credit_suggestion;
            $("#desired_credit").val(max_credit_suggestion);
        }
    }

    function get_commitment_year_text(years_of_commitment){
        var current_year = (new Date()).getFullYear();
        if(years_of_commitment == 1){
            return `Single Year Commitment (${current_year}) - Earn 50% tax credits`;
        }else if(years_of_commitment == 2){
            return `Two Year Commitment (${current_year} and ${current_year+1}) - Earn 75% tax credits`;
        }
    }

    $("#desired_credit").change(function(){
        desired_credit = $("#desired_credit").val();
        validate_max_credit_amount();
    });

    $("#committment-single-year").on("click",function(){
        committment = 1;
        $("#committment-single-year").val(get_commitment_year_text());
    });

    $("#committment-two-year").on("click",function(){
        committment = 2;
        $("#committment-two-year").val(get_commitment_year_text());
    });
    
    function setMaxCreditSuggestion(){
        var max_credit_suggestion = calculator.get_max_credit_suggestion(filing_status,is_pass_through); 
        $("#max_credit").text(`Max credit is $${max_credit_suggestion.toLocaleString()}`);
    }

    $("#status-single").on("click", function(){
        filing_status = $("#status-single").attr("value");
        setMaxCreditSuggestion();
        validate_max_credit_amount();
    });

    $("#status-married").on("click", function(){
        filing_status = $("#status-married").attr("value");
        setMaxCreditSuggestion();
        validate_max_credit_amount();
    });

    $("#status-business-yes").on("click", function(){
        is_pass_through = true;
        setMaxCreditSuggestion();
        validate_max_credit_amount();
    });

    $("#status-business-no").on("click", function(){
        is_pass_through = false;
        setMaxCreditSuggestion();
        validate_max_credit_amount();
    });

    $("#cost_header").on("click", function(){
        $("#cost-message").toggleClass("donation-tax-calc-cost-message");
        $("#cost-message").toggleClass("hidden");
    });

    $("#calculateDonationAmount").click(function(event){
        desired_credit = parseFloat($("#desired_credit").val());
        taxable_income = parseFloat($("#taxable_income").val());

        if(isNaN(desired_credit) || isNaN(taxable_income)){
            $("#donation_amount").val("");
            $("#cost_of_donation").val("");
            return;
        }

        donation_amount = calculator.calculate_suggested_donation_amount(desired_credit, committment);

        var federal_tax = calculator.calculate_federal_tax_benefit(taxable_income, donation_amount, desired_credit, filing_status);
        var state_tax = calculator.calculate_state_tax_benefit(taxable_income, donation_amount, desired_credit, filing_status);

        net_cost_of_donation = calculator.calculate_cost_of_donation(desired_credit, federal_tax, state_tax, donation_amount); 

        console.log(`credit: ${desired_credit} fed: ${federal_tax}, state: ${state_tax}, donation: ${donation_amount}`);
        console.log(`net cost: ${net_cost_of_donation}`);

        if(net_cost_of_donation < 0){
            $("#cost-message").addClass("donation-tax-calc-cost-message");
            $("#cost-message").removeClass("hidden");
            $("#cost_explanation").removeClass("hidden");
        } else {

            $("#cost-message").addClass("hidden");
            $("#cost_explanation").removeClass("hidden");
        }

        $("#cost_of_donation").text(`$${net_cost_of_donation.toLocaleString()}`);
        $("#donation_amount").text(`$${donation_amount.toLocaleString()}`);
    });

    initializeCalculator();
});
