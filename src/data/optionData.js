export function getOptions() {
    return {
        Gender_Options: [
            { value: "100000000", label: "Male" },
            { value: "100000001", label: "Female" }
        ],
        Citizenship_Type_Options: [
            { value: "100000000", label: "Singapore Citizen" },
            { value: "100000001", label: "Permanent Resident" },
            { value: "100000002", label: "Work Pass Holder" },
            { value: "100000003", label: "Others" }
        ],
        Entity_Type_Options: [
          { value: "100000000", label: "Company registered with ACRA" },
          { value: "100000001", label: "Society registered with ROS" },
          { value: "100000002", label: "Others" }
        ],
        Foreign_Citizenship_Options: [
            { value: "100000000", label: "Citizen" },
            { value: "100000001", label: "Permanent Resident" }
        ],
        Address_Type_Options: [
            { value: "100000000", label: "Apt Blk" },
            { value: "100000001", label: "Without Apt Blk" },
            { value: "100000002", label: "Overseas Address" },
            { value: "100000003", label: "Private Flats with Apt Blk" },
            { value: "100000004", label: "C/O Apt Blk" },
            { value: "100000005", label: "C/O Without Apt Blk" },
            { value: "100000006", label: "Quarter Address" },
            { value: "100000007", label: "Island Address" },
            { value: "100000008", label: "Reverse of AptBlk & StrName" },
            { value: "100000009", label: "NIL" }
        ],
        Scar_Options: [
            { value: "100000000", label: "Marks" },
            { value: "100000001", label: "Scars" },
            { value: "100000002", label: "Tattoos" },
            { value: "100000003", label: "Characteristics" }
        ],
        Tattoo_Options: [
            { value: "6b394ffa-7ac3-eb11-9676-005056b57f58", label: "Amphibian" },
            { value: "6c394ffa-7ac3-eb11-9676-005056b57f58", label: "Animal Forms - Mythology" },
            { value: "4390b605-7bc3-eb11-9676-005056b57f58", label: "Bird" },
            { value: "4490b605-7bc3-eb11-9676-005056b57f58", label: "Characters" },
            {
                value: "d0797f0e-7bc3-eb11-9676-005056b57f58",
                label: "Fantasy / Fairy Tale / Cartoon"
            }
            /*{ value: "00000000-0000-0000-0000-000000000006", label: "Fish" },
			 { value: "00000000-0000-0000-0000-000000000007", label: "Human Likeness - Mythology / Religion" },
			 { value: "00000000-0000-0000-0000-000000000008", label: "Insects" },
			 { value: "00000000-0000-0000-0000-000000000009", label: "Insignias / Symbols" },
			 { value: "00000000-0000-0000-0000-000000000010", label: "Mammal in Animal Form" },
			 { value: "00000000-0000-0000-0000-000000000011", label: "Mammal in Human Form" },
			 { value: "00000000-0000-0000-0000-000000000012", label: "Mixture" },
			 { value: "00000000-0000-0000-0000-000000000013", label: "Objects" },
			 { value: "00000000-0000-0000-0000-000000000014", label: "Plants / Trees" },
			 { value: "00000000-0000-0000-0000-000000000015", label: "Reptile" },
			 { value: "00000000-0000-0000-0000-000000000016", label: "Shapes" },
			 { value: "00000000-0000-0000-0000-000000000017", label: "Shellfish" },
			 { value: "00000000-0000-0000-0000-000000000018", label: "Unknown" },
			 { value: "00000000-0000-0000-0000-000000000019", label: "Others" },*/
        ],
        Body_Options: [
            { value: "3c6e9a32-7bc3-eb11-9676-005056b57f58", label: "Ankle" },
            { value: "3d6e9a32-7bc3-eb11-9676-005056b57f58", label: "Arm" },
            { value: "53c0fc38-7bc3-eb11-9676-005056b57f58", label: "Back of body" },
            { value: "54c0fc38-7bc3-eb11-9676-005056b57f58", label: "Belly" },
            { value: "99d49c3f-7bc3-eb11-9676-005056b57f58", label: "Breast" },
            { value: "9ad49c3f-7bc3-eb11-9676-005056b57f58", label: "Buttock" },
            { value: "f6323446-7bc3-eb11-9676-005056b57f58", label: "Calf" },
            { value: "f7323446-7bc3-eb11-9676-005056b57f58", label: "Chest" },
            { value: "f8323446-7bc3-eb11-9676-005056b57f58", label: "Chin" },
            { value: "8c08464f-7bc3-eb11-9676-005056b57f58", label: "Ear" }
            /*{ value: "00000000-0000-0000-0000-000000000011", label: "Eyebrow" },
			 { value: "00000000-0000-0000-0000-000000000012", label: "Eye" },
			 { value: "00000000-0000-0000-0000-000000000013", label: "Elbow" },
			 { value: "00000000-0000-0000-0000-000000000014", label: "Eyelid" },
			 { value: "00000000-0000-0000-0000-000000000015", label: "Forearm" },
			 { value: "00000000-0000-0000-0000-000000000016", label: "Face" },
			 { value: "00000000-0000-0000-0000-000000000017", label: "Forehead" },
			 { value: "00000000-0000-0000-0000-000000000018", label: "Finger" },
			 { value: "00000000-0000-0000-0000-000000000019", label: "Front of body" },
			 { value: "00000000-0000-0000-0000-000000000020", label: "Foot" },
			 { value: "00000000-0000-0000-0000-000000000021", label: "Groin" },
			 { value: "00000000-0000-0000-0000-000000000022", label: "Hand" },
			 { value: "00000000-0000-0000-0000-000000000023", label: "Hip" },
			 { value: "00000000-0000-0000-0000-000000000024", label: "Jaw" },
			 { value: "00000000-0000-0000-0000-000000000025", label: "Knee" },
			 { value: "00000000-0000-0000-0000-000000000026", label: "Leg" },
			 { value: "00000000-0000-0000-0000-000000000027", label: "Lips" },
			 { value: "00000000-0000-0000-0000-000000000028", label: "Mouth" },
			 { value: "00000000-0000-0000-0000-000000000029", label: "Neck" },
			 { value: "00000000-0000-0000-0000-000000000030", label: "Nose" },
			 { value: "00000000-0000-0000-0000-000000000031", label: "Navel" },
			 { value: "00000000-0000-0000-0000-000000000032", label: "Side of body" },
			 { value: "00000000-0000-0000-0000-000000000033", label: "Shoulder" },
			 { value: "00000000-0000-0000-0000-000000000034", label: "Shin" },
			 { value: "00000000-0000-0000-0000-000000000035", label: "Teeth" },
			 { value: "00000000-0000-0000-0000-000000000036", label: "Thigh" },
			 { value: "00000000-0000-0000-0000-000000000037", label: "Toe" },
			 { value: "00000000-0000-0000-0000-000000000038", label: "Upper arm" },
			 { value: "00000000-0000-0000-0000-000000000039", label: "Waist" },
			 { value: "00000000-0000-0000-0000-000000000040", label: "Whole body" },
			 { value: "00000000-0000-0000-0000-000000000041", label: "Wrist" },*/
        ],
        Ownership_Options: [
            { value: "100000000", label: "Own" },
            { value: "100000001", label: "Rent" },
            { value: "100000002", label: "Parents" },
            { value: "100000003", label: "Others" }
        ],
        Marital_Options: [
            { value: "100000000", label: "Single" },
            { value: "100000001", label: "Engaged" },
            { value: "100000002", label: "Married" },
            { value: "100000003", label: "Cohabited" },
            { value: "100000004", label: "Separated" },
            { value: "100000005", label: "Divorced" },
            { value: "100000006", label: "Widowed" }
        ],
        Relationship_Options: [
            { value: "100000000", label: "Father" },
            { value: "100000001", label: "Mother" },
            { value: "100000002", label: "Daughter" },
            { value: "100000003", label: "Son" },
            { value: "100000004", label: "Brother" },
            { value: "100000005", label: "Sister" },
            { value: "100000006", label: "Father-in-law" },
            { value: "100000007", label: "Mother-in-law" },
            { value: "100000008", label: "Brother-in-law" },
            { value: "100000009", label: "Sister-in-law" },
            { value: "100000010", label: "Others" }
        ],
        Qualification_Options: [
            { value: "100000000", label: "Sec Edn w/o GCE 'O' or 'N' pass" },
            { value: "100000001", label: "GCE 'N' Level" },
            { value: "100000002", label: "GCE 'O' Level" },
            { value: "100000003", label: "Vocational Institute" },
            { value: "100000004", label: "Trade Certificate" },
            { value: "100000005", label: "Technical Institute" },
            { value: "100000006", label: "Other Sec Sch Leaving Exam Cert" },
            { value: "100000007", label: "GCE 'A' Level" },
            { value: "100000008", label: "Certificate/Diploma" },
            { value: "100000009", label: "Bachelor Degree" },
            { value: "100000010", label: "Honours" },
            { value: "100000011", label: "Postgraduate Diploma" },
            { value: "100000012", label: "Master Degree" },
            { value: "100000013", label: "Doctorate" },
            { value: "100000014", label: "Others" }
        ],
        Business_Options: [
            { value: "00000000-0000-0000-0000-000000000001", label: "Live" },
            { value: "00000000-0000-0000-0000-000000000002", label: "Terminated" },
            { value: "00000000-0000-0000-0000-000000000003", label: "Cancelled" },
            { value: "00000000-0000-0000-0000-000000000004", label: "Cancellation in progress" },
            { value: "00000000-0000-0000-0000-000000000005", label: "In receivership" },
            { value: "00000000-0000-0000-0000-000000000006", label: "To be terminated" },
            { value: "00000000-0000-0000-0000-000000000007", label: "Judicial management" },
            { value: "00000000-0000-0000-0000-000000000008", label: "In liquidation" },
            { value: "00000000-0000-0000-0000-000000000009", label: "Ceased" },
            { value: "00000000-0000-0000-0000-000000000010", label: "Converted to LLP" },
            {
                value: "00000000-0000-0000-0000-000000000011",
                label: "Registration expired and has not been renewed"
            },
            { value: "00000000-0000-0000-0000-000000000012", label: "Others" }
        ],
        Application_Options: [
            { value: "100000000", label: "Granted" },
            { value: "100000001", label: "Denied" },
            { value: "100000002", label: "Pending" }
        ],
        Charge_Options: [
            { value: "100000000", label: "Convicted" },
            { value: "100000001", label: "Acquitted" },
            { value: "100000002", label: "Dismissed" },
            { value: "100000003", label: "Pending" },
            { value: "100000004", label: "Pardon" },
            { value: "100000005", label: "Taken into consideration" },
            { value: "100000006", label: "Discharged amounting to acquittal" },
            { value: "100000007", label: "Discharge - Conditional discharge" },
            { value: "100000008", label: "Probation" },
            { value: "100000009", label: "No further action" },
            { value: "100000010", label: "Warning" },
            { value: "100000011", label: "Others" }
        ],
        Business_Status_Options: [
            { value: "100000000", label: "Amalgamated" },
            { value: "100000001", label: "Ceased Registration" },
            { value: "100000002", label: "Converted to LLP" },
            { value: "100000003", label: "Dissolved (Foreign CO)" },
            { value: "100000004", label: "Dissolved - Compulsory Winding up (Insolvency)" },
            { value: "100000005", label: "Dissolved - Creditors' Voluntary Winding up" },
            { value: "100000006", label: "Dissolved - Members' Voluntary Winding up" },
            {
                value: "100000007",
                label: "Dissolved - Pursuant to Section 212(1)(D0 of the Companies Act"
            },
            { value: "100000008", label: "Gazetted to be Struck off" },
            { value: "100000009", label: "In Liquidation (Foreign CO)" },
            { value: "100000010", label: "In Liquidation - Compulsory Winding" },
            { value: "100000011", label: "In Liquidation - Compulsory Winding up (Insolvency)" },
            { value: "100000012", label: "In Liquidation - Creditors' Voluntary Winding up" },
            { value: "100000013", label: "In Liquidation - Members' Voluntary Winding up" },
            { value: "100000014", label: "In Receivership" },
            { value: "100000015", label: "Live Company" },
            { value: "100000016", label: "Registration Expired and has not been Renewed" },
            { value: "100000017", label: "Struck off" },
            { value: "100000018", label: "Terminated" },
            { value: "100000019", label: "To be Terminated" },
            { value: "100000020", label: "Under Judicial Management" },
            { value: "100000021", label: "Others" }
        ],
        Account_Options: [
            { value: "983740000", label: "Current" },
            { value: "983740001", label: "Savings" },
            { value: "983740002", label: "Multi-Currency" },
            { value: "983740003", label: "Fixed Deposit" },
            { value: "983740004", label: "Others" }
        ],
        Property_Options: [
            { value: "100000000", label: "Government Housing" },
            { value: "100000001", label: "Condominium" },
            { value: "100000002", label: "Landed" },
            { value: "100000003", label: "Shop house" },
            { value: "100000004", label: "Others" }
        ],
        Single_Joint_Options: [
            { value: "100000000", label: "Single" },
            { value: "100000001", label: "Joint" }
        ],
        Creditor_Options: [
            { value: "100000000", label: "Financial institution" },
            { value: "100000001", label: "Licensed money lender" },
            { value: "100000002", label: "Unlicensed money lender" },
            { value: "100000003", label: "Others" }
        ],
        Payables_Options: [
            { value: "100000000", label: "Credit card" },
            { value: "100000001", label: "Renovation loan" },
            { value: "100000002", label: "Study loan" },
            { value: "100000003", label: "Personal loan" },
            { value: "100000004", label: "Lines of credit / overdrafts" },
            { value: "100000005", label: "Instalment loan" },
            { value: "100000006", label: "Hire purchase" },
            { value: "100000007", label: "Others" }
        ],
        Tax_Options: [
            { value: "100000000", label: "Income tax" },
            { value: "100000001", label: "Property tax" }
        ],
        Mortgage_Options: [
            { value: "100000000", label: "Mortgage" },
            { value: "100000001", label: "Bridging loan" }
        ],
        Loans_Options: [
            { value: "100000000", label: "Securities" },
            { value: "100000001", label: "Insurance" },
            { value: "100000002", label: "Pension plan" }
        ],
        Yes_No_Options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" }
        ],
        Country_Master: [
            {
              "value": "99fd1934-de07-ec11-9677-005056893cf5",
              "label": "China"
            },
            {
              "value": "87062c2a-860f-ec11-9678-005056893cf5",
              "label": "Germany"
            },
            {
              "value": "e7b317f6-de07-ec11-9677-005056893cf5",
              "label": "India"
            },
            {
              "value": "1ff95f98-f703-ec11-9671-0050568924a1",
              "label": "Japan"
            },
            {
              "value": "21f95f98-f703-ec11-9671-0050568924a1",
              "label": "japan"
            },
            {
              "value": "09b03876-6ab1-eb11-966c-005056b57f58",
              "label": "Japan"
            },
            {
              "value": "dcb4537e-c8d3-eb11-967c-005056b57f58",
              "label": "japan"
            },
            {
              "value": "4bce0f11-860f-ec11-9678-005056893cf5",
              "label": "Korea"
            },
            {
              "value": "96077c08-860f-ec11-9678-005056893cf5",
              "label": "Malaysia"
            },
            {
              "value": "9853ce96-69b1-eb11-966c-005056b57f58",
              "label": "Singapore"
            },
            {
              "value": "02716e61-c8d3-eb11-967c-005056b57f58",
              "label": "Singapore"
            },
            {
              "value": "23f95f98-f703-ec11-9671-0050568924a1",
              "label": "Sri Lanka"
            },
            {
              "value": "123017fe-850f-ec11-9678-005056893cf5",
              "label": "Thailand"
            },
            {
              "value": "d2af8019-cfd3-eb11-967c-005056b57f58",
              "label": "Tokyo"
            },
            {
              "value": "c26a56f7-850f-ec11-9678-005056893cf5",
              "label": "UK"
            },
            {
              "value": "ea7787e1-de07-ec11-9677-005056893cf5",
              "label": "US"
            }
          ],
        Citizenship_Options: [
            { value: "c7690930-7fc3-eb11-9676-005056b57f58", label: "Singaporean" }
        ],
        Currency_Options: [
            { value: "7b1384ba-b4c8-eb11-9676-005056b57f58", label: "VND" },
            { value: "9d42069a-fcbc-eb11-9676-005056b57f58", label: "EUR" },
            { value: "91f9b571-bbae-eb11-966c-005056b57f58", label: "SGD" },
            { value: "1f5ca3ee-91c7-eb11-9676-005056b57f58", label: "USD" }
        ],
        Race_Options: [
            { value: "f8ec0c20-7ac3-eb11-9676-005056b57f58", label: "Chinese" },
            { value: "45a62826-7ac3-eb11-9676-005056b57f58", label: "Malay" },
            //{ value: "7de04e20-83b7-eb11-966c-005056b57f58", label: "Test" }
        ],
        Information_Nil_Options: [
            { value: "Yes", label: "Information To Provide" },
            { value: "No", label: "Nil" }
        ],
        Program_Options: [
            { value: "100000000", label: "DCP" },
            { value: "100000001", label: "DMP" },
            { value: "100000002", label: "DRS" },
            { value: "100000003", label: "AKPK" },
            { value: "100000004", label: "Others" }
        ]
    };
}
