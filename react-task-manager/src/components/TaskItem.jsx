function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className="task-item">

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <span className={task.completed ? "completed" : ""}>
        {task.title}
      </span>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>

    </div>
  );
}

export default TaskItem;