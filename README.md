# mma

## The task (in short)
Create the solution to provide the mappings of the set of the input rules to the output.

## Assumptions

In the real-world project it is quite possible, that all rules are static and are guaranteed to never-ever change. In such case simple "if-else" style architecture is totaly acceptable. But from the logic of the assignement it looks that it is not so.

### 1
> Expected outputs 
> The outputs are defined as: 
> H: one of these predefined values [M,P,T] (e.g. H could be equal to either of 3 values: M, P or T)
> ...

What is known about M, P and T? Are there any exact values or is that OK to return 'M', 'P' or 'T' as the value of resulting H?
Should this values be configurable?

**ASSUMPTION**: These values are _NOT_ known for now and may change later.<br>
**SOLUTION**: Values are configurable. The default values are 'M', 'P' and 'T' but this may be easily overriden with environment configuration. Of course, it is possible, that these values would be required to become objects, wich will lead to a more complicated solution, but it is ommited for now.

### 2
Is that safe to assume that
a) H is always function of (A, B, C) ?
b) K is always function of (H, D, E, F) ?

**ASSUMPTION**: It is obviuos, that it is true for now, but it may be a subgect to change, if it was a real-world project<br>
**SOLUTION**: The arcitecture is made flexible and tolerant to this changes (though I tried to keep it simple without over-engeneering).

### 3
Is that possible that base/additional rules will be changed, added or removed in future?

**ASSUMPTION**: Yes<br>
**SOLUTION**: See #2


## Implementation and interface description
The app is implemented in JS as a simple node.js REST service.

Interface: call GET on `api/mma` with following parameters:
```
A: bool
B: bool
C: bool
D: float
E: int
F: int 
```
Example: `[root]/api/mma?a=true&B=false&c=true&d=0&e=0&f=0`

All bools are expected to be `'true'` or `'false'`.
All numbers are expected to be valid numbers (no NaN's accepted).
All parameters and strings are registry independent ('TruE' will also work).

The returned value is always json (Accept header is ignored).

The REST service was chosen because
 * The REST service is more logical implementation for the current assignement (comparing to some front end running code)
 * My primary JS experience is front end, so I wanted to push myself out of the comfort zone a little.

The output format:
```
{
  result: "OK" of "error",
  message: "success" for success or the error message for error,
  argument: the first of the incorrect arguments that was concidered incorrect or missing (if any) or ommited
  H: the H value, if mapping was found
  K: the K value, if the mapping was found
}
```

## Libraries and frameworks
The only dependency is Express.js - well-known http server for node.js

## Implementation details
All implementation lives in `/src/inputProcessor` folder with `index.js` as an entry point

There are two main entities:

**RULE** - the representation of the mapping rule. It is implemented as a function that accepts `input` and `output` and returns the portion of the output (when the mapping succeded) or `null`

**Processor** - holds the rules, organized in sets. It is responsible for
* Sanitizing and validating the input
* Organizing the rules in the sets (from the _current_ task it is obvious, that one of the output parameters is needed to be calculated before we can start with the other, so we have two sets, code-named H and K)
* Chaining the invocation of the rules and assembling the resulting output
----
Other files:

**ErrorHelpers** - utility functions to create corrsponding error objects

**ProcessorConfig** - the set of the constants to configure how processor works. It reads some values from the environment

**inputProcessor/index.js** - the entry point to the processor. It creates the processor object and initializes it with the rules. If needed it can be easily modified with either new rules or for instance the logic to grab new rules out from some external place.

## Code quality checking
* ESLint - the linter to check the code formatting. I have used `Standard` config.
* jest - is used as a unit-test library

Both solutions were picked because they <br>
a) Well-known and robust<br>
b) I have recent experience with both of them

## Deploy
The app uses simple deploy to heroku with basic config (just to have an opportunity to test it live)

The app is hosted as `https://alex-mma.herokuapp.com/api/mma`. Due to the free heroku account limitations it the container may be sleeping, so the user may need to wait up to 30 sec for it to initialise when calling it for the first time after the period of inactivity.

For now no CI or any complex deploy logic is used as it looks like falling out of the scope of the assignement
