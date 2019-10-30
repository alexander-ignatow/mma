export function generateArgError (argName, errorType) {
  return {
    result: 'error',
    argument: argName,
    message: `Argument ${argName} ${errorType}`
  }
}

export function generateError (message) {
  return {
    result: 'error',
    message
  }
}

export function generateErrorNoValidOutput () {
  return generateError('Unable to find suitable output for the given input')
}
