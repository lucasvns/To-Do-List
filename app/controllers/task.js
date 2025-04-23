import TaskService from '../services/task.js'

export default {
  create,
  update,
  find,
  findById,
  updateStatus,
  destroy
}

function create (req, res) {
  try {
    const { title, description } = req.body
    const task = TaskService.create(title, description)

    res.status(201).json(task)
  } catch (error) {
    return res.status(400).json({ message: 'Erro', errors: error.message })  
  }
}

function update (req, res) {
  try {
    const { id } = req.params
    const { title, description } = req.body
    const task = TaskService.update(Number(id), title, description)

    res.status(200).json(task)
  } catch (error) {
    return res.status(400).json({ message: 'Erro', errors: error.message })
  }
}

function updateStatus (req, res) {
  try {
    const { id } = req.params
    const { completed } = req.body
    const task = TaskService.updateStatus(Number(id), completed)

    res.status(200).json(task)
  } catch (error) {
    return res.status(400).json({ message: 'Erro', errors: error.message })  
  }
}

function find (_req, res) {
  try {
    const tasks = TaskService.find()

    res.status(200).json(tasks)
  } catch (error) {
    return res.status(400).json({ message: 'Erro', errors: error.message })  
  }
}

function findById (req, res) {
  try {
    const { id } = req.params
    const task = TaskService.findById(Number(id))

    res.status(200).json(task)
  } catch (error) {
    return res.status(400).json({ message: 'Erro', errors: error.message })
  }
}

function destroy (req, res) {
  try {
    const { id } = req.params
    const task = TaskService.destroy(Number(id))

    res.status(200).json(task)
  } catch (error) {
    return res.status(400).json({ message: 'Erro', errors: error.message })  
  }
}
