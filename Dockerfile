FROM ruby:2.7.8

RUN apt-get update && apt-get install -y build-essential

RUN apt-get install nodejs -y

# make sure container can access repo by ssh and can ssh to server need to be deploy (for capistrano)
# COPY .ssh /root/.ssh
# RUN chown root:$USER ~/.ssh/config && chmod 644 ~/.ssh/config && chmod 400 ~/.ssh/*.cer && chmod 400 ~/.ssh/id_rsa
# RUN echo 'eval "$(ssh-agent -s)"' >> /root/.bashrc
# RUN echo 'ssh-add /root/.ssh/id_rsa' >> /root/.bashrc

WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN gem install bundler:2.2.11
RUN bundle install
COPY . /app

EXPOSE 3000
