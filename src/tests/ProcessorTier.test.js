import Processor from '../inputProcessor/Processor'
import { generateErrorNoValidOutput } from '../inputProcessor/ErrorHelpers'

test('empty input test', () => {
  const emptyInput = {}
  const expectedError = new Processor().process(emptyInput)

  // should be 'argument A missing'
  // don't check message - check only 'argument' field
  expect(expectedError.result).toBe('error')
  expect(expectedError.argument).toBe('A')
})

test('missing arg test', () => {
  const input1 = { B: 'false', c: 'true', D: '0', E: '0', f: '0' }
  const input2 = { a: 'true', B: 'false', D: '0', E: '0', f: '0' }

  const expectedError1 = new Processor().process(input1)
  const expectedError2 = new Processor().process(input2)

  // don't check message - check only 'argument' field
  expect(expectedError1.result).toBe('error')
  expect(expectedError1.argument).toBe('A')

  expect(expectedError2.result).toBe('error')
  expect(expectedError2.argument).toBe('C')
})

test('invalid input test', () => {
  const input1 = { a: 'NOT VALID', B: 'false', c: 'true', D: '0', E: '0', f: '0' }
  const input2 = { a: 'false', b: 'false', c: 'false', d: 'NOT VALID', e: '-4', f: '10' }

  const expectedError1 = new Processor().process(input1)
  const expectedError2 = new Processor().process(input2)

  // don't check message - check only 'argument' field
  expect(expectedError1.result).toBe('error')
  expect(expectedError1.argument).toBe('A')

  expect(expectedError2.result).toBe('error')
  expect(expectedError2.argument).toBe('D')
})

test('valid input test', () => {
  const validInput1 = { a: 'true', B: 'false', c: 'true', D: '0', E: '0', f: '0' }
  const validInput2 = { a: 'false', b: 'false', c: 'false', d: '34.3', e: '-4', f: '10' }
  const validInput3 = { A: 'fAlSe', B: 'TRUE', C: 'true', D: '23e-4', E: '9882', F: '-28787' }
  const validInput4 = { a: 'true', B: 'false', c: 'true', D: '0', E: '0', f: '0', ignoreExtraArg: 'does not matter what' }

  expect(new Processor().process(validInput1)).toStrictEqual(generateErrorNoValidOutput())
  expect(new Processor().process(validInput2)).toStrictEqual(generateErrorNoValidOutput())
  expect(new Processor().process(validInput3)).toStrictEqual(generateErrorNoValidOutput())
  expect(new Processor().process(validInput4)).toStrictEqual(generateErrorNoValidOutput())
})
