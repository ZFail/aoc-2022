import { inspect } from 'util'
import { sum, getDemoInput, getInput } from '../utils'

interface Dir {
  parent?: Dir
  dirs: Record<string, Dir>
  files: Record<string, number>
}

interface CmdCd {
  type: 'cd'
  folder: string
}

interface CmdLs {
  type: 'ls'
}

type Cmd = CmdCd | CmdLs

function parseCmd(line: string): Cmd {
  const parts = line.split(' ')
  if (parts.length < 2 || parts.length > 3 || parts[0] != '$') throw Error('ub')
  if (parts[1] === 'cd') {
    return {
      type: 'cd',
      folder: parts[2],
    }
  }
  if (parts[1] === 'ls') {
    return {
      type: 'ls',
    }
  }
  throw Error('ub')
}

interface LsOutputDir {
  type: 'dir'
  name: string
}

interface LsOutputFile {
  type: 'file'
  name: string
  size: number
}

type LsOutput = LsOutputDir | LsOutputFile

function parseLsOutput(line: string): LsOutput {
  const [a, b] = line.split(' ')
  if (a === 'dir') {
    return {
      type: 'dir',
      name: b,
    }
  } else {
    return {
      type: 'file',
      name: b,
      size: parseInt(a),
    }
  }
}

function processCmd(cmd: Cmd, currentDir: Dir, rootDir: Dir): Dir {
  if (cmd.type === 'cd') {
    switch (cmd.folder) {
      case '/':
        return rootDir
      case '..':
        if (currentDir.parent === undefined) throw Error('ub')
        return currentDir.parent
      default:
        if (!(cmd.folder in currentDir.dirs)) {
          currentDir.dirs[cmd.folder] = {
            parent: currentDir,
            dirs: {},
            files: {},
          }
        }
        return currentDir.dirs[cmd.folder]
    }
  }
  return currentDir
}

function processLsOutput(currentDir: Dir, ls: LsOutput) {
  if (ls.type === 'dir') {
    if (!(ls.name in currentDir.dirs)) {
      currentDir.dirs[ls.name] = {
        parent: currentDir,
        dirs: {},
        files: {},
      }
    } else {
      console.log('dir', ls.name, 'already exists', currentDir.dirs[ls.name])
    }
  } else {
    if (!(ls.name in currentDir.files)) {
      currentDir.files[ls.name] = ls.size
    } else {
      console.log(
        'file',
        ls.name,
        ls.size,
        'already exists',
        currentDir.files[ls.name]
      )
    }
  }
}

export const parseInput = (input: string) => {
  let rootDir: Dir = {
    dirs: {},
    files: {},
  }
  let currentDir = rootDir
  const lines = input.split('\n')
  const cmd = parseCmd(lines[0])
  if (cmd.type !== 'cd' || cmd.folder !== '/') throw Error('ub')
  for (let line of lines) {
    if (line.startsWith('$')) {
      const cmd = parseCmd(line)
      currentDir = processCmd(cmd, currentDir, rootDir)
    } else {
      const ls = parseLsOutput(line)
      processLsOutput(currentDir, ls)
    }
  }
  return rootDir
}

export function getDirSize(dir: Dir): number {
  const filesSize = Object.values(dir.files).reduce(sum, 0)
  const dirsSize = Object.values(dir.dirs)
    .map((dir) => getDirSize(dir))
    .reduce(sum, 0)
  return filesSize + dirsSize
}

export function getAllDirs(dir: Dir): Dir[] {
  const childDirs = Object.values(dir.dirs)
    .map((it) => getAllDirs(it))
    .flat()
  childDirs.push(dir)
  return childDirs
}

const solution = (input: string) => {
  const rootDir = parseInput(input)
  const dirs = getAllDirs(rootDir)
  const dirSizeLimit = 100000
  return dirs
    .map((it) => getDirSize(it))
    .filter((size) => size < dirSizeLimit)
    .reduce(sum, 0)
}

console.log(solution(getDemoInput()))
console.log(solution(getInput()))
