// import { baseUrl } from "@/apiServices/urls";
import axios from "axios";
import store from "@/store";

const apiBase = axios.create({
    // baseURL: baseUrl
});

// Add a request interceptor
apiBase.interceptors.request.use(function(config) {
    store.commit("setLoading", true);

    return config;
});

// Add a response interceptor
apiBase.interceptors.response.use(
    function(response) {
        store.commit("setLoading", false);
        
        let data = response.data;
        if(data["IsSuccessful"]){
            store.commit("setIsRequestSuccess", true);
        }
        else{
            if(data["Errors"]){
                store.commit("setIsRequestSuccess", false);
            }
        }

        return response;
    },
    error => {
        store.commit("setLoading", false);
        store.commit("addAppError", error.message);
        store.commit("setIsRequestSuccess", false);

        return Promise.reject(error);
    }
);

/** Check both API response Status code and response data to make sure request is success */
function ensureSuccessResponse(response) {
    let isSuccess = response.data.IsSuccessful;

    if (isSuccess === undefined) {
        store.commit("addAppError", "Server return invalid message");

        return false;
    }

    if (!isSuccess) {
        store.commit("addAppError", response.data.Errors[0]["ErrorMessage"]);

        return false;
    }

    return true;
}

function buildErrorMessage(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
}

export { apiBase, ensureSuccessResponse };
