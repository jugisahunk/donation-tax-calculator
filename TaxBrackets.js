console.log("loading brackets");

window.tax_brackets = {
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
