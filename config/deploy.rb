# config valid for current version and patch releases of Capistrano
lock '~> 3.17.2'

set :application, 'remiapp'
set :repo_url, 'git@github.com:drubyy/remitano-test.git'

set :deploy_to, '/var/www/remiapp'

# set :ssh_options
set :ssh_options, {
  forward_agent: true,
  keys: '/root/.ssh/05_02_2023.cer',
}

set :copy_exclude, 'Makefile'

append :linked_files, 'config/master.key'