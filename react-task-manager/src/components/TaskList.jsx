import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-message">
        <p>No tasks to show.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TaskList;