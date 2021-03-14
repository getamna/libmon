
<p align="center">
  <img src="https://libmon.com/images/libmon.svg" alt="Libmon Logo"/>
</p>


---
title: "Preparing to Publish"
date: 2021-02-20T14:20:19-06:00
draft: false
---

The Libmon Library handles token validation and usage limits for a library.

It is [open-source](https://github.com/getamna/libmon).

Unfortunately, the library does not work without make a call to the internet. 

### Set-Up

```
npm install libmon --save
```


```javascript
const { Libmon } = require("libmon")
Libmon.intialize("my-calculator-package")
```

Libmon exposes a few methods such as `crash()` and `increment()` to create internal counters that limit the amount of usage on a library without updgrading to a token.

If a token is valid, Libmon methods will not crash a program.

### Usage

The libmon library should not be exposed to the end user. It's used internally by your library, and users should pass in a token.


```javascript

class MyCalculatorLibrary(){
    constructor(token){
        Libmon.intialize("my-calculator-package")

        // check if the token is valid. Makes internet call
        Libmon.validate(token);

        // create counter with a max of 10 calls
        Libmon.setupCounter("number-of-prime-calls", 10)
    }

    function myPaidMethod() {
        // artificially crash the program if token is invalid
        Libmon.disable();
        return "hello world"
    }

    function getPrimeNumber() {
        // increment the counter
        // throw an error if called > 10 times
        Libmon.increment("number-of-prime-calls")
        return 3
    }


}

```

### Tolerance

Our intention is to make programs a little more inconvenient without a valid token rather than create strict payment models.

The consumer of a library and purchaser of a token always has benefit of the doubt.

- If there is no internet, validation will always pass.
- If the libmon server is down, validation will always pass


### Generating Tokens
You can use our token generation service. To publish to Libmon, and get free tokens, simply [purchase here](https://libmon.com/#publish). It costs $20 for 100 tokens. 

We can help you setup a payment portal so you can charge for access to your library.
