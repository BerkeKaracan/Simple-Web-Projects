const tasks = document.querySelectorAll(".task");
const boxes = document.querySelectorAll(
  ".to-do-box, .in-progress-box, .done-box",
);

tasks.forEach((task) => {
  task.addEventListener("dragstart", (e) => {
    task.classList.add("is-dragging");
    const clone = task.cloneNode(true);
    clone.style.backgroundColor = "white";
    clone.style.opacity = "1";
    clone.style.border = "1px solid #ccc";
    clone.style.position = "absolute";
    clone.style.top = "-1000px";
    document.body.appendChild(clone);
    e.dataTransfer.setDragImage(clone, 0, 0);
    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  box.addEventListener("drop", (e) => {
    const currentTask = document.querySelector(".is-dragging");
    box.appendChild(currentTask);
  });
});
