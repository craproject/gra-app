/* For Development */
// const getConfigUrl=async ()=>{
//     let configData = await await (await fetch("data/grademo/configs.json")).json();
//     return configData.apiBaseUrl
// }


// const baseUrl = configUrl
// const wsAuthenWidgetGetUrl = `${baseUrl}/get`;
// const wsAuthenWidgetSubmitUrl = `${baseUrl}/Submit`;
// const wsRetrieveMyInfoUrl = `${baseUrl}/GetSingpassUserInfo`;
// const wsAuthenWidgetDeletetUrl = `${baseUrl}/DeleteAPHDFSubRecordPOST`;


const wsAuthenWidgetGetUrl = `/APICall-api/APICall/GetAPIDATA`;
const wsAuthenWidgetSubmitUrl = `/APICall-api/APICall/POSTData`;
//const wsRetrieveMyInfoUrl = `/myInfo-api/MyInfo/GetSingpassUserInfo`; // `/api/APHDFApplication/retrieve-my-info`;

const GraAppGetUrl = `GRAGET`;
const GraAppSubmitUrl = `GRAPOST`;
// const craRetrieveMyInfoUrl = "http://cra.local/myInfo-api/MyInfo/GetSingpassUserInfo";

// Change URL base on Alex requested on 02 Sep
//const craRetrieveMyInfoUrl =
 //   "https://websparkstestapi.azure-api.net/myInfo/gov/v3/person-basic/{uinfin}/";

//const tableDeleteAPI_NEC ="DeleteAPHDFSubRecordPOST";

export {
    wsAuthenWidgetGetUrl,
    wsAuthenWidgetSubmitUrl,
    //wsRetrieveMyInfoUrl,
    GraAppGetUrl,
    GraAppSubmitUrl,
    // baseUrl
    //craRetrieveMyInfoUrl,
    // wsAuthenWidgetDeletetUrl,
    //tableDeleteAPI_NEC
};
