import { writeFileSync } from 'fs'
import { getDemoInput, getInput, max, range } from '../utils'

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
  const rtypes = ['ore', 'clay', 'obsidian'] as const
  type Types = typeof types[number]

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

  const maxCost = {
    ore: types.map((t) => blueprints[0][t].ore).reduce(max, 0),
    clay: types.map((t) => blueprints[0][t].clay).reduce(max, 0),
    obsidian: types.map((t) => blueprints[0][t].obsidian).reduce(max, 0),
  }

  function addState(state: State) {
    // if (rtypes.every((t) => state.resources[t] > maxCost[t] * 2)) return
    const hash = JSON.stringify([
      ...Object.values(state.robots),
      ...Object.values(state.resources),
    ])
    if (stateHashes.has(hash)) return
    states.push(state)
    stateHashes.add(hash)
  }

  console.time('calc')
  range(24).forEach(() => {
    const oldStates = states
    states = []
    stateHashes.clear()
    oldStates.forEach((state) => {
      addState({
        robots: { ...state.robots },
        resources: collectResources(state.resources, state.robots),
      })
      types.forEach((t) => {
        const resourcesAfterRobotProduce = produceRobot(
          t,
          state.resources,
          blueprints[0]
        )
        if (!resourcesAfterRobotProduce) return
        let newRobots: Robots = { ...state.robots }
        newRobots[t] = state.robots[t] + 1
        addState({
          robots: newRobots,
          resources: collectResources(resourcesAfterRobotProduce, state.robots),
        })
      })
    })
  })
  console.timeEnd('calc')

  console.log(states.length)
  console.log(states.map((it) => it.resources.geode).reduce(max, 0))

  return blueprints
}

console.log(solution(getDemoInput()))
// console.log(solution(getInput()))
