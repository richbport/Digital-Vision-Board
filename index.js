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
  setupEventListeners();
});
