export default function useRequiredAddressPart() {
    function getNotRequiredProps(addressType) {
        let addressTypeOptions = [
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
        ];

        let addressTypeText = this.getOptionText(
            addressTypeOptions,
            this.mailingAddress.mailingAddressType
        );

        switch (addressTypeText) {
            case "Apt Blk": {
                return ["Building"];
            }
            case "Without Apt Blk": {
                return ["Floor", "Unit", "Building"];
            }
            case "Overseas Address": {
                return ["Blk", "Floor", "Unit", "Building", "PostalCode"];
            }
            case "Private Flats With Apt Blk": {
                return ["Floor", "Unit", "Building"];
            }
            case "C/O Apt Blk": {
                return ["Building"];
            }
            case "C/O Without Apt Blk": {
                return ["Floor", "Unit", "Building"];
            }
            case "Quarter Address": {
                return ["Blk", "Floor", "Building"];
            }
            case "Island Address": {
                return ["Blk", "Floor", "Unit", "Building", "PostalCode"];
            }
            case "Reverse of AptBlk & StrName": {
                return ["Blk", "Floor", "Unit", "Building"];
            }
            case "NIL": {
                return ["Blk", "Street", "Floor", "Unit", "Building", "PostalCode", "Country"];
            }
        }
    }

    return { getNotRequiredProps };
}
