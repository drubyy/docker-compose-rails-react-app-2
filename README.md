# README

* Ruby version
2.7.8

* Tech stacks
  - BE
    - Ruby / Ruby On Rails (Deploy to AWS EC2)
    - JWT (For authentication)

  - FE
    - ReactJS (Deploy to AWS Amplify)
    - Antd (For some UI)
    - Axios (For send request to BE)

  - Containerization
    - Docker compose (for development)

  - Database
    - PosgreSQL (same host with BE at EC2)

  - Deployment
    - Capistrano (For deploy rails app)

* Setup using docker
  - Make sure at locally, you have key and permission to ssh to server
  - Then run `make pre-build` (if using capistrano inside of docker container to deploy)
  - `make build`
  - `make up`

Other command support like debugging, attach logs,... you can see at Makefile

