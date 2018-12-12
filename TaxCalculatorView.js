jQuery( document ).ready(function() {
    var committment=0, filing_status=0, desired_credit=0, taxable_income=0, donation_amount=0, net_cost_of_donation=0, business_status=0, calculator; 

    (function($) {})( jQuery );

    function initializeCalculator(){
        $("#committment-single-year").trigger("click");
        $("#status-single").trigger("click");
        $("#status-business-no").trigger("click");
        calculator = new Calculator();
        console.log(tax_brackets);
    }

    $("#desired_credit").change(function(){
        desired_credit = $("#desired_credit").val();
        if(business_status == 1){
            if(desired_credit > 100000){
                $("#desired_credit").val(100000);
            }
        }else{
            if(filing_status == 1 && desired_credit > 1000){
                $("#desired_credit").val(1000);
            }else if(filing_status == 2 && desired_credit > 2000){
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
        filing_status = parseFloat($("#status-single").attr("value"));
        $("#max_credit").text("Max credit is $1,000");
    });

    $("#status-married").on("click", function(){
        filing_status = parseFloat($("#status-married").attr("value"));
        $("#max_credit").text("Max credit is $2,000");
    });

    $("#status-business-yes").on("click", function(){
        business_status = parseFloat($("#status-business-yes").attr("value"));
        $("#max_credit").text("Max credit is $100,000");
    });

    $("#status-business-no").on("click", function(){
        business_status = parseFloat($("#status-business-no").attr("value"));
        if(filing_status == 1){
            $("#max_credit").text("Max credit is $1,000");
        }else{
            $("#max_credit").text("Max credit is $2,000");
        }
    });

    $("#calculateDonationAmount").click(function(){
        desired_credit = parseFloat($("#desired_credit").val()),
            taxable_income = parseFloat($("#taxable_income").val());

        if(isNaN(desired_credit) || isNaN(taxable_income)){
            $("#donation_amount").val("");
            $("#cost_of_donation").val("");
            return;
        }

        donation_amount = calculator.calculate_suggested_donation_amount(desired_credit, committment);
        calculate_net_cost_of_deduction();

        $("#donation_amount").text("$ " + donation_amount);
        $("#cost_of_donation").text("$ " + net_cost_of_donation);
    });

    function calculate_donation_amount(){
        if(committment == 1){
            donation_amount = Math.ceil(desired_credit / .5);
        }else if(committment == 2){
            donation_amount = Math.ceil(desired_credit / .75);
        }else{
            alert("invalid yearly committment: " + committment);
        }
    }

    function calculate_net_cost_of_deduction(){
        var fed_tax_rate, ok_tax_rate;
        if(filing_status == 1){
            if(taxable_income > 418400){
                fed_tax_rate = .396;
            }else if(taxable_income > 416700){
                fed_tax_rate = .35;
            }else if(taxable_income > 191650){
                fed_tax_rate = .33;
            }else if (taxable_income > 91900){
                fed_tax_rate = .28;
            }else if(taxable_income > 37950){
                fed_tax_rate = .25;      
            }else if(taxable_income > 9326){
                fed_tax_rate = .15;
            }else{
                fed_tax_rate = .1;
            }
            if(taxable_income > 7200){
                ok_tax_rate = .05;
            }else if(taxable_income > 4900){
                ok_tax_rate = .04;
            }else if(taxable_income > 3750){
                ok_tax_rate = .03;
            }else if(taxable_income > 2500){
                ok_tax_rate = .02;
            }else if(taxable_income > 1000){
                ok_tax_rate = .01;
            }else{
                ok_tax_rate = .005;
            }

        }else if(filing_status == 2){
            if(taxable_income > 470701){
                fed_tax_rate = .396;
            }else if(taxable_income > 416701){
                fed_tax_rate = .35;
            }else if(taxable_income > 233351){
                fed_tax_rate = .33;
            }else if(taxable_income > 153101){
                fed_tax_rate = .28;
            }else if(taxable_income > 74901){
                fed_tax_rate = .25;
            }else if(taxable_income > 18651){
                fed_tax_rate = .15;
            }else{
                fed_tax_rate = .1;
            }
            if(taxable_income > 12200){
                ok_tax_rate = .05;
            }else if(taxable_income > 9800){
                ok_tax_rate = .04;
            }else if(taxable_income > 7500){
                ok_tax_rate = .03;
            }else if(taxable_income > 5000){
                ok_tax_rate = .02;
            }else if(taxable_income > 2000){
                ok_tax_rate = .01;
            }else{
                ok_tax_rate = .005;
            }
        }
        else{
            alert("invalid filing status");
        }

        var federal_tax = donation_amount * fed_tax_rate;
        var state_tax = donation_amount * ok_tax_rate;

        net_cost_of_donation = calculator.calculate_cost_of_donation(desired_credit, federal_tax, state_tax, donation_amount); 
    }

    initializeCalculator();
});

