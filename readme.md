
![Libmon logo](https://libmon.com/images/libmon.svg)

The Libmon Library helps you monetize your library by handling token validation and enforcing usage limits for a library. 

It validates tokens against the [Libmon](https://libmon.com) service.

Unfortunately, the library does not work without make a call to the internet. 

### Set-Up

```
npm install libmon --save
```


```javascript
const { Libmon } = require("libmon")
Libmon.intialize("my-calculator-package")
```

Libmon exposes a few methods such as `crash()` and `increment()` that can be used to set limits on a program.

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
You can use our token generation service. To publish to Libmon, and get tokens, [register here](https://libmon.com/#publish).

We can help you setup a payment portal, and you can monetize your library.