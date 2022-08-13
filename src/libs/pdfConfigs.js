// const getFITablePDFTemplate = function(fiType) {
//     switch (fiType) {
//         case "100000004":
//         case "100000005":
//             return co_fi;
//         case "100000007":
//         case "100000008":
//             return ima_fi;
//         case "100000011":
//         case "100000012":
//         case "100000014":
//         case "100000015":
//             return atsp_apo_fi;
//     }
// };

// const co_fi = [
//     {
//         text: `Provide a summary of the key financial information as required from the audited financial statements for
//         the past 3 years. If audited financial statements are not available, please provide the figures from the
//         management accounts for the same period in the interim, and follow up with that of the audited financial
//         statements once received.`,
//     },
//     // B3_Name_Of_Casino_Operator
//     {
//         text: "Name of Entity",
//         value: "B3_Key_Financial_Info_Table.B3_Name_Of_Casino_Operator",
//     },
//     // B3_Reporting_Year_Period
//     {
//         text: "Reporting Year/Period",
//         value: "B3_Key_Financial_Info_Table.B3_Reporting_Year_Period",
//     },
//     // B3_Presentation_Currency
//     {
//         text: "Presentation Currency",
//         value: "B3_Key_Financial_Info_Table.B3_Presentation_Currency",
//         list: "Currency_Master",
//     },
//     // B3_Based_on_Audited_Results
//     {
//         text: "Based on audited results?",
//         value: "B3_Key_Financial_Info_Table.B3_Based_on_Audited_Results",
//         list: "Yes_No_Options",
//     },
//     // B3_Key_Financial_Info_Table
//     // Statement of Financial Position
//     {
//         text: "Statement of Financial Position",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Non-Current Assets" },
//                 { value: "B3_Financial_Year.1.B3_Non_Current_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Non_Current_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Non_Current_Assets" },
//             ],
//             [
//                 { text: "Current Assets" },
//                 { value: "B3_Financial_Year.1.B3_Current_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Current_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Current_Assets" },
//             ],
//             [
//                 { text: "Total Assets" },
//                 { value: "B3_Financial_Year.1.B3_Total_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Total_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Total_Assets" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Total Equity" },
//                 { value: "B3_Financial_Year.1.B3_Total_Equity" },
//                 { value: "B3_Financial_Year.2.B3_Total_Equity" },
//                 { value: "B3_Financial_Year.3.B3_Total_Equity" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Non-Current Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Non_Current_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Non_Current_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Non_Current_Liabilities" },
//             ],
//             [
//                 { text: "Current Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Current_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Current_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Current_Liabilities" },
//             ],
//             [
//                 { text: "Total Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Total_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Total_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Total_Liabilities" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Total Liabilities and Equity" },
//                 { value: "B3_Financial_Year.1.B3_Total_Liabilities_and_Equity" },
//                 { value: "B3_Financial_Year.2.B3_Total_Liabilities_and_Equity" },
//                 { value: "B3_Financial_Year.3.B3_Total_Liabilities_and_Equity" },
//             ],
//             [
//                 { text: "Integrity Check" },
//                 { value: "B3_Financial_Year.1.B3_Integrity_Check" },
//                 { value: "B3_Financial_Year.2.B3_Integrity_Check" },
//                 { value: "B3_Financial_Year.3.B3_Integrity_Check" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [{ text: "Included in the Statement of Financial Position", colspan: "4" }],
//             [
//                 { text: "Cash and cash equivalents" },
//                 { value: "B3_Financial_Year.1.B3_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.2.B3_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.3.B3_Cash_and_Cash_Equivalents" },
//             ],
//             [
//                 { text: "Restricted cash" },
//                 { value: "B3_Financial_Year.1.B3_Restricted_Cash" },
//                 { value: "B3_Financial_Year.2.B3_Restricted_Cash" },
//                 { value: "B3_Financial_Year.3.B3_Restricted_Cash" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Borrowings, current" },
//                 { value: "B3_Financial_Year.1.B3_Borrowings_Current" },
//                 { value: "B3_Financial_Year.2.B3_Borrowings_Current" },
//                 { value: "B3_Financial_Year.3.B3_Borrowings_Current" },
//             ],
//             [
//                 { text: "Borrowings, non-current" },
//                 { value: "B3_Financial_Year.1.B3_Borrowings_Non_Current" },
//                 { value: "B3_Financial_Year.2.B3_Borrowings_Non_Current" },
//                 { value: "B3_Financial_Year.3.B3_Borrowings_Non_Current" },
//             ],
//             [
//                 { text: "Total borrowings" },
//                 { value: "B3_Financial_Year.1.B3_Total_Borrowings" },
//                 { value: "B3_Financial_Year.2.B3_Total_Borrowings" },
//                 { value: "B3_Financial_Year.3.B3_Total_Borrowings" },
//             ],
//         ],
//     },
//     // B3_Key_Financial_Info_Table
//     // Statement of Profit or Loss
//     {
//         text: "Statement of Profit or Loss",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "ytd:" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Gaming revenue" },
//                 { value: "B3_Financial_Year.0.B3_Gaming_Revenue" },
//                 { value: "B3_Financial_Year.1.B3_Gaming_Revenue" },
//                 { value: "B3_Financial_Year.2.B3_Gaming_Revenue" },
//                 { value: "B3_Financial_Year.3.B3_Gaming_Revenue" },
//             ],
//             [
//                 { text: "Non-gaming revenue" },
//                 { value: "B3_Financial_Year.0.B3_Non_Gaming_Revenue" },
//                 { value: "B3_Financial_Year.1.B3_Non_Gaming_Revenue" },
//                 { value: "B3_Financial_Year.2.B3_Non_Gaming_Revenue" },
//                 { value: "B3_Financial_Year.3.B3_Non_Gaming_Revenue" },
//             ],
//             [
//                 { text: "Total revenue" },
//                 { value: "B3_Financial_Year.0.B3_Total_Revenue" },
//                 { value: "B3_Financial_Year.1.B3_Total_Revenue" },
//                 { value: "B3_Financial_Year.2.B3_Total_Revenue" },
//                 { value: "B3_Financial_Year.3.B3_Total_Revenue" },
//             ],
//             [
//                 { text: "Total expenses" },
//                 { value: "B3_Financial_Year.0.B3_Total_Expenses" },
//                 { value: "B3_Financial_Year.1.B3_Total_Expenses" },
//                 { value: "B3_Financial_Year.2.B3_Total_Expenses" },
//                 { value: "B3_Financial_Year.3.B3_Total_Expenses" },
//             ],
//             [
//                 { text: "Operating profits" },
//                 { value: "B3_Financial_Year.0.B3_Operating_Profits" },
//                 { value: "B3_Financial_Year.1.B3_Operating_Profits" },
//                 { value: "B3_Financial_Year.2.B3_Operating_Profits" },
//                 { value: "B3_Financial_Year.3.B3_Operating_Profits" },
//             ],
//             [
//                 { text: "Interest expenses" },
//                 { value: "B3_Financial_Year.0.B3_Interest_Expenses" },
//                 { value: "B3_Financial_Year.1.B3_Interest_Expenses" },
//                 { value: "B3_Financial_Year.2.B3_Interest_Expenses" },
//                 { value: "B3_Financial_Year.3.B3_Interest_Expenses" },
//             ],
//             [
//                 { text: "Other income (expense)" },
//                 { value: "B3_Financial_Year.0.B3_Other_Income" },
//                 { value: "B3_Financial_Year.1.B3_Other_Income" },
//                 { value: "B3_Financial_Year.2.B3_Other_Income" },
//                 { value: "B3_Financial_Year.3.B3_Other_Income" },
//             ],
//             [
//                 { text: "Share of results" },
//                 { value: "B3_Financial_Year.0.B3_Share_of_Results" },
//                 { value: "B3_Financial_Year.1.B3_Share_of_Results" },
//                 { value: "B3_Financial_Year.2.B3_Share_of_Results" },
//                 { value: "B3_Financial_Year.3.B3_Share_of_Results" },
//             ],
//             [
//                 { text: "Profit before income tax" },
//                 { value: "B3_Financial_Year.0.B3_Profit_Before_Income_Tax" },
//                 { value: "B3_Financial_Year.1.B3_Profit_Before_Income_Tax" },
//                 { value: "B3_Financial_Year.2.B3_Profit_Before_Income_Tax" },
//                 { value: "B3_Financial_Year.3.B3_Profit_Before_Income_Tax" },
//             ],
//             [
//                 { text: "Tax benefit (expense)" },
//                 { value: "B3_Financial_Year.0.B3_Tax_Benefit" },
//                 { value: "B3_Financial_Year.1.B3_Tax_Benefit" },
//                 { value: "B3_Financial_Year.2.B3_Tax_Benefit" },
//                 { value: "B3_Financial_Year.3.B3_Tax_Benefit" },
//             ],
//             [
//                 { text: "Profit for the year/period" },
//                 { value: "B3_Financial_Year.0.B3_Profit_for_The_Year_Period" },
//                 { value: "B3_Financial_Year.1.B3_Profit_for_The_Year_Period" },
//                 { value: "B3_Financial_Year.2.B3_Profit_for_The_Year_Period" },
//                 { value: "B3_Financial_Year.3.B3_Profit_for_The_Year_Period" },
//             ],
//             [{ text: "", colspan: "5" }],
//             [{ text: "Included in the Statement of Profit or Loss:", colspan: "5" }],
//             [
//                 { text: "Depreciation" },
//                 { value: "B3_Financial_Year.0.B3_Depreciation" },
//                 { value: "B3_Financial_Year.1.B3_Depreciation" },
//                 { value: "B3_Financial_Year.2.B3_Depreciation" },
//                 { value: "B3_Financial_Year.3.B3_Depreciation" },
//             ],
//             [
//                 { text: "Amortisation" },
//                 { value: "B3_Financial_Year.0.B3_Amortisation" },
//                 { value: "B3_Financial_Year.1.B3_Amortisation" },
//                 { value: "B3_Financial_Year.2.B3_Amortisation" },
//                 { value: "B3_Financial_Year.3.B3_Amortisation" },
//             ],
//             [{ text: "Impairment of:", colspan: "5" }],
//             [
//                 { text: "Trade receivables" },
//                 { value: "B3_Financial_Year.0.B3_Impairment_of_Trade_Receivables" },
//                 { value: "B3_Financial_Year.1.B3_Impairment_of_Trade_Receivables" },
//                 { value: "B3_Financial_Year.2.B3_Impairment_of_Trade_Receivables" },
//                 { value: "B3_Financial_Year.3.B3_Impairment_of_Trade_Receivables" },
//             ],
//             [
//                 { text: "Fixed assets" },
//                 { value: "B3_Financial_Year.0.B3_Impairment_of_Fixed_Assets" },
//                 { value: "B3_Financial_Year.1.B3_Impairment_of_Fixed_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Impairment_of_Fixed_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Impairment_of_Fixed_Assets" },
//             ],
//             {
//                 type: "table",
//                 value: "B3_Other_Asset_Table",
//                 cols: [
//                     { value: "B3_Other_Asset_Name" },
//                     { value: "B3_Other_Asset_YTD" },
//                     { value: "B3_Other_Asset_1" },
//                     { value: "B3_Other_Asset_2" },
//                     { value: "B3_Other_Asset_3" },
//                 ],
//             },
//             [
//                 { text: "" },
//                 { value: "B3_Financial_Year.0.B3_Sum_of_Included_Items" },
//                 { value: "B3_Financial_Year.1.B3_Sum_of_Included_Items" },
//                 { value: "B3_Financial_Year.2.B3_Sum_of_Included_Items" },
//                 { value: "B3_Financial_Year.3.B3_Sum_of_Included_Items" },
//             ],
//             [
//                 { text: "(Adjusted) EBITDA" },
//                 { value: "B3_Financial_Year.0.B3_EBITDA" },
//                 { value: "B3_Financial_Year.1.B3_EBITDA" },
//                 { value: "B3_Financial_Year.2.B3_EBITDA" },
//                 { value: "B3_Financial_Year.3.B3_EBITDA" },
//             ],
//             [{ text: "", colspan: "5" }],
//             [{ text: "For CO only:", colspan: "5" }],
//             [
//                 { text: "Net Win (Cash play)" },
//                 { value: "B3_Financial_Year.0.B3_Net_Win_Cash_Play" },
//                 { value: "B3_Financial_Year.1.B3_Net_Win_Cash_Play" },
//                 { value: "B3_Financial_Year.2.B3_Net_Win_Cash_Play" },
//                 { value: "B3_Financial_Year.3.B3_Net_Win_Cash_Play" },
//             ],
//             [
//                 { text: "Net Win (Credit play)" },
//                 { value: "B3_Financial_Year.0.B3_Net_Win_Credit_Play" },
//                 { value: "B3_Financial_Year.1.B3_Net_Win_Credit_Play" },
//                 { value: "B3_Financial_Year.2.B3_Net_Win_Credit_Play" },
//                 { value: "B3_Financial_Year.3.B3_Net_Win_Credit_Play" },
//             ],
//             [
//                 { text: "Total Net Win" },
//                 { value: "B3_Financial_Year.0.B3_Total_Net_Win" },
//                 { value: "B3_Financial_Year.1.B3_Total_Net_Win" },
//                 { value: "B3_Financial_Year.2.B3_Total_Net_Win" },
//                 { value: "B3_Financial_Year.3.B3_Total_Net_Win" },
//             ],
//         ],
//     },
//     // B3_Key_Financial_Info_Table
//     // Cash Flow Statement
//     {
//         text: "Cash Flow Statement",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "ytd:" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Cash from operating activities" },
//                 { value: "B3_Financial_Year.0.B3_Cash_From_Operating_Activities" },
//                 { value: "B3_Financial_Year.1.B3_Cash_From_Operating_Activities" },
//                 { value: "B3_Financial_Year.2.B3_Cash_From_Operating_Activities" },
//                 { value: "B3_Financial_Year.3.B3_Cash_From_Operating_Activities" },
//             ],
//             [
//                 { text: "Cash from investing activities" },
//                 { value: "B3_Financial_Year.0.B3_Cash_From_Investing_Activities" },
//                 { value: "B3_Financial_Year.1.B3_Cash_From_Investing_Activities" },
//                 { value: "B3_Financial_Year.2.B3_Cash_From_Investing_Activities" },
//                 { value: "B3_Financial_Year.3.B3_Cash_From_Investing_Activities" },
//             ],
//             [
//                 { text: "Cash from financing activities" },
//                 { value: "B3_Financial_Year.0.B3_Cash_From_Financing_Activities" },
//                 { value: "B3_Financial_Year.1.B3_Cash_From_Financing_Activities" },
//                 { value: "B3_Financial_Year.2.B3_Cash_From_Financing_Activities" },
//                 { value: "B3_Financial_Year.3.B3_Cash_From_Financing_Activities" },
//             ],
//             [
//                 { text: "Increase (decrease) in cash and cash equivalents" },
//                 { value: "B3_Financial_Year.0.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.1.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.2.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.3.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//             ],
//             [{ text: "", colspan: "5" }],
//             [{ text: "Included in the Statement of Cash Flows:", colspan: "5" }],
//             [
//                 { text: "Dividends paid" },
//                 { value: "B3_Financial_Year.0.B3_Dividends_Paid" },
//                 { value: "B3_Financial_Year.1.B3_Dividends_Paid" },
//                 { value: "B3_Financial_Year.2.B3_Dividends_Paid" },
//                 { value: "B3_Financial_Year.3.B3_Dividends_Paid" },
//             ],
//             [
//                 { text: "Repayment of borrowings" },
//                 { value: "B3_Financial_Year.0.B3_Repayment_of_Borrowings" },
//                 { value: "B3_Financial_Year.1.B3_Repayment_of_Borrowings" },
//                 { value: "B3_Financial_Year.2.B3_Repayment_of_Borrowings" },
//                 { value: "B3_Financial_Year.3.B3_Repayment_of_Borrowings" },
//             ],
//             [
//                 { text: "Maintenance expenditure" },
//                 { value: "B3_Financial_Year.0.B3_Capital_Expenditure" },
//                 { value: "B3_Financial_Year.1.B3_Capital_Expenditure" },
//                 { value: "B3_Financial_Year.2.B3_Capital_Expenditure" },
//                 { value: "B3_Financial_Year.3.B3_Capital_Expenditure" },
//             ],
//             {
//                 type: "table",
//                 value: "B3_Maintenance_Expenditure_Table",
//                 cols: [
//                     { value: "B3_Maintenance_Expenditure_Name" },
//                     { value: "B3_Maintenance_Expenditure_YTD" },
//                     { value: "B3_Maintenance_Expenditure_1" },
//                     { value: "B3_Maintenance_Expenditure_2" },
//                     { value: "B3_Maintenance_Expenditure_3" },
//                 ],
//             },
//         ],
//     },
//     // B3_Key_Financial_Info_Table
//     // Other Financial Information
//     {
//         text: "Other Financial Information",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "ytd:" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Capital commitments" },
//                 { value: "B3_Financial_Year.0.B3_Capital_Commitments" },
//                 { value: "B3_Financial_Year.1.B3_Capital_Commitments" },
//                 { value: "B3_Financial_Year.2.B3_Capital_Commitments" },
//                 { value: "B3_Financial_Year.3.B3_Capital_Commitments" },
//             ],
//             [
//                 { text: "Contingent liabilities" },
//                 { value: "B3_Financial_Year.0.B3_Contingent_Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Contingent_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Contingent_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Contingent_Liabilities" },
//             ],
//             [{ text: "", colspan: "5" }],
//             [{ text: "Provision for doubtful debts:", colspan: "5" }],
//             [
//                 { text: "As at beginning of the year/period" },
//                 { value: "B3_Financial_Year.0.B3_As_At_Beginning_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.1.B3_As_At_Beginning_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.2.B3_As_At_Beginning_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.3.B3_As_At_Beginning_Of_The_Year_Period" },
//             ],
//             [
//                 { text: "Charged to statement of profit or loss" },
//                 { value: "B3_Financial_Year.0.B3_Charged_to_Statement_of_Profit_or_Loss" },
//                 { value: "B3_Financial_Year.1.B3_Charged_to_Statement_of_Profit_or_Loss" },
//                 { value: "B3_Financial_Year.2.B3_Charged_to_Statement_of_Profit_or_Loss" },
//                 { value: "B3_Financial_Year.3.B3_Charged_to_Statement_of_Profit_or_Loss" },
//             ],
//             [
//                 { text: "Amount utilised" },
//                 { value: "B3_Financial_Year.0.B3_Amount_Utilised" },
//                 { value: "B3_Financial_Year.1.B3_Amount_Utilised" },
//                 { value: "B3_Financial_Year.2.B3_Amount_Utilised" },
//                 { value: "B3_Financial_Year.3.B3_Amount_Utilised" },
//             ],
//             [
//                 { text: "Amount written back" },
//                 { value: "B3_Financial_Year.0.B3_Amount_Written_Back" },
//                 { value: "B3_Financial_Year.1.B3_Amount_Written_Back" },
//                 { value: "B3_Financial_Year.2.B3_Amount_Written_Back" },
//                 { value: "B3_Financial_Year.3.B3_Amount_Written_Back" },
//             ],
//             [
//                 { text: "As at end of the year/period" },
//                 { value: "B3_Financial_Year.0.B3_As_At_End_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.1.B3_As_At_End_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.2.B3_As_At_End_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.3.B3_As_At_End_Of_The_Year_Period" },
//             ],
//         ],
//     },
// ];

