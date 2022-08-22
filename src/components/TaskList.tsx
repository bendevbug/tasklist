import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  //anotações
  //No useState colocamos a interface Task, assim poderemos usar o useSate e atualizar o valor 
  //do objeto e suas tipagens. E este useState atualiza esses valores num array que é o setTasks
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (!newTaskTitle) return; //isso impede o resto da execução do código

    const addingTask = {
      id: Math.random() * 1000,
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks(antigoValor => [...antigoValor, addingTask])
    //então dessa forma pegamos o valor antigo, usando como callback, o tasks tem valor de array, então faz
    //spreed operator, salva o valorAntigo, no final dele é adicionado o newTask
    setNewTaskTitle('') //voltará ao seu estado original    
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const completedTasks = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)

    //esse operador retorna (apenas se o id for igual ao id que é passado como parâmetro e tipado),
    //todas as categorias da task, mas mudando o valor da isComplete para ture, "!" nega o boolean

    setTasks(completedTasks)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const filteredTasks = tasks.filter(task => task.id !== id)

    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}