FROM mcr.microsoft.com/playwright:v1.54.2-noble

WORKDIR /tests
COPY . .

RUN npm ci
ENV CI=true