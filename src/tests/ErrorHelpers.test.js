import { generateArgError, generateError, generateErrorNoValidOutput, generateSuccess } from '../inputProcessor/ErrorHelpers'

test('generate success test', () => {
  expect(generateSuccess().status).toBe('OK')
})

test('generate error test', () => {
  expect(generateError('Some error').status).toBe('error')
  expect(generateErrorNoValidOutput().status).toBe('error')
})

test('generate arg error test', () => {
  const error = generateArgError('ARG', 'Some error')
  expect(error.status).toBe('error')
  expect(error.argument).toBe('ARG')
})
