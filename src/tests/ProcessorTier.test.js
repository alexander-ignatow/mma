import ProcessorTier from '../inputProcessor/ProcessorTier'
import { generateErrorNoValidOutput } from '../inputProcessor/ErrorHelpers'

test('empty input test', () => {
  const emptyInput = {}
  const expectedError = new ProcessorTier().process(emptyInput)

  // should be 'argument A missing'
  // don't check message - check only 'argument' field
  expect(expectedError.result).toBe('error')
  expect(expectedError.argument).toBe('A')
})

test('valid input test', () => {
  const validInput1 = { a: 'true', B: 'false', c: 'true', d: '0', e: '0', f: '0' }
  const validInput2 = { a: 'false', B: 'false', c: 'false', d: '34.3', e: '-4', f: '10' }
  const validInput3 = { a: 'fAlSe', B: 'TRUE', c: 'true', d: '23e-4', e: '9882', f: '-28787' }

  expect(new ProcessorTier().process(validInput1)).toStrictEqual(generateErrorNoValidOutput())
  expect(new ProcessorTier().process(validInput2)).toStrictEqual(generateErrorNoValidOutput())
  expect(new ProcessorTier().process(validInput3)).toStrictEqual(generateErrorNoValidOutput())
})
