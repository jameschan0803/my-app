# ********* Frontend setting up  *************

- Clone the repository
```
git clone --depth=1 https://github.com/jameschan0803/my-app.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```

- run the project  (default port : 3000)
```
npm run start
```

- Build the project 
```
npm run build
```

- Run cypress integration test, only when the backend/frontend are running, the test will pass 
-  3 test cases are located in cypress/integration/my-app-test : E2E test.js
```
npm run cypress:open(the test script is ran based on 3000)
```

