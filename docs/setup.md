# Development Setup

### npm scripts
"You are required to make any necessary updates to docs/setup.md with all the steps required to build your project. Remember to include all the source files including all TypeScript and JavaScript in your repo."

- `npm install` to build
- `npm start` to run the project

### Config needed for heroku.

The following config is needed on branch `final-release`

- `heroku config:set MONGO_ULR=<mongo db url>`
- `heroku config:set MONGO_DB=<mongo db name>`
- `heroku config:set JWT_SECRET=<JWT Secret>`

### Deploying to heroku

- First commit all your changes.
- `git add heroku https://murmuring-woodland-32500.herokuapp.com/` to add heroku repo.
- `git checkout final-release` to move to branch deployed on heroku.
- `git push heroku final-release:master` to deploy to Heroku.
