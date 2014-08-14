FROM ubuntu:14.04
MAINTAINER Vsevolod Ivanov ""
RUN apt-get -qq update
RUN apt-get install -y curl

# Add lates nodejs repo
RUN curl -sL https://deb.nodesource.com/setup | bash -
# Add mongo repo
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list

RUN apt-get update
RUN apt-get install -y  nodejs mongodb-org

ADD . /opt/apps/reactshop

WORKDIR /opt/apps/reactshop

# !!!service mongod not start in docker container see: https://github.com/travis-ci/travis-ci/issues/2125
# start manually
RUN cp ./configs/mongodb.conf /etc/mongod.conf

RUN chmod +x ./bin/run_docker.sh

EXPOSE 8080

CMD ./bin/run_docker.sh
