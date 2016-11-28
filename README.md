

## Prerequisite:
* gulp
* npm

## First thing to do after fresh checkout:
* npm install

## Run
* gulp [--env={environment}]
* go http://localhost:8001/ + your html page

## How to start
* src/page-a/index.html will end up on http://localhost:8001/page-a.html
* src/page-a/index.js will be included in http://localhost:8001/page-a.html
* need to restart gulp after added new index.html or index.js

## How to get production build
* gulp bundle [--env={environment}]
* files will end up in folder 'www'

## Pages

Page | URL
--- | ---
Index | /index.html
