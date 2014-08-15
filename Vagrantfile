# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"
TimeZone = `systemsetup -gettimezone|cut -d':' -f2`

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  # config.vm.box_check_update = false

  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.provision "shell",
    path: "bootstrap.sh",
    args:TimeZone


  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--cpuexecutioncap", "70"]
    v.customize ["modifyvm", :id, "--memory", "1536"]
    v.cpus = 2
  end
end
