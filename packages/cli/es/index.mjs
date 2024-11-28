import Node from './node/index.mjs'

export * from './node/index.mjs'

const version = '3.0.0'

function install(app) {
  Node.install && app.use(Node)
}

export {
  version,
  install,
  Node
}

export default {
  version,
  install,
  Node
}
