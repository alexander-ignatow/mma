import { generateArgError, generateError } from './ErrorHelpers'

export default class ProcessorTier {
  _validateArguments (input = {}) {
    // A: bool B: bool C: bool
    // D: float E: int F: int
    // all args are expected to be valid

    const bools = ['A', 'B', 'C']
    for (const theArg of bools) {
      const theType = typeof (input[theArg])
      if (theType === 'undefined') {
        return generateArgError(theArg, 'is missing')
      } else if (theType !== 'boolean') {
        return generateArgError(theArg, 'must be boolean')
      }
    }

    const numbers = ['D', 'E', 'F']
    for (const theArg of numbers) {
      const theType = typeof (input[theArg])
      if (theType === 'undefined') {
        return generateArgError(theArg, 'is missing')
      } else if (theType !== 'number') {
        return generateArgError(theArg, 'must be boolean')
      }
    }

    // ok!
  }

  process (input) {
    const err = this._validateArguments(input)

    if (err) {
      return err
    }

    return generateError('Unable to find suitable output for the given input')
  }
}
