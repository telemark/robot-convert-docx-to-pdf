FROM telemark/docker-node-unoconv:10.7.0@sha256:14656bd333f8f6fe1e3581c8ee484de3847b768910a54310001ffbf3e1f13f66

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
