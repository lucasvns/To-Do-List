import TaskService from '../../app/services/task.js'

describe('Task Service', () => {
  beforeEach(() => {
    TaskService.cleanTasks()
  })

  describe('create', () => {
    it('must create a new task with title and description', () => {
      const taskName = 'New Task'
      const taskDescription = 'New Task Description'

      const task =  TaskService.create(taskName, taskDescription)

      expect(task).toHaveProperty('id')
      expect(task.title).toBe(taskName)
      expect(task.description).toBe(taskDescription)
      expect(task.completed).toBe(false)
    })

    it('should throw error when creating without title or description', () => {
      expect(() => TaskService.create()).toThrow('Campos incompletos')
    })
  })

  describe('find', () => {
    it('must return all tasks', () => {
      TaskService.create('Task 1', 'Desc 1')
      TaskService.create('Task 2', 'Desc 2')
  
      const tasks = TaskService.find()

      expect(tasks.length).toBe(2)
    })

    it('must find a task by ID', () => {
      const task = TaskService.create('Task 1', 'Desc 1')
      const result = TaskService.findById(task.id)
  
      expect(result.id).toBe(task.id)
    })

    it('should throw error if not found by ID', () => {
      expect(() => TaskService.findById(999)).toThrow('Tarefa não encontrada')
    })
  })

  describe('update', () => { 
    it('should update title and description', () => {
      const task = TaskService.create('Old title', 'Old desc')
      const updated = TaskService.update(task.id, 'New title', 'New desc')
  
      expect(updated.title).toBe('New title')
      expect(updated.description).toBe('New desc')
    })
  
    it('should update the task status', () => {
      const task = TaskService.create('Task', 'Description')
      const updated = TaskService.updateStatus(task.id, true)
  
      expect(updated.completed).toBe(true)
    })
  })

  describe('destroy', () => {
    it('should delete the task', () => {
      const task = TaskService.create('Delete', 'Description')
      const response = TaskService.destroy(task.id)
  
      expect(response).toEqual({ message: 'Tarefa excluida' })
      expect(() => TaskService.findById(task.id)).toThrow('Tarefa não encontrada')
    })
  
    it('should throw an error when deleting a non-existent task', () => {
      expect(() => TaskService.destroy(123456)).toThrow('Tarefa não encontrada')
    })
  })
})
