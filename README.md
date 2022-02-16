# hanu_online_judge_client

## requirements
1. vue 3 extension [download](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en)
2. vue-cli [download](https://cli.vuejs.org/guide/installation.html)
3. nodejs&npm [download](https://nodejs.org/en/download/)
4. Prettier, download from vs code marketplace

## setup
create a file named `.env.local` in the root directory of the project, and paste the following content:
```
VUE_APP_API=https://lamlamlfakeapi.herokuapp.com
```
fake api list
|des                |url            |
|-------------------|---------------|
|get all users      |/endUser       |
|get all problems   |/problem       |
## command

```
npm run serve
npm run build
```

## git workflow

* fetch (or clone) repo to local
    * git clone -b develop https://github.com/HANU-GDSC/hanuoj-fe.git
    * git pull origin develop
* install dependencies *(if not installed)*
    * npm install
* switch to develop branch
    * git checkout develop

**working...**

**when finished**

* push
    * git push origin develop

*Viet 
    *Viet da sua