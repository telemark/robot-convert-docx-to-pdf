# Setting the base to docker-node-unoconv:8.11.1
FROM telemark/docker-node-unoconv:8.11.1@sha256:1bb51c364ca4c111b4f35dced48ee4f741e2d9adc7993e4dbb097cf20d247850

#### Begin setup ####

# Installs git and make utils
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y make gcc g++ python && apt-get clean

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT sh start.sh
