FROM redis:7.0.5-alpine

RUN apk add --no-cache gettext

COPY redis.conf.template /usr/local/etc/redis/redis.conf.template
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
