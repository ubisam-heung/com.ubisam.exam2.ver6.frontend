import $base from "@/plugins/apis.js"
import $userinfo from "@@/assets/stores/userinfo.js"

const name = "[/assets/apis/oauth2-server.js]";

const $server = {

  api: {
    execute(optionBuilder){
      return $base.meta
        .env("VITE_OAUTH2_SERVER")
        .then(optionBuilder)
        .then((e) => {
          return $base.api.execute(e);
        })
        .then((e) => {
          return $base.api.then(e);
        })
        .catch((e) => {
          throw $base.api.catch(e);
        });
    },

    url(env, path){
      let paths = (path != null) ? path : "";
      return `${env["VITE_OAUTH2_SERVER"]}${paths}`;
    },

    token(env){
      let token = $userinfo.computed.token.get();
      return token;
    },

    headers(env, headers){
      let token = $server.api.token(env);
      return $base.api.headers(headers, token);
    },

    params(env, params){
      let token = $server.api.token(env);
      return $base.api.params(params, token);
    },

    query(env, query){
      let token = $server.api.token(env);
      return $base.api.query(query, token);
    },

    pageable(data){
      return $base.api.pageable(data);
    },
  },

  // APIs (Oauth2)
  oauth2:{
    available(){
      return $base.meta.env("VITE_OAUTH2_SERVER")
        .then(e => {
          let uri = e["VITE_OAUTH2_SERVER"];
          if(uri == undefined){
            return false;
          }else {
            return uri.startswith("http");
          }
        })
    },

    userinfo(role){
      return $server.api.execute((e) => ({
        method: "GET",
        url: $server.api.url(e, "/oauth2/userinfo"),
        headers: $server.api.headers(e, {}),
      })).then(r => {
        if(role == undefined) return r;
        if(r.authorities == undefined) return r;
        r[role] = r.authorities.findIndex(e => e == role) > -1;

        return r;
      });
    },
  },

  // busDrivers
  busDrivers:{
    search(data, params){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/busDrivers/search"),
          headers: $server.api.headers(e, {}),
          params: $server.api.pageable(params),
          data: data,
        }));
    },
    create(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/busDrivers"),
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    read(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
    update(data){
      return $server.api
        .execute((e) => ({
          method: "PUT",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    delete(data){
      return $server.api
        .execute((e) => ({
          method: "DELETE",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
  },

  // busRoutes
  busRoutes:{
    search(data, params){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/busRoutes/search"),
          headers: $server.api.headers(e, {}),
          params: $server.api.pageable(params),
          data: data,
        }));
    },
    create(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/busRoutes"),
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    read(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
    update(data){
      return $server.api
        .execute((e) => ({
          method: "PUT",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    delete(data){
      return $server.api
        .execute((e) => ({
          method: "DELETE",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
  },

  // busStops
  busRoutes:{
    search(data, params){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/busStops/search"),
          headers: $server.api.headers(e, {}),
          params: $server.api.pageable(params),
          data: data,
        }));
    },
    create(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/busStops"),
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    read(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
    update(data){
      return $server.api
        .execute((e) => ({
          method: "PUT",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    delete(data){
      return $server.api
        .execute((e) => ({
          method: "DELETE",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
  },
  
  // repairs
  repairs:{
    search(data, params){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/repairs/search"),
          headers: $server.api.headers(e, {}),
          params: $server.api.pageable(params),
          data: data,
        }));
    },
    create(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/repairs"),
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    read(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
    update(data){
      return $server.api
        .execute((e) => ({
          method: "PUT",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    delete(data){
      return $server.api
        .execute((e) => ({
          method: "DELETE",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
  },

  // accounts
  accounts:{
    search(data, params){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/accounts/search"),
          headers: $server.api.headers(e, {}),
          params: $server.api.pageable(params),
          data: data,
        }));
    },
    create(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/accounts"),
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    read(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
    update(data){
      return $server.api
        .execute((e) => ({
          method: "PUT",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    delete(data){
      return $server.api
        .execute((e) => ({
          method: "DELETE",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
  },
  
  // sessions
  sessions:{
    search(data, params){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/sessions/search"),
          headers: $server.api.headers(e, {}),
          params: $server.api.pageable(params),
          data: data,
        }));
    },
    create(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: $server.api.url(e, "/api/sessions"),
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    read(data){
      return $server.api
        .execute((e) => ({
          method: "POST",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
    update(data){
      return $server.api
        .execute((e) => ({
          method: "PUT",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
          data: data,
        }));
    },
    delete(data){
      return $server.api
        .execute((e) => ({
          method: "DELETE",
          url: data._links.self.href,
          headers: $server.api.headers(e, {}),
        }));
    },
  },
};
export default $server;