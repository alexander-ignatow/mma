import { generateArgError, generateErrorNoValidOutput } from './ErrorHelpers'

export default class Processor {
  constructor (rules, nextTier) {
    this._nextTier = nextTier
  }

  _sanitizeInput (input = {}) {
    // A: bool B: bool C: bool
    // D: float E: int F: int
    // all args are expected to be valid

    const bools = ['A', 'B', 'C']
    const numbers = ['D', 'E', 'F']

    const cleanInput = {}

    for (const theArg in input) {
      const argName = theArg.toUpperCase()
      const value = input[theArg]

      if (bools.includes(argName)) {
        if (value.toLowerCase() === 'true') {
          cleanInput[argName] = true
        } else if (value.toLowerCase() === 'false') {
          cleanInput[argName] = false
        } else {
          throw generateArgError(argName, 'should be "true" or "false"')
        }
      }

      if (numbers.includes(argName)) {
        const cleanValue = argName === 'D' ? Number.parseFloat(value) : Number.parseInt(value)

        if (Number.isNaN(cleanValue)) {
          throw generateArgError(argName, 'value ' + value + ' is not valid')
        }

        cleanInput[argName] = cleanValue
      }
    }

    // is all in place?

    for (const theArg of [...bools, ...numbers]) {
      const theType = typeof (cleanInput[theArg])
      if (theType === 'undefined') {
        throw generateArgError(theArg, 'is missing')
      }
    }

    return cleanInput
  }

  process (input, output = {}) {
    let cleanInput = {}

    try {
      cleanInput = this._sanitizeInput(input)
    } catch (err) {
      // return, not throw
      return err
    }

    console.log(cleanInput)

    return generateErrorNoValidOutput()
  }
}
