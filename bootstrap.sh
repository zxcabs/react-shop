#!/bin/bash

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-org nodejs npm git
ln -s /usr/bin/nodejs /usr/bin/node
npm install -g nodemon forever gulp
cd /vagrant
sudo npm install
