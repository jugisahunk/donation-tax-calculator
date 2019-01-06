jQuery( document ).ready(function() {

    var committment=0, filing_status=Calculator.FilingStatus.SINGLE, desired_credit=0, taxable_income=0, donation_amount=0, net_cost_of_donation=0, business_status=0, calculator; 

    (function($) {})( jQuery );

    function initializeCalculator(){
        $("#committment-single-year").trigger("click");
        $("#status-single").trigger("click");
        $("#status-business-no").trigger("click");
        calculator = new Calculator(window.tax_brackets);
    }

    $("#desired_credit").change(function(){
        desired_credit = $("#desired_credit").val();
        if(business_status == 1){
            if(desired_credit > 100000){
                $("#desired_credit").val(100000);
            }
        }else{
            if(filing_status == Calculator.FilingStatus.SINGLE && desired_credit > 1000){
                $("#desired_credit").val(1000);
            }else if(filing_status == Calculator.FilingStatus.MARRIED && desired_credit > 2000){
                $("#desired_credit").val(2000);      
            }
        } 
    });

    $("#committment-single-year").on("click",function(){
        committment = parseFloat($("#committment-single-year").attr("value"));
    });

    $("#committment-two-year").on("click",function(){
        committment = parseFloat($("#committment-two-year").attr("value"));
    });

    $("#status-single").on("click", function(){
        filing_status = $("#status-single").attr("value");
        $("#max_credit").text("Max credit is $1,000");
    });

    $("#status-married").on("click", function(){
        filing_status = $("#status-married").attr("value");
        $("#max_credit").text("Max credit is $2,000");
    });

    $("#status-business-yes").on("click", function(){
        business_status = parseFloat($("#status-business-yes").attr("value"));
        $("#max_credit").text("Max credit is $100,000");
    });

    $("#status-business-no").on("click", function(){
        business_status = parseFloat($("#status-business-no").attr("value"));
        if(filing_status == Calculator.FilingStatus.SINGLE){
            $("#max_credit").text("Max credit is $1,000");
        }else{
            $("#max_credit").text("Max credit is $2,000");
        }
    });

    $("#calculateDonationAmount").click(function(){
        desired_credit = parseFloat($("#desired_credit").val());
        taxable_income = parseFloat($("#taxable_income").val());

        if(isNaN(desired_credit) || isNaN(taxable_income)){
            $("#donation_amount").val("");
            $("#cost_of_donation").val("");
            return;
        }

        donation_amount = calculator.calculate_suggested_donation_amount(desired_credit, committment);

        var federal_tax = calculator.calculate_federal_tax(taxable_income, donation_amount, desired_credit, filing_status);
        var state_tax = calculator.calculate_state_tax(taxable_income, donation_amount, desired_credit, filing_status);

        net_cost_of_donation = calculator.calculate_cost_of_donation(desired_credit, federal_tax, state_tax, donation_amount); 

        $("#donation_amount").text("$ " + donation_amount);
        $("#cost_of_donation").text("$ " + net_cost_of_donation);
    });

    initializeCalculator();
});
