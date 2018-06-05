### Dockerfile 

```sh
FROM node:8.9
MAINTAINER Kong Lingxing <lingxingkong213712sohu-inc.com>

# Working enviroment
ENV \
    CNPM_DIR="/var/ad-manager/src"

RUN mkdir -p ${CNPM_DIR}

WORKDIR ${CNPM_DIR}

COPY package.json ${CNPM_DIR}

RUN npm config set puppeteer_download_host=https://npm.taobao.org/mirrors

RUN npm set registry https://registry.npm.taobao.org

RUN npm install --production

COPY . ${CNPM_DIR}

EXPOSE 3000

CMD [ "npm", "start" ]

```

### Build

```sh
docker build . -t ad-manager:0.0.1 -f Dockerfile
```

### Run

```sh
docker run -d -p 3000:3000 --name ad-manager ad-manager:0.0.1
```

### The running containers

```sh
docker ps -a
```

### Remove a container

```sh
docker rm f529a8a9db04 --force
```

### Docker images

```sh
docker images
```

### Remove image

```sh
docker rmi 6af19212813f
```

### Enter container

```sh
docker exec -it ad-manager /bin/sh
```