import createProcessor from '../inputProcessor'
import { M, P, T } from '../inputProcessor/ProcessorConfig'

test('custom 2 tests', () => {
  // Custom 2
  // A && B && !C => H = T
  // A && !B && C => H = M
  // H = M => K = F + D + (D * E / 100)

  const input1 = { a: 'true', b: 'true', c: 'false', d: '0', e: '0', f: '0' }
  const input2 = { a: 'true', b: 'false', c: 'true', d: '10', e: '20', f: '30' }
  const processor = createProcessor()

  const outp1 = processor.process(input1)
  const outp2 = processor.process(input2)

  expect(outp1.status).toBe('OK')
  expect(outp2.status).toBe('OK')

  expect(outp1.H).toBe(T)
  expect(outp2.H).toBe(M)
  expect(outp2.K).toBe(30 + 10 + (10 * 20 / 100))
})

test('custom 1 tests', () => {
  // use base rule
  // A && B && C => H = P

  // Custom 1
  // H = P => K = 2 * D + (D * E / 100)

  const input = { a: 'true', b: 'true', c: 'true', d: '10', e: '20', f: '30' }
  const processor = createProcessor()

  const outp = processor.process(input)

  expect(outp.status).toBe('OK')
  expect(outp.H).toBe(P)
  expect(outp.K).toBe(2 * 10 + (10 * 20 / 100))
})

test('base set tests', () => {
  // A && B && !C => H = M - overriden!
  // A && B && C => H = P
  // !A && B && C => H = T
  // H = M => K = D + (D * E / 10) - overriden
  // H = P => K = D + (D * (E - F) / 25.5) - overriden
  // H = T => K = D - (D * F / 30)

  const input1 = { a: 'true', b: 'true', c: 'true', d: '10', e: '20', f: '30' }
  const input2 = { a: 'false', b: 'true', c: 'true', d: '10', e: '20', f: '30' }

  const processor = createProcessor()

  const outp1 = processor.process(input1)
  const outp2 = processor.process(input2)

  expect(outp1.status).toBe('OK')
  expect(outp2.status).toBe('OK')

  expect(outp1.H).toBe(P)
  expect(outp2.H).toBe(T)

  expect(outp2.K).toBe(10 - (10 * 30 / 30))
})

test('invalid rules', () => {
  const input1 = { a: 'false', b: 'false', c: 'true', d: '10', e: '20', f: '30' }
  const input2 = { a: 'false', b: 'true', c: 'false', d: '10', e: '20', f: '30' }

  const processor = createProcessor()

  const outp1 = processor.process(input1)
  const outp2 = processor.process(input2)

  expect(outp1.status).toBe('error')
  expect(outp2.status).toBe('error')
})