// const ima_fi = [
//     {
//         text: `Provide a summary of the key financial information as required from the audited financial statements for
//         the past 3 years. If audited financial statements are not available, please provide the figures from the
//         management accounts for the same period in the interim, and follow up with that of the audited financial
//         statements once received.`,
//     },
//     // B3_Name_Of_Casino_Operator
//     {
//         text: "Name of IMA/Associate",
//         value: "B3_Key_Financial_Info_Table.B3_Name_Of_Casino_Operator",
//     },
//     // B3_Reporting_Year_Period
//     {
//         text: "Reporting Year/Period",
//         value: "B3_Key_Financial_Info_Table.B3_Reporting_Year_Period",
//     },
//     // B3_Presentation_Currency
//     {
//         text: "Presentation Currency",
//         value: "B3_Key_Financial_Info_Table.B3_Presentation_Currency",
//         list: "Currency_Master",
//     },
//     // B3_Based_on_Audited_Results
//     {
//         text: "Based on audited results?",
//         value: "B3_Key_Financial_Info_Table.B3_Based_on_Audited_Results",
//         list: "Yes_No_Options",
//     },
//     // B3_Key_Financial_Info_Table
//     // Statement of Financial Position
//     {
//         text: "Statement of Financial Position",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Non-Current Assets" },
//                 { value: "B3_Financial_Year.1.B3_Non_Current_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Non_Current_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Non_Current_Assets" },
//             ],
//             [
//                 { text: "Current Assets" },
//                 { value: "B3_Financial_Year.1.B3_Current_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Current_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Current_Assets" },
//             ],
//             [
//                 { text: "Total Assets" },
//                 { value: "B3_Financial_Year.1.B3_Total_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Total_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Total_Assets" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Total Equity" },
//                 { value: "B3_Financial_Year.1.B3_Total_Equity" },
//                 { value: "B3_Financial_Year.2.B3_Total_Equity" },
//                 { value: "B3_Financial_Year.3.B3_Total_Equity" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Non-Current Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Non_Current_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Non_Current_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Non_Current_Liabilities" },
//             ],
//             [
//                 { text: "Current Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Current_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Current_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Current_Liabilities" },
//             ],
//             [
//                 { text: "Total Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Total_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Total_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Total_Liabilities" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Total Liabilities and Equity" },
//                 { value: "B3_Financial_Year.1.B3_Total_Liabilities_and_Equity" },
//                 { value: "B3_Financial_Year.2.B3_Total_Liabilities_and_Equity" },
//                 { value: "B3_Financial_Year.3.B3_Total_Liabilities_and_Equity" },
//             ],
//             [
//                 { text: "Integrity Check" },
//                 { value: "B3_Financial_Year.1.B3_Integrity_Check" },
//                 { value: "B3_Financial_Year.2.B3_Integrity_Check" },
//                 { value: "B3_Financial_Year.3.B3_Integrity_Check" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [{ text: "Included in the Statement of Financial Position", colspan: "4" }],
//             [
//                 { text: "Cash and cash equivalents" },
//                 { value: "B3_Financial_Year.1.B3_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.2.B3_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.3.B3_Cash_and_Cash_Equivalents" },
//             ],
//             [
//                 { text: "Restricted cash" },
//                 { value: "B3_Financial_Year.1.B3_Restricted_Cash" },
//                 { value: "B3_Financial_Year.2.B3_Restricted_Cash" },
//                 { value: "B3_Financial_Year.3.B3_Restricted_Cash" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Borrowings, current" },
//                 { value: "B3_Financial_Year.1.B3_Borrowings_Current" },
//                 { value: "B3_Financial_Year.2.B3_Borrowings_Current" },
//                 { value: "B3_Financial_Year.3.B3_Borrowings_Current" },
//             ],
//             [
//                 { text: "Borrowings, non-current" },
//                 { value: "B3_Financial_Year.1.B3_Borrowings_Non_Current" },
//                 { value: "B3_Financial_Year.2.B3_Borrowings_Non_Current" },
//                 { value: "B3_Financial_Year.3.B3_Borrowings_Non_Current" },
//             ],
//             [
//                 { text: "Total borrowings" },
//                 { value: "B3_Financial_Year.1.B3_Total_Borrowings" },
//                 { value: "B3_Financial_Year.2.B3_Total_Borrowings" },
//                 { value: "B3_Financial_Year.3.B3_Total_Borrowings" },
//             ],
//         ],
//     },
//     // B3_Key_Financial_Info_Table
//     // Statement of Profit or Loss
//     {
//         text: "Statement of Profit or Loss",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "ytd:" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Revenue" },
//                 { value: "B3_Financial_Year.0.B3_Revenue" },
//                 { value: "B3_Financial_Year.1.B3_Revenue" },
//                 { value: "B3_Financial_Year.2.B3_Revenue" },
//                 { value: "B3_Financial_Year.3.B3_Revenue" },
//             ],
//             [
//                 { text: "Total expenses" },
//                 { value: "B3_Financial_Year.0.B3_Total_Expenses" },
//                 { value: "B3_Financial_Year.1.B3_Total_Expenses" },
//                 { value: "B3_Financial_Year.2.B3_Total_Expenses" },
//                 { value: "B3_Financial_Year.3.B3_Total_Expenses" },
//             ],
//             [
//                 { text: "Operating profits" },
//                 { value: "B3_Financial_Year.0.B3_Operating_Profits" },
//                 { value: "B3_Financial_Year.1.B3_Operating_Profits" },
//                 { value: "B3_Financial_Year.2.B3_Operating_Profits" },
//                 { value: "B3_Financial_Year.3.B3_Operating_Profits" },
//             ],
//             [
//                 { text: "Interest expenses" },
//                 { value: "B3_Financial_Year.0.B3_Interest_Expenses" },
//                 { value: "B3_Financial_Year.1.B3_Interest_Expenses" },
//                 { value: "B3_Financial_Year.2.B3_Interest_Expenses" },
//                 { value: "B3_Financial_Year.3.B3_Interest_Expenses" },
//             ],
//             [
//                 { text: "Other income (expense)" },
//                 { value: "B3_Financial_Year.0.B3_Other_Income" },
//                 { value: "B3_Financial_Year.1.B3_Other_Income" },
//                 { value: "B3_Financial_Year.2.B3_Other_Income" },
//                 { value: "B3_Financial_Year.3.B3_Other_Income" },
//             ],
//             [
//                 { text: "Share of results" },
//                 { value: "B3_Financial_Year.0.B3_Share_of_Results" },
//                 { value: "B3_Financial_Year.1.B3_Share_of_Results" },
//                 { value: "B3_Financial_Year.2.B3_Share_of_Results" },
//                 { value: "B3_Financial_Year.3.B3_Share_of_Results" },
//             ],
//             [
//                 { text: "Profit before income tax" },
//                 { value: "B3_Financial_Year.0.B3_Profit_Before_Income_Tax" },
//                 { value: "B3_Financial_Year.1.B3_Profit_Before_Income_Tax" },
//                 { value: "B3_Financial_Year.2.B3_Profit_Before_Income_Tax" },
//                 { value: "B3_Financial_Year.3.B3_Profit_Before_Income_Tax" },
//             ],
//             [
//                 { text: "Tax benefit (expense)" },
//                 { value: "B3_Financial_Year.0.B3_Tax_Benefit" },
//                 { value: "B3_Financial_Year.1.B3_Tax_Benefit" },
//                 { value: "B3_Financial_Year.2.B3_Tax_Benefit" },
//                 { value: "B3_Financial_Year.3.B3_Tax_Benefit" },
//             ],
//             [
//                 { text: "Profit for the year/period" },
//                 { value: "B3_Financial_Year.0.B3_Profit_for_The_Year_Period" },
//                 { value: "B3_Financial_Year.1.B3_Profit_for_The_Year_Period" },
//                 { value: "B3_Financial_Year.2.B3_Profit_for_The_Year_Period" },
//                 { value: "B3_Financial_Year.3.B3_Profit_for_The_Year_Period" },
//             ],
//             [{ text: "", colspan: "5" }],
//             [{ text: "Included in the Statement of Profit or Loss:", colspan: "5" }],
//             [
//                 { text: "Depreciation" },
//                 { value: "B3_Financial_Year.0.B3_Depreciation" },
//                 { value: "B3_Financial_Year.1.B3_Depreciation" },
//                 { value: "B3_Financial_Year.2.B3_Depreciation" },
//                 { value: "B3_Financial_Year.3.B3_Depreciation" },
//             ],
//             [
//                 { text: "Amortisation" },
//                 { value: "B3_Financial_Year.0.B3_Amortisation" },
//                 { value: "B3_Financial_Year.1.B3_Amortisation" },
//                 { value: "B3_Financial_Year.2.B3_Amortisation" },
//                 { value: "B3_Financial_Year.3.B3_Amortisation" },
//             ],
//             [{ text: "Impairment of:", colspan: "5" }],
//             [
//                 { text: "Trade receivables" },
//                 { value: "B3_Financial_Year.0.B3_Impairment_of_Trade_Receivables" },
//                 { value: "B3_Financial_Year.1.B3_Impairment_of_Trade_Receivables" },
//                 { value: "B3_Financial_Year.2.B3_Impairment_of_Trade_Receivables" },
//                 { value: "B3_Financial_Year.3.B3_Impairment_of_Trade_Receivables" },
//             ],
//             [
//                 { text: "Fixed assets" },
//                 { value: "B3_Financial_Year.0.B3_Impairment_of_Fixed_Assets" },
//                 { value: "B3_Financial_Year.1.B3_Impairment_of_Fixed_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Impairment_of_Fixed_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Impairment_of_Fixed_Assets" },
//             ],
//             {
//                 type: "table",
//                 value: "B3_Other_Asset_Table",
//                 cols: [
//                     { value: "B3_Other_Asset_Name" },
//                     { value: "B3_Other_Asset_YTD" },
//                     { value: "B3_Other_Asset_1" },
//                     { value: "B3_Other_Asset_2" },
//                     { value: "B3_Other_Asset_3" },
//                 ],
//             },
//             [
//                 { text: "" },
//                 { value: "B3_Financial_Year.0.B3_Sum_of_Included_Items" },
//                 { value: "B3_Financial_Year.1.B3_Sum_of_Included_Items" },
//                 { value: "B3_Financial_Year.2.B3_Sum_of_Included_Items" },
//                 { value: "B3_Financial_Year.3.B3_Sum_of_Included_Items" },
//             ],
//         ],
//     },
//     // B3_Key_Financial_Info_Table
//     // Cash Flow Statement
//     {
//         text: "Cash Flow Statement",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "ytd:" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Cash from operating activities" },
//                 { value: "B3_Financial_Year.0.B3_Cash_From_Operating_Activities" },
//                 { value: "B3_Financial_Year.1.B3_Cash_From_Operating_Activities" },
//                 { value: "B3_Financial_Year.2.B3_Cash_From_Operating_Activities" },
//                 { value: "B3_Financial_Year.3.B3_Cash_From_Operating_Activities" },
//             ],
//             [
//                 { text: "Cash from investing activities" },
//                 { value: "B3_Financial_Year.0.B3_Cash_From_Investing_Activities" },
//                 { value: "B3_Financial_Year.1.B3_Cash_From_Investing_Activities" },
//                 { value: "B3_Financial_Year.2.B3_Cash_From_Investing_Activities" },
//                 { value: "B3_Financial_Year.3.B3_Cash_From_Investing_Activities" },
//             ],
//             [
//                 { text: "Cash from financing activities" },
//                 { value: "B3_Financial_Year.0.B3_Cash_From_Financing_Activities" },
//                 { value: "B3_Financial_Year.1.B3_Cash_From_Financing_Activities" },
//                 { value: "B3_Financial_Year.2.B3_Cash_From_Financing_Activities" },
//                 { value: "B3_Financial_Year.3.B3_Cash_From_Financing_Activities" },
//             ],
//             [
//                 { text: "Increase (decrease) in cash and cash equivalents" },
//                 { value: "B3_Financial_Year.0.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.1.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.2.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.3.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//             ],
//             [{ text: "", colspan: "5" }],
//             [{ text: "Included in the Statement of Cash Flows:", colspan: "5" }],
//             [
//                 { text: "Dividends paid" },
//                 { value: "B3_Financial_Year.0.B3_Dividends_Paid" },
//                 { value: "B3_Financial_Year.1.B3_Dividends_Paid" },
//                 { value: "B3_Financial_Year.2.B3_Dividends_Paid" },
//                 { value: "B3_Financial_Year.3.B3_Dividends_Paid" },
//             ],
//             [
//                 { text: "Repayment of borrowings" },
//                 { value: "B3_Financial_Year.0.B3_Repayment_of_Borrowings" },
//                 { value: "B3_Financial_Year.1.B3_Repayment_of_Borrowings" },
//                 { value: "B3_Financial_Year.2.B3_Repayment_of_Borrowings" },
//                 { value: "B3_Financial_Year.3.B3_Repayment_of_Borrowings" },
//             ],
//             [
//                 { text: "Capital expenditure" },
//                 { value: "B3_Financial_Year.0.B3_Capital_Expenditure" },
//                 { value: "B3_Financial_Year.1.B3_Capital_Expenditure" },
//                 { value: "B3_Financial_Year.2.B3_Capital_Expenditure" },
//                 { value: "B3_Financial_Year.3.B3_Capital_Expenditure" },
//             ],
//             {
//                 type: "table",
//                 value: "B3_Maintenance_Expenditure_Table",
//                 cols: [
//                     { value: "B3_Maintenance_Expenditure_Name" },
//                     { value: "B3_Maintenance_Expenditure_YTD" },
//                     { value: "B3_Maintenance_Expenditure_1" },
//                     { value: "B3_Maintenance_Expenditure_2" },
//                     { value: "B3_Maintenance_Expenditure_3" },
//                 ],
//             },
//         ],
//     },
//     // B3_Key_Financial_Info_Table
//     // Other Financial Information
//     {
//         text: "Other Financial Information",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "ytd:" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Capital commitments" },
//                 { value: "B3_Financial_Year.0.B3_Capital_Commitments" },
//                 { value: "B3_Financial_Year.1.B3_Capital_Commitments" },
//                 { value: "B3_Financial_Year.2.B3_Capital_Commitments" },
//                 { value: "B3_Financial_Year.3.B3_Capital_Commitments" },
//             ],
//             [
//                 { text: "Contingent liabilities" },
//                 { value: "B3_Financial_Year.0.B3_Contingent_Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Contingent_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Contingent_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Contingent_Liabilities" },
//             ],
//             [{ text: "", colspan: "5" }],
//             [{ text: "Provision for doubtful debts:", colspan: "5" }],
//             [
//                 { text: "As at beginning of the year/period" },
//                 { value: "B3_Financial_Year.0.B3_As_At_Beginning_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.1.B3_As_At_Beginning_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.2.B3_As_At_Beginning_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.3.B3_As_At_Beginning_Of_The_Year_Period" },
//             ],
//             [
//                 { text: "Charged to statement of profit or loss" },
//                 { value: "B3_Financial_Year.0.B3_Charged_to_Statement_of_Profit_or_Loss" },
//                 { value: "B3_Financial_Year.1.B3_Charged_to_Statement_of_Profit_or_Loss" },
//                 { value: "B3_Financial_Year.2.B3_Charged_to_Statement_of_Profit_or_Loss" },
//                 { value: "B3_Financial_Year.3.B3_Charged_to_Statement_of_Profit_or_Loss" },
//             ],
//             [
//                 { text: "Amount utilised" },
//                 { value: "B3_Financial_Year.0.B3_Amount_Utilised" },
//                 { value: "B3_Financial_Year.1.B3_Amount_Utilised" },
//                 { value: "B3_Financial_Year.2.B3_Amount_Utilised" },
//                 { value: "B3_Financial_Year.3.B3_Amount_Utilised" },
//             ],
//             [
//                 { text: "Amount written back" },
//                 { value: "B3_Financial_Year.0.B3_Amount_Written_Back" },
//                 { value: "B3_Financial_Year.1.B3_Amount_Written_Back" },
//                 { value: "B3_Financial_Year.2.B3_Amount_Written_Back" },
//                 { value: "B3_Financial_Year.3.B3_Amount_Written_Back" },
//             ],
//             [
//                 { text: "As at end of the year/period" },
//                 { value: "B3_Financial_Year.0.B3_As_At_End_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.1.B3_As_At_End_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.2.B3_As_At_End_Of_The_Year_Period" },
//                 { value: "B3_Financial_Year.3.B3_As_At_End_Of_The_Year_Period" },
//             ],
//         ],
//     },
// ];

