FROM ubuntu:14.04
MAINTAINER Vsevolod Ivanov ""

ADD . /vagrant
WORKDIR /vagrant

RUN chmod +x ./bootstrap.sh
RUN ./bootstrap.sh

# !!!service mongod not start in docker container see: https://github.com/travis-ci/travis-ci/issues/2125
# start manually
RUN cp ./configs/mongodb.conf /etc/mongod.conf

RUN chmod +x ./bin/run_docker.sh

EXPOSE 8080

CMD ./bin/run_docker.sh
