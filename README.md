Webnero UI

This is the User Interface for Webnero. 
Webnero is the Web Wallet for Electronero Network coins. 
Support for ETNX, ETNXP, LTNX, GLDX, and CRFI out-of-the-box. 

Deposit, Withdrawal, Transaction History, Swaps (soon), Stake (soon), Farm (soon), and more.  

To use the UI, connect to Electronero Passport API 
Get an API key here: <insert API key>
  
# Requirements
- Must have a connection to Electronero Passport API or your own API for the UI to function as intended. This is the live repository of Webnero hosted at https://webnero.electronero.org
- NodeJS/NPM or NodeJS/Yarn
- Bower
  
# Install 
  ```bower init && bower install && npm i && gulp less && gulp deploy``` 
  The sym linked `*.html` files located in `./` will be hot loaded to `wallet/*` and you can serve the `*.html` directly from `./`
