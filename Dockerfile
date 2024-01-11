FROM harbor.cn.svc.corpintra.net/baselibrary/nginx:1.21-alpine
COPY dist/ /app/
RUN mkdir /cnf && chown 1000:1000 /cnf && chown  -R  1000:1000  /app
USER 1000
EXPOSE 3100
WORKDIR /app
CMD [ "sh", "-c", " nginx -g 'daemon off;' -c /cnf/nginx.conf"]
