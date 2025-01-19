import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <TransitionGroup>
      {tasks.map((task) => {
        const nodeRef = React.createRef(); // Créer une ref pour chaque tâche
        return (
          <CSSTransition
            key={task.id}
            timeout={300}
            classNames="task"
            nodeRef={nodeRef} // Utiliser la ref ici
          >
            <div ref={nodeRef}>
              <TaskItem
                task={task}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
              />
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

export default TaskList;
