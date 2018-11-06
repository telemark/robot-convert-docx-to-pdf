FROM telemark/docker-node-unoconv:10.13.0@sha256:2f58d1b4dd0b6767607d2521294c281c544634c8c94debc898420ddf48fb7697

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
