import axios from 'axios';
import ApiJson from './api-json';
// let apiFailCounter = 0;
import Config from './Config';
axios.defaults.baseURL = Config.API_URL;

const appApiService = (apiKeyName, data) => {
    let apiDetails = ApiJson[apiKeyName];
  
    if (!apiDetails) {
      console.log(
        'Api configuration do not found in api-json, please check api-json.js'
      );
      throw new Error(
        'Api configuration do not found in api-json, please check api-json.js'
      );
      return;
    }
  
    let requestObject = Object.assign({}, apiDetails); //apiDetails; using deep clone
    requestObject.data = prepareDataObject(requestObject.data, data);
    if (requestObject.nodeUrl) {
      requestObject.url = injectParamsToUrl(
        NodeAPIURL + requestObject.nodeUrl,
        data
      );
    } else {
      requestObject.url = injectParamsToUrl(requestObject.url, data);
    }
  
    return axios(requestObject)
      .then(function(result) {
        // console.log('result', result);
  
        // apiFailCounter = 0;
        // if (result.data && result.data.status && result.data.status === 200) {
        if (result.data) {
            // if (result.data.responseMessage) {
            //     const message = result.data.responseMessage;
            //     if (requestObject.showResultMessage === true)
            //     showSuccessToast(message);
            // }

            
            
        } else {
        
          // In 200 response status we get status in data object to detect error or success
          handleErrorBySatusCode(result.data);
        }
  
        //Custom message will display in case of login
        if (result.data && result.data.customMessage) {
          const message = result.data.customMessage;
          if (requestObject.showResultMessage === true) showSuccessToast(message);
        }
        return result;
      })
      .catch(function(error) {
        console.log('error', error);
        if (error && error.response) {
          if (requestObject.showErrorMessage === true)
            handleErrorBySatusCode(error.response);
        }
  
        if (
          error.config.maxContentLength - 1 &&
          error.toString().indexOf('Network Error') > -1
        ) {
        //   apiFailCounter++;
        //   if (apiFailCounter >= 3) {
        //     removeCookie('userInfo');
        //     window.open(window.location.origin, '_self');
        //   }
        }
  
        return error.response;
      });
  };

  const prepareDataObject = (_data_, paramObj) => {
    for (let key in _data_) {
      if (paramObj[key] || paramObj[key] === false) {
        _data_[key] = paramObj[key];
      } else {
        if (typeof _data_[key] !== 'object') _data_[key] = '';
      }
    }
    return _data_;
  };

  const injectParamsToUrl = (_url_, paramObj) => {
    var url = _url_;
    for (let key in paramObj) {
      url = url.replace(':' + key, paramObj[key]);
    }
    return url;
  };

  const handleErrorBySatusCode = error => {
    switch (error.status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 405:
      case 409:
      case 422:
        //console.log('switch case error', error);
        if (error && error.data && error.data.error_description) {
          const message = error.data.error_description;
        //   handleApiError(message);
        }
        if (error && error.data && error.data.message) {
          const message = error.data.message;
        //   handleApiError(message);
        }
        if (error.responseMessage) {
          const message = error.responseMessage;
        //   handleApiError(message);
        }
        break;
      default:
        console.log('switch case error', error);
        break;
    }
  };
  
  export default appApiService;