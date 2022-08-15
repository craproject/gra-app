import { apiBase, ensureSuccessResponse } from "@/apiServices/apiBase";
import {
    //parseMyInfoDataAndCommitToStore,
    parseSectionDataAndCommitToStore
} from "@/apiServices/dataParsing";
import {
    GraAppGetUrl,
    GraAppSubmitUrl,
    //craRetrieveMyInfoUrl,
    wsAuthenWidgetGetUrl,
    wsAuthenWidgetSubmitUrl
    //wsRetrieveMyInfoUrl
    // getAphdfUrl,
    // retrieveMyInfoUrl,
    // submitAphdfUrl
} from "@/apiServices/urls";

export default {
    commitSectionData(context, data) {
        let pageIndex = context.getters.getCurrentPageIndex;
        // let prevPageIndex = context.getters.getPreviousPageIndex;

        console.log(`section ${pageIndex}:  ${data}`);

        parseSectionDataAndCommitToStore(pageIndex, data);
    },
    postAppData(context, data) {
        return apiBase
            .post(
                wsAuthenWidgetSubmitUrl,
                {
                    data: data,
                    url: GraAppSubmitUrl
                    // params: {
                    //     CRM_ID: context.getters.getCrmId,
                    //     currentpage: data[1],
                    //     nextpage: data[2]
                    // }
                }
                // {
                //     params: {
                //         CRM_ID: context.getters.getCrmId,
                //         currentpage: context.getters.getCurrentPageIndex,
                //         nextpage:
                //     }
                // }
            )
            .then(response => {
                if (!ensureSuccessResponse(response)) return false;

                // Parse result
                let responseData = response.data.Data[0];

                console.log("responseData: ", JSON.stringify(responseData, null, 4));

                return true;
                // console.log("commit to store post for section: "+parseInt(context.getters.getCurrentPageIndex));
                // parseSectionDataAndCommitToStore(
                //     // parseInt(context.getters.getCurrentPageIndex) + 1,
                //     parseInt(context.getters.getCurrentPageIndex),
                //     responseData
                // );
            });
    },
    // postGraData(context, data){
    //     console.log('postGraData:',data[0])
    //     let submitUrl= data[1]
    //     console.log('submitUrl:',submitUrl)

    //     return apiBase
    //     .post(
    //         submitUrl,
    //         {
    //             data: data[0],
    //             url: GraAppSubmitUrl,
    //             params: { data: data[0]}
    //         }
    //         // {
    //         //     params: {
    //         //         CRM_ID: context.getters.getCrmId,
    //         //         currentpage: context.getters.getCurrentPageIndex,
    //         //         nextpage:
    //         //     }
    //         // }
    //     )
    //     .then(response => {
    //         // if (!ensureSuccessResponse(response)) return;

    //         // Parse result
    //         // let responseData = response.data.Data[0];
    //         let responseData=response

    //         console.log('postGraData API Status: ' +JSON.stringify(responseData, null, 4));
    //         return true
    //         // console.log("commit to store post for section: "+parseInt(context.getters.getCurrentPageIndex));
    //         // parseSectionDataAndCommitToStore(
    //         //     // parseInt(context.getters.getCurrentPageIndex) + 1,
    //         //     parseInt(context.getters.getCurrentPageIndex),
    //         //     responseData
    //         // );
    //     });
    // },

    // Get App data
    getSectionData(context) {
        return apiBase
            .post(
                wsAuthenWidgetGetUrl,
                {
                    url: GraAppGetUrl,
                    params: {
                        CRM_ID: context.getters.getCrmId
                    }
                },
                {
                    params: {
                        CRM_ID: context.getters.getCrmId,
                        currentpage: context.getters.getCurrentPageIndex
                    }
                }
            )
            .then(response => {
                if (!ensureSuccessResponse(response)) return;

                // Parse result
                let responseData = response.data.Data[0];
                console.log(
                    "commit to store get for section: " + context.getters.getCurrentPageIndex
                );
                let pageIndex = context.getters.getCurrentPageIndex;
                let prevPageIndex = context.getters.getPreviousPageIndex;

                if (pageIndex > 1) {
                    parseSectionDataAndCommitToStore(prevPageIndex, responseData); //for previous page commit instead of getting from postdata
                }
                parseSectionDataAndCommitToStore(pageIndex, responseData);
            });
    }

    // postAppData(context, data) {
    //     return apiBase
    //         .post(
    //             wsAuthenWidgetSubmitUrl,
    //             {
    //                 data: data[0],
    //                 url: GraAppSubmitUrl,
    //                 // params: {
    //                 //     CRM_ID: context.getters.getCrmId,
    //                 //     currentpage: data[1],
    //                 //     nextpage: data[2]
    //                 // }
    //             }
    //             // {
    //             //     params: {
    //             //         CRM_ID: context.getters.getCrmId,
    //             //         currentpage: context.getters.getCurrentPageIndex,
    //             //         nextpage:
    //             //     }
    //             // }
    //         )
    //         .then(response => {
    //             if (!ensureSuccessResponse(response)) return;

    //             // Parse result
    //             // let responseData = response.data.Data[0];

    //             // console.log(JSON.stringify(responseData, null, 4));
    //             // console.log("commit to store post for section: "+parseInt(context.getters.getCurrentPageIndex));
    //             // parseSectionDataAndCommitToStore(
    //             //     // parseInt(context.getters.getCurrentPageIndex) + 1,
    //             //     parseInt(context.getters.getCurrentPageIndex),
    //             //     responseData
    //             // );
    //         });
    // },

    // Section 1

    /*retrieveMyInfo(context, data) {
        console.log("data.UIN_BRN in action: " + data.UIN_BRN);
        return apiBase
            .get(wsRetrieveMyInfoUrl, {
                params: {
                    uen: data.UIN_BRN
                }
            })
            .then(response => {
                // if (!ensureSuccessResponse(response)) return;

                let data = response.data;
                parseMyInfoDataAndCommitToStore(data);
            });
    }*/
};
