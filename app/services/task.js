const tasks = []

export default {
  find,
  findById,
  create,
  update,
  updateStatus,
  destroy
}

function find () {
  return tasks
}

function findById (id) {
  const task = tasks.find((task) => task.id === id)

  if (!task) {
    throw new Error('Tarefa não encontrada')
  }

  return task
}

function create (title, description) {
  if (!title || !description) {
    throw new Error('Campos incompletos')
  }

  const id = new Date().valueOf()

  const task = {
    id,
    title,
    description,
    completed: false
  }

  tasks.push(task)

  return task
}

function update (id, title, description) {
  const task = findById(id)

  if (title) task.title = title
  if (description) task.description = description

  return task
}

function updateStatus (id, completed) {
  const task = findById(id)

  task.completed = completed

  return task
}

function destroy (id) {
  const taskIndice = tasks.findIndex((task) => task.id === id)

  if (!taskIndice) {
    throw new Error('Tarefa não encontrada')
  }

  tasks.splice(taskIndice, 1)

  return { message: 'Tarefa excluida' }
}