// const atsp_apo_fi = [
//     {
//         text: `Provide a summary of the key financial information as required from the audited financial statements for
//         the past 3 years. If audited financial statements are not available, please provide the figures from the
//         management accounts for the same period in the interim, and follow up with that of the audited financial
//         statements once received.`,
//     },
//     // B3_Name_Of_Casino_Operator
//     {
//         text: "Name of ATSP/APO/Associate:",
//         value: "B3_Key_Financial_Info_Table.B3_Name_Of_Casino_Operator",
//     },
//     // B3_Reporting_Year_Period
//     {
//         text: "Reporting Year/Period",
//         value: "B3_Key_Financial_Info_Table.B3_Reporting_Year_Period",
//     },
//     // B3_Presentation_Currency
//     {
//         text: "Presentation Currency",
//         value: "B3_Key_Financial_Info_Table.B3_Presentation_Currency",
//         list: "Currency_Master",
//     },
//     // B3_Based_on_Audited_Results
//     {
//         text: "Based on audited results?",
//         value: "B3_Key_Financial_Info_Table.B3_Based_on_Audited_Results",
//         list: "Yes_No_Options",
//     },
//     // B3_Key_Financial_Info_Table
//     // Statement of Financial Position
//     {
//         text: "Statement of Financial Position",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Non-Current Assets" },
//                 { value: "B3_Financial_Year.1.B3_Non_Current_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Non_Current_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Non_Current_Assets" },
//             ],
//             [
//                 { text: "Current Assets" },
//                 { value: "B3_Financial_Year.1.B3_Current_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Current_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Current_Assets" },
//             ],
//             [
//                 { text: "Total Assets" },
//                 { value: "B3_Financial_Year.1.B3_Total_Assets" },
//                 { value: "B3_Financial_Year.2.B3_Total_Assets" },
//                 { value: "B3_Financial_Year.3.B3_Total_Assets" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Total Equity" },
//                 { value: "B3_Financial_Year.1.B3_Total_Equity" },
//                 { value: "B3_Financial_Year.2.B3_Total_Equity" },
//                 { value: "B3_Financial_Year.3.B3_Total_Equity" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Non-Current Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Non_Current_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Non_Current_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Non_Current_Liabilities" },
//             ],
//             [
//                 { text: "Current Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Current_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Current_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Current_Liabilities" },
//             ],
//             [
//                 { text: "Total Liabilities" },
//                 { value: "B3_Financial_Year.1.B3_Total_Liabilities" },
//                 { value: "B3_Financial_Year.2.B3_Total_Liabilities" },
//                 { value: "B3_Financial_Year.3.B3_Total_Liabilities" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Total Liabilities and Equity" },
//                 { value: "B3_Financial_Year.1.B3_Total_Liabilities_and_Equity" },
//                 { value: "B3_Financial_Year.2.B3_Total_Liabilities_and_Equity" },
//                 { value: "B3_Financial_Year.3.B3_Total_Liabilities_and_Equity" },
//             ],
//             [
//                 { text: "Integrity Check" },
//                 { value: "B3_Financial_Year.1.B3_Integrity_Check" },
//                 { value: "B3_Financial_Year.2.B3_Integrity_Check" },
//                 { value: "B3_Financial_Year.3.B3_Integrity_Check" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [{ text: "Included in the Statement of Financial Position", colspan: "4" }],
//             [
//                 { text: "Cash and cash equivalents" },
//                 { value: "B3_Financial_Year.1.B3_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.2.B3_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.3.B3_Cash_and_Cash_Equivalents" },
//             ],
//             [
//                 { text: "Restricted cash" },
//                 { value: "B3_Financial_Year.1.B3_Restricted_Cash" },
//                 { value: "B3_Financial_Year.2.B3_Restricted_Cash" },
//                 { value: "B3_Financial_Year.3.B3_Restricted_Cash" },
//             ],
//             [{ text: "", colspan: "4" }],
//             [
//                 { text: "Borrowings, current" },
//                 { value: "B3_Financial_Year.1.B3_Borrowings_Current" },
//                 { value: "B3_Financial_Year.2.B3_Borrowings_Current" },
//                 { value: "B3_Financial_Year.3.B3_Borrowings_Current" },
//             ],
//             [
//                 { text: "Borrowings, non-current" },
//                 { value: "B3_Financial_Year.1.B3_Borrowings_Non_Current" },
//                 { value: "B3_Financial_Year.2.B3_Borrowings_Non_Current" },
//                 { value: "B3_Financial_Year.3.B3_Borrowings_Non_Current" },
//             ],
//             [
//                 { text: "Total borrowings" },
//                 { value: "B3_Financial_Year.1.B3_Total_Borrowings" },
//                 { value: "B3_Financial_Year.2.B3_Total_Borrowings" },
//                 { value: "B3_Financial_Year.3.B3_Total_Borrowings" },
//             ],
//         ],
//     },
//     // B3_Key_Financial_Info_Table
//     // Statement of Profit or Loss
//     {
//         text: "Statement of Profit or Loss",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "ytd:" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Revenue" },
//                 { value: "B3_Financial_Year.0.B3_Revenue" },
//                 { value: "B3_Financial_Year.1.B3_Revenue" },
//                 { value: "B3_Financial_Year.2.B3_Revenue" },
//                 { value: "B3_Financial_Year.3.B3_Revenue" },
//             ],
//             [
//                 { text: "Total expenses" },
//                 { value: "B3_Financial_Year.0.B3_Total_Expenses" },
//                 { value: "B3_Financial_Year.1.B3_Total_Expenses" },
//                 { value: "B3_Financial_Year.2.B3_Total_Expenses" },
//                 { value: "B3_Financial_Year.3.B3_Total_Expenses" },
//             ],
//             [
//                 { text: "Operating profits" },
//                 { value: "B3_Financial_Year.0.B3_Operating_Profits" },
//                 { value: "B3_Financial_Year.1.B3_Operating_Profits" },
//                 { value: "B3_Financial_Year.2.B3_Operating_Profits" },
//                 { value: "B3_Financial_Year.3.B3_Operating_Profits" },
//             ],
//             [
//                 { text: "Interest expenses" },
//                 { value: "B3_Financial_Year.0.B3_Interest_Expenses" },
//                 { value: "B3_Financial_Year.1.B3_Interest_Expenses" },
//                 { value: "B3_Financial_Year.2.B3_Interest_Expenses" },
//                 { value: "B3_Financial_Year.3.B3_Interest_Expenses" },
//             ],
//             [
//                 { text: "Other income (expense)" },
//                 { value: "B3_Financial_Year.0.B3_Other_Income" },
//                 { value: "B3_Financial_Year.1.B3_Other_Income" },
//                 { value: "B3_Financial_Year.2.B3_Other_Income" },
//                 { value: "B3_Financial_Year.3.B3_Other_Income" },
//             ],
//             [
//                 { text: "Share of results" },
//                 { value: "B3_Financial_Year.0.B3_Share_of_Results" },
//                 { value: "B3_Financial_Year.1.B3_Share_of_Results" },
//                 { value: "B3_Financial_Year.2.B3_Share_of_Results" },
//                 { value: "B3_Financial_Year.3.B3_Share_of_Results" },
//             ],
//             [
//                 { text: "Profit before income tax" },
//                 { value: "B3_Financial_Year.0.B3_Profit_Before_Income_Tax" },
//                 { value: "B3_Financial_Year.1.B3_Profit_Before_Income_Tax" },
//                 { value: "B3_Financial_Year.2.B3_Profit_Before_Income_Tax" },
//                 { value: "B3_Financial_Year.3.B3_Profit_Before_Income_Tax" },
//             ],
//             [
//                 { text: "Tax benefit (expense)" },
//                 { value: "B3_Financial_Year.0.B3_Tax_Benefit" },
//                 { value: "B3_Financial_Year.1.B3_Tax_Benefit" },
//                 { value: "B3_Financial_Year.2.B3_Tax_Benefit" },
//                 { value: "B3_Financial_Year.3.B3_Tax_Benefit" },
//             ],
//             [
//                 { text: "Profit for the year/period" },
//                 { value: "B3_Financial_Year.0.B3_Profit_for_The_Year_Period" },
//                 { value: "B3_Financial_Year.1.B3_Profit_for_The_Year_Period" },
//                 { value: "B3_Financial_Year.2.B3_Profit_for_The_Year_Period" },
//                 { value: "B3_Financial_Year.3.B3_Profit_for_The_Year_Period" },
//             ],
//             [{ text: "", colspan: "5" }],
//             [{ text: "Included in the Statement of Profit or Loss:", colspan: "5" }],
//             [
//                 { text: "Depreciation" },
//                 { value: "B3_Financial_Year.0.B3_Depreciation" },
//                 { value: "B3_Financial_Year.1.B3_Depreciation" },
//                 { value: "B3_Financial_Year.2.B3_Depreciation" },
//                 { value: "B3_Financial_Year.3.B3_Depreciation" },
//             ],
//             [
//                 { text: "Amortisation" },
//                 { value: "B3_Financial_Year.0.B3_Amortisation" },
//                 { value: "B3_Financial_Year.1.B3_Amortisation" },
//                 { value: "B3_Financial_Year.2.B3_Amortisation" },
//                 { value: "B3_Financial_Year.3.B3_Amortisation" },
//             ],
//         ],
//     },
//     // B3_Key_Financial_Info_Table
//     // Cash Flow Statement
//     {
//         text: "Cash Flow Statement",
//         type: "Adhoc_Table",
//         value: "B3_Key_Financial_Info_Table",
//         template: [
//             [
//                 { text: "" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "ytd:" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-1" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-2" },
//                 { type: "th", value: "B3_Reporting_Year_Period", formulate: "year:-3" },
//             ],
//             [
//                 { text: "Cash from operating activities" },
//                 { value: "B3_Financial_Year.0.B3_Cash_From_Operating_Activities" },
//                 { value: "B3_Financial_Year.1.B3_Cash_From_Operating_Activities" },
//                 { value: "B3_Financial_Year.2.B3_Cash_From_Operating_Activities" },
//                 { value: "B3_Financial_Year.3.B3_Cash_From_Operating_Activities" },
//             ],
//             [
//                 { text: "Cash from investing activities" },
//                 { value: "B3_Financial_Year.0.B3_Cash_From_Investing_Activities" },
//                 { value: "B3_Financial_Year.1.B3_Cash_From_Investing_Activities" },
//                 { value: "B3_Financial_Year.2.B3_Cash_From_Investing_Activities" },
//                 { value: "B3_Financial_Year.3.B3_Cash_From_Investing_Activities" },
//             ],
//             [
//                 { text: "Cash from financing activities" },
//                 { value: "B3_Financial_Year.0.B3_Cash_From_Financing_Activities" },
//                 { value: "B3_Financial_Year.1.B3_Cash_From_Financing_Activities" },
//                 { value: "B3_Financial_Year.2.B3_Cash_From_Financing_Activities" },
//                 { value: "B3_Financial_Year.3.B3_Cash_From_Financing_Activities" },
//             ],
//             [
//                 { text: "Increase (decrease) in cash and cash equivalents" },
//                 { value: "B3_Financial_Year.0.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.1.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.2.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//                 { value: "B3_Financial_Year.3.B3_Increase_Decrease_In_Cash_and_Cash_Equivalents" },
//             ],
//             [{ text: "", colspan: "5" }],
//             [{ text: "Included in the Statement of Cash Flows:", colspan: "5" }],
//             [
//                 { text: "Dividends paid" },
//                 { value: "B3_Financial_Year.0.B3_Dividends_Paid" },
//                 { value: "B3_Financial_Year.1.B3_Dividends_Paid" },
//                 { value: "B3_Financial_Year.2.B3_Dividends_Paid" },
//                 { value: "B3_Financial_Year.3.B3_Dividends_Paid" },
//             ],
//             [
//                 { text: "Repayment of borrowings" },
//                 { value: "B3_Financial_Year.0.B3_Repayment_of_Borrowings" },
//                 { value: "B3_Financial_Year.1.B3_Repayment_of_Borrowings" },
//                 { value: "B3_Financial_Year.2.B3_Repayment_of_Borrowings" },
//                 { value: "B3_Financial_Year.3.B3_Repayment_of_Borrowings" },
//             ],
//             [
//                 { text: "Capital expenditure" },
//                 { value: "B3_Financial_Year.0.B3_Capital_Expenditure" },
//                 { value: "B3_Financial_Year.1.B3_Capital_Expenditure" },
//                 { value: "B3_Financial_Year.2.B3_Capital_Expenditure" },
//                 { value: "B3_Financial_Year.3.B3_Capital_Expenditure" },
//             ],
//         ],
//     },
// ];

