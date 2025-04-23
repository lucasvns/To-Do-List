import supertest from 'supertest'

import app from '../../app/app.js'
import TaskService from '../../app/services/task'

const request = supertest(app)

describe('Task API', () => {
  beforeEach(() => {
    TaskService.cleanTasks()
  })

  describe('create', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test task description'
      }

      const { status, body } = await request.post('/tasks').send(taskData)


      expect(status).toBe(201)
      expect(body).toHaveProperty('id')
      expect(body.title).toBe(taskData.title)
      expect(body.description).toBe(taskData.description)
      expect(body.completed).toBe(false)
     
    })

    it('should throw error when creating without title or description', async () => {
      const taskData = {}

      const { status, body } = await request.post('/tasks').send(taskData)

      expect(status).toBe(400)
      expect(body.errors).toBe('Campos incompletos')
    })
  })

  describe('find', () => {
    it('should get all tasks', async () => {
      const { status, body } = await request.get('/tasks')

      expect(status).toBe(200)
      expect(Array.isArray(body)).toBe(true)
    })
 
    it('should get task by id', async () => {
      const task = TaskService.create('Test Task', 'Test Description')
      const { status, body } = await request.get(`/tasks/${task.id}`)

      expect(status).toBe(200)
      expect(body.id).toBe(task.id)
      expect(body.title).toBe(task.title)
    })

    it('should return 400 if task not found', async () => {
      const { status, body } = await request.get('/tasks/9999')

      expect(status).toBe(400)
      expect(body.errors).toBe('Tarefa não encontrada')
    })
  })

  describe('update', () => {
    it('should update a task', async () => {
      const task = TaskService.create('Test Task', 'Test Description')
      const updatedData = {
        title: 'Updated Task',
        description: 'Updated Description'
      }

      const { status, body } = await request
        .put(`/tasks/${task.id}`)
        .send(updatedData)

      expect(status).toBe(200)
      expect(body.title).toBe(updatedData.title)
      expect(body.description).toBe(updatedData.description)
    })

    it('should update task status', async () => {
      const task = TaskService.create('Test Task', 'Test Description')
      const updatedStatus = {
        completed: true
      }

      const { status, body } = await request
        .patch(`/tasks/${task.id}`)
        .send(updatedStatus)

      expect(status).toBe(200)
      expect(body.completed).toBe(true)
    })
  })

  describe('destroy', () => {
    it('should delete a task', async () => {
      const task = TaskService.create('Test Task', 'Test Description')

      const { status, body } = await request.delete(`/tasks/${task.id}`)

      expect(status).toBe(200)
      expect(body.message).toBe('Tarefa excluida')
    })

    it('should return 400 when deleting a non-existent task', async () => {
      const { status, body } = await request.delete('/tasks/9999')

      expect(status).toBe(400)
      expect(body.errors).toBe('Tarefa não encontrada')
    })
  })
})
