#!/usr/bin/env sh

set -e

npm install

if [ -z "${E2E_CONFIG}" ]; then
    npm test -- "$@"
else
    npm run test:${E2E_CONFIG} -- "$@"
fi