const getAPHDFPDFTemplate = function() {
    return {
        text: "Abridged Personal History Disclosure Form",
        pages: [
            // Summary
            {
                text: "Personal Data",
                sections: [
                    {
                        text: "1A",
                        fields: [
                            {
                                text: "Name (Family name followed by given name)",
                                value: "Personal_Data_Name"
                            },

                            {
                                text: "Gender",
                                value: "Personal_Data_Gender",
                                list: "Gender_Options"
                            }
                        ]
                    },

                    {
                        text: "1B",
                        fields: [
                            {
                                text: "Citizenship",
                                value: "Personal_Data_Citizenship",
                                list: "Citizenship_Type_Options"
                            },

                            {
                                text: "Singapore NRIC / FIN",
                                value: "Personal_Data_NRIC"
                            },

                            {
                                value: "Sec_1B_Yes_Table",
                                condition: {
                                    properties: ["Sec_1B_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Citizenship",
                                        value: "foreignCitizenship",
                                        list: "Foreign_Citizenship_Options"
                                    },
                                    {
                                        text: "Country",
                                        value: "country",
                                        list: "Country_Master"
                                    },
                                    {
                                        text: "Country Identification Number",
                                        value: "foreignCountryId"
                                    }
                                ]
                            },

                            {
                                value: "Sec_1B_P_Yes_Table",
                                condition: {
                                    properties: ["Sec_1B_P_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Passport Number",
                                        value: "passportNumber"
                                    },
                                    {
                                        text: "Name on Passport",
                                        value: "nameOnPassport"
                                    },
                                    {
                                        text: "Country of Issue",
                                        value: "countryOfIssue",
                                        list: "Country_Master"
                                    },
                                    {
                                        text: "Place of Issue",
                                        value: "placeOfIssue"
                                    },
                                    {
                                        text: "Date of Issue",
                                        value: "dateOfIssue",
                                        type: "Date"
                                    },
                                    {
                                        text: "Expiry Date",
                                        value: "expiryDate",
                                        type: "Date"
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        text: "1C",
                        fields: [
                            { text: "Date of Birth", value: "Sec_1C_Date_of_Birth", type: "Date" },

                            {
                                text: "Country of Birth",
                                value: "Sec_1C_Country_of_Birth",
                                list: "Country_Master"
                            }
                        ]
                    },

                    {
                        text: "1D Residential Address",
                        fields: [
                            {
                                text: "Address Type",
                                value: "Sec_1D_Address_Type",
                                list: "Address_Type_Options"
                            },

                            {
                                text: "Blk / House #",
                                value: "Sec_1D_Blk"
                            },

                            {
                                text: "Street",
                                value: "Sec_1D_Street"
                            },

                            {
                                text: "Floor",
                                value: "Sec_1D_Floor"
                            },

                            {
                                text: "Unit",
                                value: "Sec_1D_Unit"
                            },

                            {
                                text: "Building",
                                value: "Sec_1D_Building"
                            },

                            {
                                text: "ZIP / Postal Code",
                                value: "Sec_1D_Postal_Code"
                            },

                            {
                                text: "Country",
                                value: "Sec_1D_Country",
                                list: "Country_Master"
                            }
                        ]
                    },

                    {
                        text: "1E Mailing Address",
                        fields: [
                            {
                                text: "Same as Residential Address",
                                value: "Sec_1E_Checkbox",
                                type: "Boolean"
                            },

                            {
                                text: "Address Type",
                                value: "Sec_1E_Address_Type",
                                list: "Address_Type_Options"
                            },

                            {
                                text: "Blk / House #",
                                value: "Sec_1E_Blk"
                            },

                            {
                                text: "Street",
                                value: "Sec_1E_Street"
                            },

                            {
                                text: "Floor",
                                value: "Sec_1E_Floor"
                            },

                            {
                                text: "Unit",
                                value: "Sec_1E_Unit"
                            },

                            {
                                text: "Building",
                                value: "Sec_1E_Building"
                            },

                            {
                                text: "ZIP / Postal Code",
                                value: "Sec_1E_Postal_Code"
                            },

                            {
                                text: "Country",
                                value: "Sec_1E_Country",
                                list: "Country_Master"
                            }
                        ]
                    },

                    {
                        text: "1F",
                        fields: [
                            { text: "Home Telephone" },

                            {
                                text: "Country Code",
                                value: "Sec_1F_Home_Number_Country_Code",
                                title_class: "sub_label"
                            },

                            {
                                text: "Area Code",
                                value: "Sec_1F_Home_Number_Area_Code",
                                title_class: "sub_label"
                            },

                            {
                                text: "Number",
                                value: "Sec_1F_Home_Number_Number",
                                title_class: "sub_label"
                            },

                            { text: "Mobile Number" },

                            {
                                text: "Country Code",
                                value: "Sec_1F_Mobile_Number_Country_Code",
                                title_class: "sub_label"
                            },

                            {
                                text: "Area Code",
                                value: "Sec_1F_Mobile_Number_Area_Code",
                                title_class: "sub_label"
                            },

                            {
                                text: "Number",
                                value: "Sec_1F_Mobile_Number_Number",
                                title_class: "sub_label"
                            },

                            { text: "Office Number" },

                            {
                                text: "Country Code",
                                value: "Sec_1F_Office_Number_Country_Code",
                                title_class: "sub_label"
                            },

                            {
                                text: "Area Code",
                                value: "Sec_1F_Office_Number_Area_Code",
                                title_class: "sub_label"
                            },

                            {
                                text: "Number",
                                value: "Sec_1F_Office_Number_Number",
                                title_class: "sub_label"
                            },

                            {
                                text: "Extension",
                                value: "Sec_1F_Office_Number_Extension",
                                title_class: "sub_label"
                            },

                            { text: "Email Address" },

                            {
                                text: "Personal Email",
                                value: "Sec_1F_Personal_Email",
                                title_class: "sub_label"
                            },

                            {
                                text: "Work Email",
                                value: "Sec_1F_Work_Email",
                                title_class: "sub_label"
                            },

                            {
                                text:
                                    " I understand that the aforementioned email address will be used for electronic service and that it is my / the Applicant or Associate’s responsibility to update the Authority with any changes in the electronic service address.",
                                value: "Sec_1F_Checkbox",
                                type: "Boolean"
                            }
                        ]
                    },

                    {
                        text: "1G",
                        fields: [{ text: "Race", value: "Sec_1G_Race", list: "Race_Master" }]
                    },

                    {
                        text: "1H",
                        fields: [
                            {
                                value: "Sec_1H_Yes_Table",
                                condition: {
                                    properties: ["Sec_1H_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Other Name",
                                        value: "name"
                                    },
                                    {
                                        text: "Date From",
                                        value: "fromPeriod"
                                    },
                                    {
                                        text: "Date To",
                                        value: "toPeriod"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Have you been known by any other name or names (including maiden name, aliases, nicknames, other name changes, legal or otherwise)? If yes, please describe.",
                                value: "Sec_1H_Checkbox",
                                condition: {
                                    properties: ["Sec_1H_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "1I",
                        fields: [
                            {
                                value: "Sec_1I_Yes_Table",
                                condition: {
                                    properties: ["Sec_1I_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Scar/Mark/Tattoo,Characteristic",
                                        value: "type",
                                        list: "Scar_Options"
                                    },
                                    {
                                        text: "Tattoo Pattern",
                                        value: "pattern",
                                        list: "Tattoo_Patterns_Master"
                                    },
                                    {
                                        text: "Location",
                                        value: "location",
                                        list: "Tattoo_Locations_Master"
                                    },
                                    {
                                        text: "Description",
                                        value: "description"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Do you have any scars, tattoos or other distinguishing marks and/or characteristics? If yes, please describe.",
                                value: "Sec_1I_Checkbox",
                                condition: {
                                    properties: ["Sec_1I_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    }
                ]
            },

            // Page 2
            {
                text: "Residence Data",
                sections: [
                    {
                        text: "2A",
                        fields: [
                            {
                                value: "Sec_2A_Yes_Table",
                                // condition: {
                                //     properties: ["Sec_2A_Checkbox"],
                                //     rule: "'{0}'=='Yes'",
                                // },
                                cols: [
                                    {
                                        text: "Address Type",
                                        value: "addressType",
                                        list: "Address_Type_Options"
                                    },
                                    {
                                        text: "Blk / House #",
                                        value: "blk"
                                    },
                                    {
                                        text: "Street",
                                        value: "street"
                                    },
                                    {
                                        text: "Floor",
                                        value: "floor"
                                    },
                                    {
                                        text: "Unit",
                                        value: "unit"
                                    },
                                    {
                                        text: "Building",
                                        value: "building"
                                    },
                                    {
                                        text: "ZIP / Postal Code",
                                        value: "postalCode"
                                    },
                                    {
                                        text: "Country",
                                        value: "country",
                                        list: "Country_Master"
                                    },
                                    {
                                        text: "State",
                                        value: "state"
                                    },
                                    {
                                        text: "Ownership",
                                        value: "ownership",
                                        list: "Ownership_Options"
                                    },
                                    {
                                        text: "Date From",
                                        value: "dateFrom"
                                    },
                                    {
                                        text: "Current Staying",
                                        value: "currentlyStaying",
                                        type: "Boolean"
                                    },
                                    {
                                        text: "Date To",
                                        value: "dateTo"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

            // Page 3
            {
                text: "Family / Social Data",
                sections: [
                    {
                        text: "3A",
                        fields: [
                            {
                                text: "Your current marital status",
                                value: "Sec_3A_Marital",
                                list: "Marital_Options"
                            },

                            {
                                value: "Sec_3A_Yes_Table",
                                condition: {
                                    properties: ["Sec_3A_Marital"],
                                    rule: "'{0}'=='100000002' || '{0}' == '100000004'"
                                },
                                cols: [
                                    {
                                        text: "Date of Marriage",
                                        value: "dateOfMarriage",
                                        type: "Date"
                                    },

                                    {
                                        text: "Country of Marriage",
                                        value: "countryOfMarriage",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Details of Spouse"
                                    },

                                    {
                                        text: "Name",
                                        value: "spouseName",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Spouse NRIC/FIN",
                                        value: "spouseNricFin",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Country Identification Number",
                                        value: "spouseCountryIdNumber",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Citizenship",
                                        value: "spouseCitizenship",
                                        list: "Citizenship_Master",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Date of Birth",
                                        value: "spouseDateOfBirth",
                                        type: "Date",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Country of Birth",
                                        value: "spouseCountryOfBirth",
                                        list: "Country_Master",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Home Address"
                                    },

                                    {
                                        text: "Address Type",
                                        value: "addressType",
                                        list: "Address_Type_Options",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Blk / House#",
                                        value: "blk",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Street",
                                        value: "street",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Floor",
                                        value: "floor",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Unit",
                                        value: "unit",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Building",
                                        value: "building",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "ZIP / Postal Code",
                                        value: "postalCode",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Country",
                                        value: "country",
                                        list: "Country_Master",
                                        title_class: "sub_label"
                                    },

                                    {
                                        text: "Occupation",
                                        value: "occupation",
                                        title_class: "sub_label"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

            // Page 4
            {
                text: "Employment and Licensing Data",

                sections: [
                    {
                        text: "4A",
                        fields: [
                            {
                                text:
                                    "Provide details of your employment (including any unemployment period, part-time and full-time employment) for the past 10 years or since the age of 18, whichever is lesser. Provide the details in chronological order, beginning with the most recent employment.",
                                value: "Sec_6A_Yes_Table",
                                condition: {
                                    properties: ["Sec_6A_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Employment Date From",
                                        value: "fromDate",
                                        type: "Date"
                                    },

                                    {
                                        text: "Employment Date To",
                                        value: "toDate",
                                        type: "Date"
                                    },

                                    {
                                        text: "Present",
                                        value: "isEmploymentAtPresent",
                                        type: "Boolean"
                                    },

                                    {
                                        text: "Name of Employer",
                                        value: "employerName"
                                    },

                                    {
                                        text: "Country of Employer",
                                        value: "employerCountry",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Title/Position Held",
                                        value: "title"
                                    },

                                    {
                                        text: "Description of Duties",
                                        value: "duties"
                                    },

                                    {
                                        text: "Is this a gambling related company?",
                                        value: "isGamblingRelated",
                                        type: "Boolean"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Provide details of your employment (including any unemployment period, part-time and full-time employment) for the past 10 years or since the age of 18, whichever is lesser. Provide the details in chronological order, beginning with the most recent employment.",
                                value: "Sec_6A_Checkbox",
                                condition: {
                                    properties: ["Sec_6A_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },
                    {
                        text: "4B",
                        fields: [
                            {
                                text:
                                    "i.Have you been discharged, suspended or asked to resign from employment? If yes, please describe.",
                                title_class: "sub_label"
                            },
                            {
                                value: "Sec_6B_i_Yes_Table",
                                condition: {
                                    properties: ["Sec_6B_i_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text:
                                            "Date of Discharge / Suspension / Resignation / Disciplinary Action",
                                        value: "date",
                                        type: "Date"
                                    },

                                    {
                                        text: "Name of Employer",
                                        value: "name"
                                    },

                                    {
                                        text: "Country of Employer",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text:
                                            "Reason for Discharge / Suspension / Resignation / Disciplinary Action",
                                        value: "reason"
                                    }
                                ]
                            },
                            {
                                value: "Sec_6B_i_Checkbox",
                                condition: {
                                    properties: ["Sec_6B_i_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            },

                            {
                                text:
                                    "ii.Have you ever been charged with any infraction in relation to any employment which was the subject of any disciplinary action? If yes, please describe.",
                                title_class: "sub_label"
                            },
                            {
                                value: "Sec_6B_ii_Yes_Table",
                                condition: {
                                    properties: ["Sec_6B_ii_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text:
                                            "Date of Discharge / Suspension / Resignation / Disciplinary Action",
                                        value: "date",
                                        type: "Date"
                                    },

                                    {
                                        text: "Name of Employer",
                                        value: "name"
                                    },

                                    {
                                        text: "Country of Employer",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text:
                                            "Reason for Discharge / Suspension / Resignation / Disciplinary Action",
                                        value: "reason"
                                    }
                                ]
                            },
                            {
                                value: "Sec_6B_ii_Checkbox",
                                condition: {
                                    properties: ["Sec_6B_ii_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },
                    {
                        text: "4C",
                        fields: [
                            {
                                text:
                                    "Have any of the licences, permits or certifications you have applied for or held, been denied, suspended, revoked or subject to any conditions in any jurisdiction? If yes, please describe.",
                                value: "Sec_6E_Yes_Table",
                                condition: {
                                    properties: ["Sec_6E_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Type of Licence / Permit / Certificate",
                                        value: "type"
                                    },

                                    {
                                        text: "Name of Approving Organisation",
                                        value: "name"
                                    },

                                    {
                                        text: "Country of Approving Organisation",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text:
                                            "Date of Denial / Suspension / Revocation / Imposition of Condition",
                                        value: "date",
                                        type: "Date"
                                    },

                                    {
                                        text:
                                            "Reason for Denial / Suspension / Revocation / Imposition of Condition",
                                        value: "reason"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Have any of the licences, permits or certifications you have applied for or held, been denied, suspended, revoked or subject to any conditions in any jurisdiction? If yes, please describe.",
                                value: "Sec_6E_Checkbox",
                                condition: {
                                    properties: ["Sec_6E_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },
                    {
                        text: "4D",
                        fields: [
                            {
                                text:
                                    "Are any of your family members (whether related by blood, marriage or adoption) associated with or employed in any form or type of casino gambling related operation in any jurisdiction? If yes, please describe.",
                                value: "Sec_6J_i_Yes_Table",
                                condition: {
                                    properties: ["Sec_6J_i_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Name of Person",
                                        value: "nameOfPerson"
                                    },

                                    {
                                        text: "Relationship",
                                        value: "relationship"
                                    },

                                    {
                                        text: "Name of Gambling Business",
                                        value: "nameofGamblingBusiness"
                                    },

                                    {
                                        text: "Country of Gambling Business",
                                        value: "countryOfGamblingBusiness",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Title / Position Held",
                                        value: "title"
                                    },

                                    {
                                        text:
                                            "Is this an International Marketing Agent related company?",
                                        value: "isImaRelated",
                                        type: "Boolean"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Are any of your family members (whether related by blood, marriage or adoption) associated with or employed in any form or type of casino gambling related operation in any jurisdiction? If yes, please describe.",
                                value: "Sec_6J_i_Checkbox",
                                condition: {
                                    properties: ["Sec_6J_i_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    }
                ]
            },
            // Page 5
            {
                text: "Civil, Criminal and Investigatory Proceedings",
                sections: [
                    {
                        text: "5A",
                        fields: [
                            {
                                text:
                                    "Have you ever been arrested or charged with any crime or offence in any jurisdiction? If yes, please describe.",
                                value: "Sec_7A_Yes_Table",
                                condition: {
                                    properties: ["Sec_7A_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Nature of Charge or Offence",
                                        value: "natureOfCharge"
                                    },

                                    {
                                        text: "Location of incident",
                                        value: "location"
                                    },

                                    {
                                        text: "Date of Arrest",
                                        value: "dateOfArrest",
                                        type: "Date"
                                    },

                                    {
                                        text: "Date of Charge or Offence",
                                        value: "dateOfCharge",
                                        type: "Date"
                                    },

                                    {
                                        text: "Name of Law Enforcement Agency or Court involved",
                                        value: "name"
                                    },

                                    {
                                        text: "Country of Law Enforcement Agency",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Outcome",
                                        value: "outcome",
                                        list: "Charge_Options"
                                    },

                                    {
                                        text: "If Others",
                                        value: "outcomeOthers"
                                    },

                                    {
                                        text: "Sentence",
                                        value: "sentence"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Have you ever been arrested or charged with any crime or offence in any jurisdiction? If yes, please describe.",
                                value: "Sec_7A_Checkbox",
                                condition: {
                                    properties: ["Sec_7A_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },
                    {
                        text: "5B",
                        fields: [
                            {
                                text:
                                    "Have you ever been the subject of an investigation conducted by any government agency / organisation, court, commission, committee, grand jury, the military or investigatory body (local, state, county, provincial, federal, national, etc.) other than in response to a traffic summons? If yes, please describe.",
                                value: "Sec_7C_Yes_Table",
                                condition: {
                                    properties: ["Sec_7C_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Name of Court or Agency",
                                        value: "name"
                                    },

                                    {
                                        text: "Country of Court or Agency",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Nature of Proceeding or Investigation",
                                        value: "natureOfProceeding"
                                    },

                                    {
                                        text: "Was Testimony Given?",
                                        value: "wasTestimonyGiven",
                                        type: "Boolean"
                                    },

                                    {
                                        text: "Date Testimony was given",
                                        value: "dateTestimony",
                                        type: "Date"
                                    },

                                    {
                                        text: "Case concluded?",
                                        value: "wasCaseConcluded",
                                        type: "Boolean"
                                    },

                                    {
                                        text: "Investigation period from",
                                        value: "investigationFrom",
                                        type: "Date"
                                    },

                                    {
                                        text: "Investigation period to",
                                        value: "investigationTo",
                                        type: "Date"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Have you ever been the subject of an investigation conducted by any government agency / organisation, court, commission, committee, grand jury, the military or investigatory body (local, state, county, provincial, federal, national, etc.) other than in response to a traffic summons? If yes, please describe.",
                                value: "Sec_7C_Checkbox",
                                condition: {
                                    properties: ["Sec_7C_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "5C",
                        fields: [
                            {
                                text:
                                    "i.Have you ever been called to testify, or otherwise been questioned, interviewed, deposed, or requested to take a polygraph exam by any government agency / organisation, court, commission, committee, grand jury or investigative body (local, state, county, provincial, federal, national, etc) in any jurisdiction other than in response to a traffic summon? If yes, please describe.",
                                title_class: "sub_label"
                            },
                            {
                                value: "Sec_7D_i_Yes_Table",
                                condition: {
                                    properties: ["Sec_7D_i_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Name of Court or Agency",
                                        value: "name"
                                    },

                                    {
                                        text: "Country of Court or Agency",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Nature of Proceeding or Investigation",
                                        value: "natureOfProceeding"
                                    },

                                    {
                                        text: "Was Testimony Given?",
                                        value: "wasTestimonyGiven",
                                        type: "Boolean"
                                    },

                                    {
                                        text: "Date Testimony was given",
                                        value: "dateTestimony",
                                        type: "Date"
                                    },

                                    {
                                        text: "Case concluded?",
                                        value: "wasCaseConcluded",
                                        type: "Boolean"
                                    },

                                    {
                                        text: "Investigation period from",
                                        value: "investigationFrom",
                                        type: "Date"
                                    },

                                    {
                                        text: "Investigation period to",
                                        value: "investigationTo",
                                        type: "Date"
                                    }
                                ]
                            },
                            {
                                value: "Sec_7D_i_Checkbox",
                                condition: {
                                    properties: ["Sec_7D_i_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            },
                            {
                                text:
                                    "ii.Have you ever been subpoenaed to or testify before a federal, national, state, county grand jury, or other criminal investigatory agency or body, or any board or commission, or any civil, criminal or administrative proceeding or hearing? If yes, please describe.",
                                title_class: "sub_label"
                            },
                            {
                                value: "Sec_7D_ii_Yes_Table",
                                condition: {
                                    properties: ["Sec_7D_ii_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Name of Court or Agency",
                                        value: "name"
                                    },

                                    {
                                        text: "Country of Court or Agency",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Nature of Proceeding or Investigation",
                                        value: "natureOfProceeding"
                                    },

                                    {
                                        text: "Was Testimony Given?",
                                        value: "wasTestimonyGiven",
                                        type: "Boolean"
                                    },

                                    {
                                        text: "Date Testimony was given",
                                        value: "dateTestimony",
                                        type: "Date"
                                    },

                                    {
                                        text: "Case concluded?",
                                        value: "wasCaseConcluded",
                                        type: "Boolean"
                                    },

                                    {
                                        text: "Investigation period from",
                                        value: "investigationFrom",
                                        type: "Date"
                                    },

                                    {
                                        text: "Investigation period to",
                                        value: "investigationTo",
                                        type: "Date"
                                    }
                                ]
                            },
                            {
                                value: "Sec_7D_ii_Checkbox",
                                condition: {
                                    properties: ["Sec_7D_ii_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "5D",
                        fields: [
                            {
                                text:
                                    "Have you ever received a pardon, or has any government agency / organisation agreed to dismiss, suspend or defer any criminal investigation or prosecution against you for any criminal offence? If yes, please describe.",
                                value: "Sec_7E_Yes_Table",
                                condition: {
                                    properties: ["Sec_7E_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Date of Pardon / Dismissal / Suspension / Deferral",
                                        value: "date",
                                        type: "Date"
                                    },

                                    {
                                        text: "Type of Action Taken",
                                        value: "typeOfActionTaken"
                                    },

                                    {
                                        text: "Name of Government / Organisation",
                                        value: "nameOfGovernment"
                                    },

                                    {
                                        text: "Country of Government / Organisation",
                                        value: "countryOfGovernment",
                                        list: "Country_Master"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Have you ever received a pardon, or has any government agency / organisation agreed to dismiss, suspend or defer any criminal investigation or prosecution against you for any criminal offence? If yes, please describe.",
                                value: "Sec_7E_Checkbox",
                                condition: {
                                    properties: ["Sec_7E_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "5E",
                        fields: [
                            {
                                text:"Have you ever been barred or otherwise excluded, for any reason, other than for the denial, suspension or revocation of a licence or registration, from any form or type of casino or gambling related operation* in any jurisdiction? If yes, please describe.",
                                value: "Sec_7I_Yes_Table",
                                condition: {
                                    properties: ["Sec_7I_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Name of Gambling Agency",
                                        value: "nameOfGamblingAgency"
                                    },

                                    {
                                        text: "Country of Gambling Agency",
                                        value: "countryOfGamblingAgency",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Date of Exclusion",
                                        value: "dateOfExclusion",
                                        type: "Date"
                                    },

                                    {
                                        text: "Reason for Exclusion",
                                        value: "reasonForExclusion"
                                    }
                                ]
                            },
                            {
                                text:"Have you ever been barred or otherwise excluded, for any reason, other than for the denial, suspension or revocation of a licence or registration, from any form or type of casino or gambling related operation* in any jurisdiction? If yes, please describe.",
                                value: "Sec_7I_Checkbox",
                                condition: {
                                    properties: ["Sec_7I_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    }
                ]
            },

            // Page 6
            {
                text: "Financial Data",
                sections: [
                    {
                        text: "6A",
                        fields: [
                            {
                                text:
                                    "Has any individual, local, city, county, provincial, state, federal, national, or any other governmental liens / debts been filed against you as an individual, sole proprietor, member of a partnership, or owner of a corporation in any jurisdiction? If yes, please describe.",
                                value: "Sec_8A_Yes_Table",
                                condition: {
                                    properties: ["Sec_8A_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Nature of Lien / Debt",
                                        value: "nature"
                                    },

                                    {
                                        text: "Date of Filing",
                                        value: "dateOfFiling",
                                        type: "Date"
                                    },

                                    {
                                        text: "Country where Lien / Debt has been filed",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Current Status",
                                        value: "status"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Has any individual, local, city, county, provincial, state, federal, national, or any other governmental liens / debts been filed against you as an individual, sole proprietor, member of a partnership, or owner of a corporation in any jurisdiction? If yes, please describe.",
                                value: "Sec_8A_Checkbox",
                                condition: {
                                    properties: ["Sec_8A_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },
                    {
                        text: "6B",
                        fields: [
                            {
                                text:
                                    "i.Have you ever been adjudicated bankrupt or filed a petition, or currently in the process of filing for any type of bankruptcy, insolvency or liquidation under any bankruptcy or insolvency law in any jurisdiction? If yes, please describe.",
                                title_class: "sub_label"
                            },
                            {
                                value: "Sec_8B_i_Yes_Table",
                                condition: {
                                    properties: ["Sec_8B_i_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Date of Filing",
                                        value: "dateOfFiling",
                                        type: "Date"
                                    },

                                    {
                                        text: "Docket / Case Number",
                                        value: "caseNumber"
                                    },

                                    {
                                        text: "Name of Court",
                                        value: "name"
                                    },

                                    {
                                        text: "Country of Court",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text:
                                            "Currently bankrupt / Filed a petition / In the process of filing?",
                                        value: "isCurrentlyBankrupt",
                                    }
                                ]
                            },
                            {
                                value: "Sec_8B_i_Checkbox",
                                condition: {
                                    properties: ["Sec_8B_i_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            },

                            {
                                text:
                                    "ii.Are you currently under any Debt Repayment Program* in any jurisdiction? If yes, please describe. Please include the current outstanding balance in Section 7B.",
                                title_class: "sub_label"
                            },
                            {
                                value: "Sec_8B_iii_Yes_Table",
                                condition: {
                                    properties: ["Sec_8B_iii_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Financial Repayment Insititution",
                                        value: "nameOfBank"
                                    },

                                    {
                                        text: "No of months of payment left",
                                        value: "numberOfPaymentMonthsLeft"
                                    },

                                    {
                                        text: "Date entered into Program",
                                        value: "dateEntered",
                                        type: "Date"
                                    },

                                    {
                                        text: "Name of Program",
                                        value: "nameOfProgram",
                                        list: "programOptions"
                                    },

                                    {
                                        text: "If Others",
                                        value: "nameOfProgramOthers"
                                    },

                                    {
                                        text:
                                            "Total Payable Amount Outstanding (Principle + interest) (SGD)",
                                        value: "totalPayableOutstanding"
                                    }
                                ]
                            },
                            {
                                value: "Sec_8B_iii_Checkbox",
                                condition: {
                                    properties: ["Sec_8B_iii_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "6C",
                        fields: [
                            {
                                text:
                                    "For the past 10 years or since the age of 18, whichever is lesser, has any business entity in which you hold a 5% or greater ownership interest, or in which you serve as an officer or director, been adjudicated bankrupt or filed a petition for any type of bankruptcy or insolvency under any bankruptcy or insolvency law? If yes, please describe.",
                                value: "Sec_8C_Yes_Table",
                                condition: {
                                    properties: ["Sec_8C_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Name of Business Entity",
                                        value: "nameOfEntity"
                                    },

                                    {
                                        text: "Country of Business Entity",
                                        value: "countryOfEntity",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Date of Filing",
                                        value: "dateOfFiling",
                                        type: "Date"
                                    },

                                    {
                                        text: "Docket / Case Number",
                                        value: "caseNumber"
                                    },

                                    {
                                        text: "Name of Court",
                                        value: "nameOfCourt"
                                    },

                                    {
                                        text: "Country of Court",
                                        value: "countryOfCourt",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Name of Filing Party",
                                        value: "nameOfFilingParty"
                                    },

                                    {
                                        text: "Case concluded?",
                                        value: "caseConcluded",
                                        type: "Boolean"
                                    }
                                ]
                            },
                            {
                                text:
                                    "For the past 10 years or since the age of 18, whichever is lesser, has any business entity in which you hold a 5% or greater ownership interest, or in which you serve as an officer or director, been adjudicated bankrupt or filed a petition for any type of bankruptcy or insolvency under any bankruptcy or insolvency law? If yes, please describe.",
                                value: "Sec_8C_Checkbox",
                                condition: {
                                    properties: ["Sec_8C_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "6D",
                        fields: [
                            {
                                text:
                                    "Have you as an individual, member of a partnership, or owner, director, or officer of a corporation ever been in a business entity that has been in liquidation, receivership or been placed under some form of government administration or monitoring? If yes, please describe.",
                                value: "Sec_8D_Yes_Table",
                                condition: {
                                    properties: ["Sec_8D_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Title / Position Held",
                                        value: "titleHeld"
                                    },

                                    {
                                        text: "Name of Business Entity",
                                        value: "nameOfBusiness"
                                    },

                                    {
                                        text: "Country of Business Entity",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Date placed under Liquidation, Receivership, etc.",
                                        value: "date",
                                        type: "Date"
                                    },

                                    {
                                        text: "Reason placed under Liquidation, Receivership, etc.",
                                        value: "reason"
                                    },

                                    {
                                        text: "Present Status of Business Entity",
                                        value: "status",
                                        list: "Business_Status_Options"
                                    },

                                    {
                                        text: "If Others",
                                        value: "statusOthers"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Have you as an individual, member of a partnership, or owner, director, or officer of a corporation ever been in a business entity that has been in liquidation, receivership or been placed under some form of government administration or monitoring? If yes, please describe.",
                                value: "Sec_8D_Checkbox",
                                condition: {
                                    properties: ["Sec_8D_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "6E",
                        fields: [
                            {
                                text:
                                    "Have your wages, earnings or other income been subject to garnishment, attachment, charging order and voluntary wage executioner for the past 10 years? If yes, please describe.",
                                value: "Sec_8E_Yes_Table",
                                condition: {
                                    properties: ["Sec_8E_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Date of Filing",
                                        value: "dateOfFiling",
                                        type: "Date"
                                    },

                                    {
                                        text: "Docket / Case Number",
                                        value: "caseNumber"
                                    },

                                    {
                                        text: "Name of Court",
                                        value: "nameofCourt"
                                    },

                                    {
                                        text: "Country of Court",
                                        value: "countryOfCourt",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Nature of Obligation",
                                        value: "natureOfObligation"
                                    },

                                    {
                                        text: "Currency",
                                        value: "obligationCurrency",
                                        list: "Currency_Master"
                                    },

                                    {
                                        text: "Amt",
                                        value: "obligationAmt"
                                    },

                                    {
                                        text: "Exchange Rate",
                                        value: "obligationExchangeRate"
                                    },

                                    {
                                        text: "SGD",
                                        value: "obligationSgd"
                                    },

                                    {
                                        text: "Name of Holder of Obligation",
                                        value: "nameofHolder"
                                    },

                                    {
                                        text: "Country of Holder of Obligation",
                                        value: "countryOfHolder",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Are you still currently under such obligation?",
                                        value: "underObligation"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Have your wages, earnings or other income been subject to garnishment, attachment, charging order and voluntary wage executioner for the past 10 years? If yes, please describe.",
                                value: "Sec_8E_Checkbox",
                                condition: {
                                    properties: ["Sec_8E_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "6F",
                        fields: [
                            {
                                text:
                                    "Have you had any assets (e.g. vehicles or real estate/land), repossessed by financial institutions in any jurisdiction for the past 10 years? If yes, please describe.",
                                value: "Sec_8F_Yes_Table",
                                condition: {
                                    properties: ["Sec_8F_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Type of Property",
                                        value: "type"
                                    },

                                    {
                                        text: "Country of Asset",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Date of Repossession",
                                        value: "date",
                                        type: "Date"
                                    },

                                    {
                                        text: "Reason for Repossession",
                                        value: "reason"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Have you had any assets (e.g. vehicles or real estate/land), repossessed by financial institutions in any jurisdiction for the past 10 years? If yes, please describe.",
                                value: "Sec_8F_Checkbox",
                                condition: {
                                    properties: ["Sec_8F_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "6G",
                        fields: [
                            {
                                text:
                                    "Do you own, hold, or have an interest in any assets in a trust in any jurisdiction? If yes, please describe.",
                                value: "Sec_8G_Yes_Table",
                                condition: {
                                    properties: ["Sec_8G_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Description of Trust",
                                        value: "description"
                                    },

                                    {
                                        text: "Country of Trust",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Name of Entity with Interests in Trust",
                                        value: "name"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Do you own, hold, or have an interest in any assets in a trust in any jurisdiction? If yes, please describe.",
                                value: "Sec_8G_Checkbox",
                                condition: {
                                    properties: ["Sec_8G_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "6H",
                        fields: [
                            {
                                text:
                                    "Do you hold, manage or control in trust, or otherwise, any assets or liabilities for another person or entity in any jurisdiction? If yes, please describe.",
                                value: "Sec_8H_Yes_Table",
                                condition: {
                                    properties: ["Sec_8H_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Description of Trust",
                                        value: "description"
                                    },

                                    {
                                        text: "Country of Trust",
                                        value: "country",
                                        list: "Country_Master"
                                    },

                                    {
                                        text: "Name of Entity with Interests in Trust",
                                        value: "name"
                                    }
                                ]
                            },
                            {
                                text:
                                    "Do you hold, manage or control in trust, or otherwise, any assets or liabilities for another person or entity in any jurisdiction? If yes, please describe.",
                                value: "Sec_8H_Checkbox",
                                condition: {
                                    properties: ["Sec_8H_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    },

                    {
                        text: "6I",
                        fields: [
                            {
                                text:
                                    "i.For the past 10 years, have you been the conduit of any cash or asset to anyone on behalf of a third party?",
                                title_class: "sub_label"
                            },
                            {
                                value: "Sec_8I_i_Yes_Table",
                                condition: {
                                    properties: ["Sec_8I_i_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Date Cash / Asset held",
                                        value: "dateCashHeld",
                                        type: "Date"
                                    },

                                    {
                                        text: "Currency",
                                        value: "cashCurrency",
                                        list: "Currency_Master"
                                    },

                                    {
                                        text: "Amt",
                                        value: "cashAmt"
                                    },

                                    {
                                        text: "Exchange Rate",
                                        value: "cashExchangeRate"
                                    },

                                    {
                                        text: "SGD",
                                        value: "cashSgd"
                                    },

                                    {
                                        text: "Reason for holding Cash / Asset",
                                        value: "reason"
                                    }
                                ]
                            },
                            {
                                value: "Sec_8I_i_Checkbox",
                                condition: {
                                    properties: ["Sec_8I_i_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            },
                            {
                                text:
                                    "ii.Do you currently hold any assets under your name or any entity you control for the benefit of a third party? If yes, please describe.",
                                title_class: "sub_label"
                            },
                            {
                                value: "Sec_8I_ii_Yes_Table",
                                condition: {
                                    properties: ["Sec_8I_ii_Checkbox"],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Date Cash / Asset held",
                                        value: "dateCashHeld",
                                        type: "Date"
                                    },

                                    {
                                        text: "Currency",
                                        value: "cashCurrency",
                                        list: "Currency_Master"
                                    },

                                    {
                                        text: "Amt",
                                        value: "cashAmt"
                                    },

                                    {
                                        text: "Exchange Rate",
                                        value: "cashExchangeRate"
                                    },

                                    {
                                        text: "SGD",
                                        value: "cashSgd"
                                    },

                                    {
                                        text: "Reason for holding Cash / Asset",
                                        value: "reason"
                                    }
                                ]
                            },
                            {
                                value: "Sec_8I_ii_Checkbox",
                                condition: {
                                    properties: ["Sec_8I_ii_Checkbox"],
                                    rule: "'{0}'=='No'"
                                }
                            }
                        ]
                    }
                ]
            },

            // Page 7_Assets
            {
                text: "Assets",
                sections: [
                    {
                        text: "7A",
                        fields: [
                            {
                                text: "Latest Month Gross Salary *Excluding bonuses (SGD)",
                                value: "cashLatestGrossSalary",
                                currencyFormat: true
                            },

                            {
                                text: "Cash"
                            },

                            {
                                text: "Cash on Hand",
                                value: "cashOnHand",
                                currencyFormat: true
                            },
                            // Cash in bank
                            {
                                text: "Cash in Bank"
                            },

                            {
                                value: "Sec_23_Asset_Cash_In_Bank",
                                cols: [
                                    {
                                        text: "Name of Bank",
                                        value: "nameOfBank"
                                    },

                                    {
                                        text: "Amount in Account (SGD)",
                                        value: "cashSgd",
                                        currencyFormat: true
                                    },

                                    {
                                        text: "% Attributable to you",
                                        value: "cashPercentageAttributable"
                                    },

                                    {
                                        text: "Account Type",
                                        value: "cashAccountType",
                                        list: "Account_Options"
                                    },

                                    {
                                        text: "Amount (SGD)",
                                        value: "cashAmt",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Cash Sub Total",
                                value: "AssetCashSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Real Estate
                            {
                                text: "Real Estate"
                            },

                            {
                                value: "Sec_23_Asset_Real_Estate",
                                cols: [
                                    {
                                        text: "Property Type",
                                        value: "propertyType",
                                        list: "Property_Type_Options"
                                    },

                                    {
                                        text: "Estimated Market Value (SGD)",
                                        value: "propertyMarketValueSgd",
                                        currencyFormat: true
                                    },

                                    {
                                        text: "Ownership %",
                                        value: "propertyOwnershipPercentage"
                                    },

                                    {
                                        text: "Description",
                                        value: "propertyDescription"
                                    },

                                    {
                                        text: "Amount (SGD)",
                                        value: "propertyAmt",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Real Estate Sub Total",
                                value: "RealEstateSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Vehicle
                            {
                                text: "Vehicle"
                            },

                            {
                                value: "Sec_23_Asset_Vehicle",
                                cols: [
                                    {
                                        text: "Vehicle Type",
                                        value: "vehicleType"
                                    },

                                    {
                                        text: "Description",
                                        value: "vehicleDescription"
                                    },

                                    {
                                        text: "Amount (SGD)",
                                        value: "vehicleAmt",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Vehicle Sub Total",
                                value: "VehicleSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Investment
                            {
                                text: "Investment"
                            },

                            {
                                value: "Sec_23_Asset_Investment",
                                cols: [
                                    {
                                        text: "Investment Type",
                                        value: "investmentType"
                                    },

                                    {
                                        text: "Description",
                                        value: "investmentDescription"
                                    },

                                    {
                                        text: "Amount (SGD)",
                                        value: "investmentAmt",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Investment Sub Total",
                                value: "InvestmentSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Others
                            {
                                text: "Others"
                            },

                            {
                                value: "Sec_23_Asset_Others",
                                cols: [
                                    {
                                        text: "Description",
                                        value: "othersDescription"
                                    },

                                    {
                                        text: "Amount (SGD)",
                                        value: "othersAmt",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Others Sub Total",
                                value: "OthersSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            {
                                text: "Total Assets (SGD)",
                                value: "TotalAssets",
                                currencyFormat: true
                            }
                        ]
                    },
                    //Page 7_Liability
                    {
                        text: "Liability"
                    },

                    {
                        text: "7B",
                        fields: [
                            // Debt Repayment Program
                            {
                                text: "Debt Repayment Program"
                            },

                            {
                                value: "Sec_23_Liabilities_Debt_Repayment_Program_Table",
                                cols: [
                                    {
                                        text: "Name of Bank",
                                        value: "nameOfBank"
                                    },

                                    {
                                        text: "No of months of payment left",
                                        value: "paymentMonthsLeft"
                                    },

                                    {
                                        text: "Date entered into Program",
                                        value: "dateEntered",
                                        type: "Date"
                                    },

                                    {
                                        text: "Name of Program",
                                        value: "nameOfProgram",
                                        list: "programOptions"
                                    },

                                    {
                                        text: "If Others",
                                        value: "nameOfProgramOthers"
                                    },

                                    {
                                        text:
                                            "Total Payable Amount Outstanding (Principle + interest) (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Debt Repayment Program Total",
                                value: "DebtRepaymentProgramSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Borrowings from Licensed Money Lenders
                            {
                                text: "Borrowings from Licensed Money Lenders"
                            },

                            {
                                value: "Sec_23_Liabilities_Licensed_Money_Lenders_Table",
                                condition: {
                                    properties: [
                                        "Sec_23_Liabilities_Licensed_Money_Lenders_Checkbox"
                                    ],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Name of LML",
                                        value: "name"
                                    },

                                    {
                                        text: "Loan Start Date",
                                        value: "loanStartDate",
                                        type: "Date"
                                    },

                                    {
                                        text: "Loan Tenure / Total Number of Months for Repayment",
                                        value: "periodOfLoanMonths"
                                    },

                                    {
                                        text: "Total Amount Borrowed (SGD)",
                                        value: "originalSgd",
                                        currencyFormat: true
                                    },

                                    {
                                        text: "Outstanding Amount Payable (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Borrowings from Licensed Money Lenders Sub Total",
                                value: "LicensedMoneyLendersSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Borrowings from Unlicensed Money Lenders
                            {
                                text: "Borrowings from Unlicensed Money Lenders"
                            },

                            {
                                value: "Sec_23_Liabilities_Unlicensed_Money_Lenders_Table",
                                condition: {
                                    properties: [
                                        "Sec_23_Liabilities_Unlicensed_Money_Lenders_Checkbox"
                                    ],
                                    rule: "'{0}'=='Yes'"
                                },
                                cols: [
                                    {
                                        text: "Name of UML",
                                        value: "name"
                                    },

                                    {
                                        text: "Loan Start Date",
                                        value: "borrowingDate",
                                        type: "Date"
                                    },

                                    {
                                        text: "Loan Tenure / Total Number of Months for Repayment",
                                        value: "periodOfLoanMonths"
                                    },

                                    {
                                        text: "Total Amount Borrowed (SGD)",
                                        value: "originalSgd",
                                        currencyFormat: true
                                    },

                                    {
                                        text: "Outstanding Amount Payable (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Borrowings from Unlicensed Money Lenders Sub Total",
                                value: "UnlicensedMoneyLendersSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Credit Card
                            {
                                text: "Credit Card"
                            },

                            {
                                value: "Sec_23_Liabilities_Credit_Card_Table",
                                cols: [
                                    {
                                        text:
                                            "Name of Bank and last 4 digits of your account number",
                                        value: "bankAndAccountLast4Digi"
                                    },

                                    {
                                        text:
                                            "Type of Debt (e.g. Outstanding Carried Forward, Instalment Plan etc)",
                                        value: "typeOfDebt"
                                    },

                                    {
                                        text: "No. of Instalments Paid (Months)",
                                        value: "instalmentsMonth"
                                    },

                                    {
                                        text: "Total No. of Instalments (Months)",
                                        value: "tenorOfInstalment"
                                    },

                                    {
                                        text: "Outstanding Amount Payable (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Credit Card Sub Total",
                                value: "CreditCardSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Overdraft
                            {
                                text: "Overdraft"
                            },

                            {
                                value: "Sec_23_Liabilities_Overdraft_Table",
                                cols: [
                                    {
                                        text:
                                            "Name of Bank and last 4 digits of your account number",
                                        value: "bankAndAccountLast4Digi"
                                    },

                                    {
                                        text: "No. of Instalments Paid (Months)",
                                        value: "instalmentsMonth"
                                    },

                                    {
                                        text: "Total No. of Instalments (Months)",
                                        value: "tenorOfInstalment"
                                    },

                                    {
                                        text: "Outstanding Amount Payable (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Overdraft Sub Total",
                                value: "OverdraftSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Mortgage Loan
                            {
                                text: "Mortgage Loan"
                            },

                            {
                                value: "Sec_23_Liabilities_Mortgage_Loan_Table",
                                cols: [
                                    {
                                        text: "Type of Property",
                                        value: "propertyType",
                                        list: "Property_Type_Options"
                                    },

                                    {
                                        text: "Outstanding Amount Payable (SGD)",
                                        value: "amountSgd",
                                        currencyFormat: true
                                    },

                                    {
                                        text: "% Attributable to you",
                                        value: "percentageAttributable"
                                    },

                                    {
                                        text: "Outstanding Amount Attributable to You (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Mortgage Loan Sub Total",
                                value: "MortgageLoanSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Vehicle Loan
                            {
                                text: "Vehicle Loan"
                            },

                            {
                                value: "Sec_23_Liabilities_Vehicle_Loan_Table",
                                cols: [
                                    {
                                        text: "Type of Vehicle",
                                        value: "typeOfVehicle"
                                    },

                                    {
                                        text: "Type of Loan",
                                        value: "typeOfLoan",
                                        list: "vehicleLoanOptions"
                                    },

                                    {
                                        text: "Total Amount Outstanding (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Vehicle Loan Sub Total",
                                value: "VehicleLoanSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Renovation Loan
                            {
                                text: "Renovation Loan"
                            },

                            {
                                value: "Sec_23_Liabilities_Renovation_Loan_Table",
                                cols: [
                                    {
                                        text: "Name of Bank / Credit Company",
                                        value: "nameOfBank"
                                    },

                                    {
                                        text: "No. of Instalments Paid (Months)",
                                        value: "instalmentsMonth"
                                    },

                                    {
                                        text: "Total No. of Instalments (Months)",
                                        value: "tenorOfInstalment"
                                    },

                                    {
                                        text: "Outstanding Amount Payable (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Renovation Loan Sub Total",
                                value: "RenovationLoanSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Study Loan
                            {
                                text: "Study Loan"
                            },

                            {
                                value: "Sec_23_Liabilities_Study_Loan_Table",
                                cols: [
                                    {
                                        text: "Name of Bank / Credit Company",
                                        value: "nameOfBank"
                                    },

                                    {
                                        text: "No. of Instalments Paid (Months)",
                                        value: "instalmentsMonth"
                                    },

                                    {
                                        text: "Total No. of Instalments (Months)",
                                        value: "tenorOfInstalment"
                                    },

                                    {
                                        text: "Outstanding Amount Payable (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Study Loan Sub Total",
                                value: "StudyLoanSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            // Other Loans
                            {
                                text: "Other Loans"
                            },

                            {
                                value: "Sec_23_Liabilities_Other_Loan_Table",
                                cols: [
                                    {
                                        text: "Loan Description",
                                        value: "description"
                                    },

                                    {
                                        text: "Amount Outstanding (SGD)",
                                        value: "totalPayableOutstandingSgd",
                                        currencyFormat: true
                                    }
                                ]
                            },

                            {
                                text: "Other Loans Sub Total",
                                value: "OtherLoansSubTotal",
                                title_class: "sub_label",
                                currencyFormat: true
                            },

                            {
                                text: "Total Liabilities (SGD)",
                                value: "TotalLiabilities",
                                currencyFormat: true
                            },

                            {
                                text: "Date of Statement",
                                value: "dateOfDeclaration",
                                type: "Date"
                            }
                        ]
                    }
                ]
            },

            // Page 8
            {
                text: "Acknowledgement",
                sections: [
                    {
                        text: "Billing Information",
                        condition: {
                            properties: ["isDisplayBillingInfo"],
                            rule: "'{0}'=='Yes'"
                        },
                        fields: [
                            {
                                text: "Business Name",
                                value: "businessName"
                            },

                            {
                                text: "Date of Incorporation",
                                value: "dateOfIncorporation",
                                type: "Date"
                            },

                            {
                                text: "Country of Incorporation",
                                value: "countryOfIncorporation",
                                list: "Country_Master"
                            },

                            {
                                text: "Business Registration Number",
                                value: "businessRegistrationNumber"
                            },

                            {
                                text: "Business Address",
                                value: "businessAddress"
                            },

                            {
                                text: "Business Telephone Number",
                                value: "businessTelephoneNumber"
                            },

                            {
                                text: "Business Fax Number",
                                value: "businessFaxNumber"
                            },

                            {
                                text: "Business Email",
                                value: "businessEmail"
                            },

                            {
                                text: "Website URL (if any)",
                                value: "websiteURL"
                            }
                        ]
                    },

                    {
                        text: "Contact Person 1",
                        condition: {
                            properties: ["isDisplayBillingInfo"],
                            rule: "'{0}'=='Yes'"
                        },
                        fields: [
                            {
                                text: "Name",
                                value: "personOneName"
                            },

                            {
                                text: "Contact Number ",
                                value: "personOneContactNumber"
                            },

                            {
                                text: "Email Address",
                                value: "personOneEmailAddress"
                            },

                            {
                                text: "Position Held",
                                value: "personOnePositionHeld"
                            }
                        ]
                    },

                    {
                        text: "Contact Person 2",
                        condition: {
                            properties: ["isDisplayBillingInfo"],
                            rule: "'{0}'=='Yes'"
                        },
                        fields: [
                            {
                                text: "Name",
                                value: "personTwoName"
                            },

                            {
                                text: "Contact Number ",
                                value: "personTwoContactNumber"
                            },

                            {
                                text: "Email Address",
                                value: "personTwoEmailAddress"
                            },

                            {
                                text: "Position Held",
                                value: "personTwoPositionHeld"
                            }
                        ]
                    },

                    {
                        fields: [
                            {
                                text:
                                    "I / I, having the authority to represent the Applicant or Associate, consent to electronic service of all correspondences including, but not limited to, summons, notice, order or any document from the Authority.",
                                value: "haveConsentElectricService",
                                type: "Boolean"
                            },

                            {
                                text: " Electronic service shall be made to ",
                                value: "email"
                            },

                            {
                                text:
                                    "I understand that the aforementioned email address will be used for electronic service and that it is my / the Applicant or Associate’s responsibility to update the Authority with any changes in the electronic service address.",
                                value: "haveUnderstandEmailUsed",
                                type: "Boolean"
                            },

                            {
                                text:
                                    " I agree to provide acknowledgement of receipt for every instance of correspondence received.",
                                value: "willProvideAcknowledgementReceipt",
                                type: "Boolean"
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

export { getAPHDFPDFTemplate };
