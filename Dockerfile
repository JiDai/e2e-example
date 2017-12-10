FROM node:8

# Base URL of the website to test
ENV E2E_URL https://www.staging.meilleursagents.tech
ENV WORKDIR_NAME /project
ENV SELENIUM_HOST selenium

VOLUME ${WORKDIR_NAME}
WORKDIR ${WORKDIR_NAME}

COPY docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "--env", "chrome" ]

RUN apt-get update \
    && apt-get install -y libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ \
    && apt-get clean all
