# README

## Introduction
### General
  The website allows users to share YouTube videos
### Key features
  - Registration, login
  - Watching video has been shared
  - Sharing video (Must login)
  - Receive notify near realtime about new video has been shared by another one (Must login)

## Prerequisites
### Tech stacks
  - BE
    - Ruby (2.7.8) / Ruby On Rails (Deploy to AWS EC2)
    - JWT (For authentication)

  - FE
    - ReactJS (Deploy to AWS Amplify)
    - Antd (For some UI)
    - Axios (For send request to BE)

  - Containerization
    - Docker compose (for development)

  - Database
    - sqllite

  - Deployment
    - Capistrano (For deploy rails app)

  - Web server
    - Nginx

  - App server
    - Passenger

  - Integration test
    - Selenium

## Installation & Configuration
### With docker
  - [skip if you will not deploy] Make sure at locally, you have key and permission to ssh to server then run `make pre-build`
  - `cp .env.example .env`
  - `cp config/settings.local.yml.example config/settings.local.yml`, then replace your youtube API key (https://www.magetop.com/blog/cach-lay-api-key-youtube/)
  - `cp frontend/.env.example frontend/.env`, then replace your youtube API key
  - `make build`
### Without docker
  * Backend
    - Make sure you have already installed ruby version 2.7.8
    - `cp .env.example .env`
    - `cp config/settings.local.yml.example config/settings.local.yml`, then replace your youtube API key (https://www.magetop.com/blog/cach-lay-api-key-youtube/)
    - `gem install bundler:2.2.11`
    - `bundle install`
  * Frontend
    - `cd frontend`
    - `cp .env.example .env`, then replace your youtube API key
    - `npm install`

## Database Setup
### With docker
  No need to do
### Without docker
  - `rails db:create && rails db:migrate`

## Running the Application
### With docker
  - `make up`
### Without docker
  - `rails s` (For BE)
  - `npm run start` (For FE)

## Usage
  Hệ thống hỗ trợ sử dụng đối với cả người dùng đã đăng nhập và người dùng chưa dăng nhập, tuy nhiên đối với người dùng chưa đăng nhập thì sẽ chỉ được xem video, để có thể thực hiện share video lên bản tin, người dùng đó cần thực hiện đăng nhập (đăng ký nếu chưa có tài khoản).

  Ngoài ra đối với người đã thưc hiện đăng nhập sẽ có thêm chức năng nhận thông báo theo thời gian thực khi có người dùng nào đó thực hiện share video lên hệ thống (Chỉ nhận thông báo, không thực hiện re-fetch data mới nhất, tất cả người dùng đã đăng nhập sẽ nhận được thông báo, chỉ trừ người thực hiện share video đó là không nhận được).

## Troubleshooting

## Others
DEMO: [https://master.d34spwopu0ty0q.amplifyapp.com/](https://master.d12wbqcp0mdzh6.amplifyapp.com/)
