FROM nginx:stable-alpine
COPY ./dist/musketeer-client/* /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf