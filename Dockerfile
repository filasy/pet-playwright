FROM mcr.microsoft.com/playwright:v1.55.0-noble

WORKDIR /tests
COPY . .

RUN npm ci
ENV CI=true
