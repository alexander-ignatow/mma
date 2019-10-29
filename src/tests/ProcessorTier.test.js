import ProcessorTier from '../inputProcessor/ProcessorTier'

test('empty input test', () => {
  const emptyInput = {}
  const expectedError = new ProcessorTier().process(emptyInput)

  // should be 'argument A missing'
  // don't check message - check only 'argument' field
  expect(expectedError.result).toBe('error')
  expect(expectedError.argument).toBe('A')
})
