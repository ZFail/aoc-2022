import { writeFileSync } from 'fs'
import { getDemoInput, getInput, max, range, sum } from '../utils'

type Resources = {
  ore: number
  clay: number
  obsidian: number
  geode: number
}

type Robots = Resources

type Blueprint = {
  ore: Resources
  clay: Resources
  obsidian: Resources
  geode: Resources
}

const solution = (input: string) => {
  const blueprints: Blueprint[] = input.split('\n').map((it) => {
    const parts = it.split(' ')
    return {
      ore: {
        ore: parseInt(parts[6]),
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
      clay: {
        ore: parseInt(parts[12]),
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
      obsidian: {
        ore: parseInt(parts[18]),
        clay: parseInt(parts[21]),
        obsidian: 0,
        geode: 0,
      },
      geode: {
        ore: parseInt(parts[27]),
        obsidian: parseInt(parts[30]),
        clay: 0,
        geode: 0,
      },
    }
  })
  type State = {
    robots: Robots
    resources: Resources
  }

  const types = ['ore', 'clay', 'obsidian', 'geode'] as const
  const reverseTypes = [...types].reverse()
  const rtypes = ['ore', 'clay', 'obsidian'] as const
  type Types = (typeof types)[number]

  function produceRobot(
    robotType: Types,
    resources: Resources,
    blueprint: Blueprint
  ) {
    const robotCost = blueprint[robotType]
    const newResources: Resources = Object.fromEntries(
      types.map((t) => [t, resources[t] - robotCost[t]])
    ) as Resources

    if (!Object.values(newResources).every((it) => it >= 0)) return null
    return newResources
  }

  function collectResources(resources: Resources, robots: Robots) {
    return Object.fromEntries(
      types.map((t) => [t, resources[t] + robots[t]])
    ) as Resources
  }

  const results = blueprints.map((blueprint, blueprintIdx) => {
    // if (blueprintIdx !== 1) return 0
    console.time(`calc${blueprintIdx}`)
    let states: State[] = [
      {
        robots: {
          ore: 1,
          clay: 0,
          obsidian: 0,
          geode: 0,
        },
        resources: {
          ore: 0,
          clay: 0,
          obsidian: 0,
          geode: 0,
        },
      },
    ]

    let stateHashes: Set<String> = new Set()
    let robotStates: Record<string, State[]> = {}

    function addState(state: State) {
      // if (rtypes.every((t) => state.resources[t] > maxCost[t] * 2)) return
      const robotsHash = Object.values(state.robots).join(' ')
      const hash = robotsHash + ' ' + Object.values(state.resources).join(' ')
      if (stateHashes.has(hash)) return
      states.push(state)
      stateHashes.add(hash)
      const robotStatesArr =
        robotStates[robotsHash] ?? (robotStates[robotsHash] = [])
      robotStatesArr.push(state)
    }

    range(24).forEach((minute) => {
      const oldStates = states
      states = []
      stateHashes.clear()
      robotStates = {}
      oldStates.forEach((state) => {
        addState({
          robots: { ...state.robots },
          resources: collectResources(state.resources, state.robots),
        })
        for (const t of reverseTypes) {
          const resourcesAfterRobotProduce = produceRobot(
            t,
            state.resources,
            blueprint
          )
          if (!resourcesAfterRobotProduce) continue
          let newRobots: Robots = { ...state.robots }
          newRobots[t] = state.robots[t] + 1
          addState({
            robots: newRobots,
            resources: collectResources(
              resourcesAfterRobotProduce,
              state.robots
            ),
          })
        }
      })
      const filteredStates = Object.entries(robotStates)
        .map(([key, value]) => {
          const newValues = value.filter((it) => {
            return !value.some((v) =>
              types.every((t) => v.resources[t] >= it.resources[t] && v !== it)
            )
          })
          return newValues
        })
        .flat()
      console.log(minute, states.length, filteredStates.length)
      states = filteredStates
      // writeFileSync('a.json', JSON.stringify(filteredStates, undefined, 2))
    })
    console.timeEnd(`calc${blueprintIdx}`)
    const maxGeodes = states.map((it) => it.resources.geode).reduce(max, 0)
    console.log(states.length, maxGeodes)
    // writeFileSync('a.json', JSON.stringify(states, undefined, 2))
    // writeFileSync('b.json', JSON.stringify(robotStates2, undefined, 2))
    return maxGeodes * (blueprintIdx + 1)
  })

  console.log(results)
  return results.reduce(sum, 0)
}

// console.log(solution(getDemoInput()))
console.log(solution(getInput()))
