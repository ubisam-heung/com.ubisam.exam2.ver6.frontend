import qs from "qs";
import $axios from "axios";

const name = "[/assets/backend/base.js]";

const $base = {

  ////////////////////////////////////
  // api Utils..
  ////////////////////////////////////
  api : {
    
    execute(options) {
      options["paramsSerializer"] = (p)=>{
        return qs.stringify(p, { arrayFormat: "repeat" });
      },
      options["timestamp"] = new Date().getTime();
      if (options.data) console.log(options.timestamp, options.url, options.data);
      else console.log(options.timestamp, options.url);
      return $axios(options);
    },

    then(r) {
      if (r && r.config) {
        let options = r.config;
        let headers = r.headers;
        if (headers["content-type"].includes("json")) {
          console.log(options.timestamp, options.url, r.status);
        } else {
          console.log(options.timestamp, options.url, "Not JSON");
          throw 404;
        }
      }
      return r.data;
    },

    catch(e) {
      if (e && e.response && e.response.config) {
        let options = e.response.config;
        console.log(options.timestamp, options.url, e.response.status, options);
        throw e.response.status;
      }
      if (e && e.config) {
        let options = e.config;
        console.log(options.timestamp, options.url, "Network Error");
        throw 404;
      }
      throw e;
    },

    headers(headers, token){
      if(token == undefined) {
        return (headers == undefined) ? {} : headers;
      }
      if (headers == undefined) {
        return { Authorization: `Bearer ${token}` };
      } else {
        headers["Authorization"] = `Bearer ${token}`;
        return headers;
      }
    },

    params(params, token){
      if(token == undefined) {
        return (params == undefined) ? {} : params;
      }

      if (params == undefined) {
        return { access_token: `${token}` };
      } else {
        params["access_token"] = `${token}`;
        return params;
      } 
    },

    query(query, token){
      let params = (query == undefined || query instanceof object) ? query : qs.parse(query);
      params = $base.api.params(params, token);
      return qs.stringify(params, { arrayFormat: "repeat" });
    },

    pageable(data) {
      if (!data) return {};
      const sort = [];
      if (data.sortBy != undefined) {
        data.sortBy.forEach((s, i) => {
          sort.push(s.key + "," + s.order);
        });
      }
      let pageRequest = {
        size: data.itemsPerPage,
        page: data.page - 1,
        sort: sort,
      };
      return pageRequest;
    },
  },



  ////////////////////////////////////
  // Meta Utils..
  ////////////////////////////////////
  meta : {

    env() {

      return $axios({
        method : 'GET',
        url: "/config.json",
      })
      .then((r) => {
        console.log("config.json");
        let result = {};
        for(let i=0; i < arguments.length; i++) {
          let k = `${arguments[i]}`;
          let v = r.data[k];
          if(v == undefined) {
            v = import.meta.env[k];
          }
          result[k] = v;
        }
        return result;
      })
      .catch((e) => {
        let result = {};
        for(let i=0; i < arguments.length; i++) {
          let k = `${arguments[i]}`;
          let v = import.meta.env[k];
          result[k] = v;
        }
        return result;
      });
    },

    jwt(token){
      let base64Payload = token.split('.')[1];
      let base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
      let decodedJWT = JSON.parse(
            decodeURIComponent(
              window
                .atob(base64)
                .split('')
                .map(function (c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        )
      );
      return decodedJWT;
    },


    href(pathnames, protocols) {

      if(pathnames == undefined) return undefined;

      console.log(window.location);
      let hostname = window.location.hostname;
      let port = window.location.port;
      let host = window.location.host;
      let protocol = window.location.protocol;

      let origin = window.location.origin;
      let pathname = window.location.pathname;
      let href = window.location.href; 

      // protocol: "https:"
      // hostname: "192.168.75.107"
      // port: "3000"
      // host: "192.168.75.107:3000"
      // origin: "https://192.168.75.107:3000"
      // pathname: "/contents/83151238-fda2-4feb-93bc-a11b94a38f1d/11"
      // href: "https://192.168.75.107:3000/contents/83151238-fda2-4feb-93bc-a11b94a38f1d/11"

      if(protocols == undefined) {
        return `${origin}${pathnames}`;
      }else{
        return `${protocols}://${host}${pathnames}`;
      }
    }
  }
}
export default $base;