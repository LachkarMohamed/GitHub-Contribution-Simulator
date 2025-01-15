const grid = document.getElementById("grid");
const clickedDaysList = document.getElementById("clicked-days-list");
const commitMessage = document.getElementById("commit-message");
const startDate = new Date(2025, 0, 6); // January 6, 2025 (first Sunday)

// Create the grid
for (let week = 0; week < 51; week++) {
  for (let day = 0; day < 7; day++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // Calculate the date for the current cell
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + week * 7 + day);

    // Store the date in the cell for reference
    cell.dataset.date = currentDate.toISOString().split("T")[0];

    // Toggle color and add to clicked list on click
    cell.addEventListener("click", () => {
      cell.classList.toggle("active");

      if (cell.classList.contains("active")) {
        const row = document.createElement("tr");
        const dateCell = document.createElement("td");
        dateCell.textContent = cell.dataset.date;
        row.appendChild(dateCell);
        clickedDaysList.appendChild(row);
      } else {
        const rows = clickedDaysList.querySelectorAll("tr");
        rows.forEach((row) => {
          if (row.textContent === cell.dataset.date) {
            row.remove();
          }
        });
      }
      updateCommitMessage(); // Update the message after toggling a cell
    });

    grid.appendChild(cell);
  }
}

// Function to check if today is marked as active
function updateCommitMessage() {
  const today = new Date().toISOString().split("T")[0];
  const activeCells = document.querySelectorAll(".cell.active");
  let isTodayActive = false;

  activeCells.forEach((cell) => {
    if (cell.dataset.date === today) {
      isTodayActive = true;
    }
  });

  if (isTodayActive) {
    commitMessage.textContent = "✅ You should make a commit today!";
    commitMessage.style.color = "green";
  } else {
    commitMessage.textContent = "❌ No need to make a commit today.";
    commitMessage.style.color = "red";
  }
}

// Initial message update
updateCommitMessage();
