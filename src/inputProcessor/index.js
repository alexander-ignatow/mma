import Processor from './Processor'
import { M, P, T } from './ProcessorConfig'

function createRulesetH () {
  // Base
  // A && B && !C => H = M
  // A && B && C => H = P
  // !A && B && C => H = T
  // [other] => [error]

  // Custom 1

  // Custom 2
  // A && B && !C => H = T
  // A && !B && C => H = M

  // first in - first out
  // i.e. first added rules will have higher priority

  const rulesetH = []
  // Custom 2
  rulesetH.push(({ A, B, C }) => {
    if (A && B && !C) {
      return {
        H: T
      }
    }
  })
  rulesetH.push(({ A, B, C }) => {
    if (A && !B && C) {
      return {
        H: M
      }
    }
  })
  // Custom 1
  // Base
  rulesetH.push(({ A, B, C }) => {
    if (!A && B && C) {
      return {
        H: T
      }
    }
  })
  rulesetH.push(({ A, B, C }) => {
    if (A && B && C) {
      return {
        H: P
      }
    }
  })
  rulesetH.push(({ A, B, C }) => {
    if (A && B && !C) {
      return {
        H: M
      }
    }
  })

  return rulesetH
}

function createRulesetK () {
  // Base
  // H = M => K = D + (D * E / 10)
  // H = P => K = D + (D * (E - F) / 25.5)
  // H = T => K = D - (D * F / 30)
  // Custom 1
  // H = P => K = 2 * D + (D * E / 100)
  // Custom 2
  // H = M => K = F + D + (D * E / 100)

  // first in - first out
  // i.e. first added rules will have higher priority

  const rulesetK = []
  // Custom 2
  rulesetK.push(({ F, D, E }, { H }) => {
    if (H === M) {
      return {
        K: F + D + (D * E / 100)
      }
    }
  })
  // Custom 1
  rulesetK.push(({ F, D, E }, { H }) => {
    if (H === P) {
      return {
        K: 2 * D + (D * E / 100)
      }
    }
  })
  // Base
  // combine three base rules for K in one func
  rulesetK.push(({ F, D, E }, { H }) => {
    switch (H) {
      case T: return { K: D - (D * F / 30) }
      case P: return { K: D + (D * (E - F) / 25.5) }
      case M: return { K: D + (D * E / 10) }
    }
  })

  return rulesetK
}

export default function createInputProcessor () {
  const proc = new Processor()
  proc.addRuleSet(createRulesetH())
  proc.addRuleSet(createRulesetK())

  return proc
}
