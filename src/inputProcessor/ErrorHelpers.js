export function generateArgError (argName, errorType) {
  return {
    status: 'error',
    argument: argName,
    message: `Argument ${argName} ${errorType}`
  }
}

export function generateError (message) {
  return {
    status: 'error',
    message
  }
}

export function generateErrorNoValidOutput () {
  return generateError('Unable to find suitable output for the given input')
}

export function generateSuccess (result) {
  return {
    status: 'OK',
    message: 'Success',
    ...result
  }
}
