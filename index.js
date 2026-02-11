// 1. Declare vision board items array
let visionBoardItems = [];
let isEditing = false;
let editingItemId = null;

// 2. Get elements from the page
const modal = document.getElementById("appModal");
const addButton = document.getElementById("addItemBtn");
const closeButton = document.getElementById("closeModalBtn");
const SaveButton = document.getElementById("saveItemBtn");
const visionBoard = document.getElementById("visionBoard");


// 3. When the page loads, set up everything
document.addEventListener("DOMContentLoaded", function () {
  updateDate();
  // loadSavedItems(); Added ONLY when loadSavedItems() is added
  // displayItems(); // Added ONLY when displayItems() is added
  setupEventListeners();
});

// 4. Set up click events
function setupEventListeners() {
  addButton.addEventListener("click", openAddModal);
  closeButton.addEventListener("click", closeModal);
  // saveButton.addEventListener("click", saveItem); // Added only when saveItem() is added

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
})
}