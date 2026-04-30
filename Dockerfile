FROM ghcr.io/u2waremanager/io.u2ware.product.vue-server:3.5.11

COPY ../dist /var/lib/examples/examples-frontend/


ENV logging.file.name=/var/lib/examples/logs/examples-frontend.log
ENV logging.logback.rollingpolicy.file-name-pattern=/var/lib/examples/logs/examples-frontend-%d{yyyy-MM-dd}.%i.log
ENV vue.resource=/var/lib/examples/examples-frontend/


####################################
# OR
####################################
# FROM nginx:stable-alpine 

# COPY /dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# EXPOSE 80

# CMD ["/entrypoint.sh"]
# # RUN sh entrypoint.sh
# # CMD ["nginx", "-g", "daemon off;"]
# # ENTRYPOINT ["/entrypoint.sh"]



