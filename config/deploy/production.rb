# set deploy user
set :user, 'ubuntu'

# Ip or domain name of server
server '18.142.252.201', user: fetch(:user), roles: %w[app web db]

# set branch need to deploy
set :branch, 'master'

set :rails_env, 'production'