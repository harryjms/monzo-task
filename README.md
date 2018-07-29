# Developer Portal Task
This is my solution to the Monzo task for the Web Engineer role 🎉
## Pre-requisites
- nodejs
- yarn
- flow

## Running Project
- Clone the project 
- `yarn install` within the cloned directory
- `yarn start` will start webpack-dev-server on port `8080`. To change the port at runtime, pass the argument `--port PORT_NUMBER`.
- Open your browser to `http://localhost:PORT_NUMBER`

## Given more time... 
### Routing
Currently, page changes are handled quite simply by updating the root component state with the new page component and having it pass the change method through props. If I was to spend longer on this task, I would have implemented `react-router` to handle this. 

Not only would this eliminate the need to pass props through to children components manually, it would also support changing the URL to reflect the current page. 


### Redux
At present, the app is very small, so having states local to each component and passing through props to children isn't much of an issue. If I was to do this task again, I would implement redux to store the app list data to make it available to the children components more easily and put the app in a good place for scaling in the future.

### Responsive Design
Given the time restraint I had, I didn't spend any time making the app responsive. If this was different, I would have implemented a design that was responsive.