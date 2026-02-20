// 1. Declare vision board items array
let visionBoardItems = [];
let isEditing = false;
let editingItemId = null;

// 2. Get elements from the page
const modal = document.getElementById("appModal");
const addButton = document.getElementById("addItemBtn");
const closeButton = document.getElementById("closeModalBtn");
const saveButton = document.getElementById("saveItemBtn");
const visionBoard = document.getElementById("visionBoard");

// 3. When the page loads, set up everything
document.addEventListener("DOMContentLoaded", function () {
  updateDate();
  // loadSavedItems(); Added ONLY when loadSavedItems() is added
  displayItems(); // Added ONLY when displayItems() is added
  setupEventListeners();
});

// 4. Set up click events
function setupEventListeners() {
  addButton.addEventListener("click", openAddModal);
  closeButton.addEventListener("click", closeModal);
  saveButton.addEventListener("click", saveItem); // Added only when saveItem() is added

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
}

// 5. Update the date in the header
function updateDate() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[now.getDay()];

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  document.getElementById("currentDay").textContent = dayName;
  document.getElementById("currentDate").textContent = formattedDate;
}

// 6. Open the modal to add a new item
function openAddModal() {
  document.getElementById("modalTitle").textContent = "Add New Goal";
  document.getElementById("inputTitle").value = "";
  document.getElementById("inputDescription").value = "";
  document.getElementById("inputImageUrl").value = "";

  // Set blue as default
  document.querySelector('input[name="itemStyle"][value="blue"]').checked =
    true;

  isEditing = false;
  editingItemId = null;
  modal.style.display = "flex";
}

// 7. Close the modal
function closeModal() {
  modal.style.display = "none";
}

function openEditModal(item) {
  document.getElementById("modalTitle").textContent = "Edit Goal";
  document.getElementById("inputTitle").value = item.title;
  document.getElementById("inputDescription").value = item.description;
  document.getElementById("inputImageUrl").value = item.imageUrl || "";

  // Set the correct style
  document.querySelector(
    `input[name="itemStyle"][value="${item.style}"]`, // item.style can be 'blue', 'purple', or 'white'
  ).checked = true;

  isEditing = true; // This sets the global flag to indicate we're in editing mode rather than adding a new item
  editingItemId = item.id; // This saves the current item's id so we know which item to update when the user saves changes (show saveItem function)
  modal.style.display = "flex"; // This makes the modal visible by setting its display property to 'flex'
}

// 9. Helper function to edit item by ID
function editItemById(itemId) {
  // declares a function named editItemId that accepts one parameter called itemId
  const item = visionBoardItems.find((i) => i.id === itemId); // searches the visionBoardItems array to find an item whose id property matches item
  if (item) {
    // If that item exists then call the openEditModal, passing the item in question from the visionBoard array of items
    openEditModal(item);
  }
}

// 10. Display all items on the board
function displayItems() {
  // function declaration
  // **UNCOMMENT FUNCTION CALL ABOVE (LINE 25)**
  if (visionBoardItems.length === 0) {
    // checks if the visionBoardItems array is empty. If so, runs the below:
    visionBoard.innerHTML = `
    <div class="empty-state">
    <p>Your vision board is empty. Click the + button to add a goal</p>
    </div>
    `;
    return;
  }

  visionBoard.innerHTML = ""; // This line clears existing content to prevent duplicates when displayItems() is called multiple times.

  visionBoardItems.forEach((item) => {
    // loops through each item in the array and creates a new div element with CSS classes for styling.
    const boardItem = document.createElement("div");
    boardItem.className = `board-item ${item.style}`; // point to the example of blue/white/purple classes in CSS

    // Then we grab that recent created div with the styling based on whatever style the user selected in the modal and sets its innerHTML:
    boardItem.innerHTML = `
  <div class="item-image">
    ${
      item.imageUrl // Checks if the user placed any picture, if he did, show that picture. if not, show a placeholder
        ? `<img src="${item.imageUrl}" alt="${item.title}"/>`
        : `<div class="item-image-placeholder">No image</div>`
    }
  </div>
  <div class="item-content">
  <!== *****ITEM TITLE SELECTED BY USER***** ==>
    <div class="item-title">${item.title}</div>
  <!== *****ITEM DESCRIPTION***** ==>
    <div class="item-description">
      ${item.description /*Item title selected by the user */ || "No description"}
    </div>
    <div class="action-buttons">
    <!-- *****This creates two action buttons for each item - an edit button that calls editItemById and a delete button called deleteItem
      <button 
        class="action-btn btn-secondary" 
        onclick="editItemById('${item.id}')">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
    </button>
    <button class="action-btn btn-primary" onclick="deleteItem('${item.id}')">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
    </button>
    </div>
    </div>
  `;

    visionBoard.appendChild(boardItem); // This adds the completed item element to the vision board container, making it visible on the page
    // appendChild adds an element to the end of the parent element. In this case, it puts the new item into the vision board so it shows on the page.
  });
}

// 11. Save items to browser storage
function saveItemsToStorage() {
  // Since localStorage isn't available we simulate its behavior, so this function consoles the visionBoardItems (array of all items), and if any errors occur it logs it to the console.
  try {
    console.log("Saving items:", visionBoardItems);
  } catch (error) {
    console.log("Could not save items to storage");
  }
}

// Save a new or edited item
function saveItem() {
  // This function handles saving both new and edited items by first getting the form input values and validating that a title was entered (stopping execution if empty).
  // **Uncomment function call on line 17
  const title = document.getElementById("inputTitle").value.trim();

  if (!title) {
    alert("Please enter a goal title!");
    return;
  }

  const description = document.getElementById("inputDescription").value.trim();
  const imageUrl = document.getElementById("inputImageUrl").value.trim();

  // This finds all the color theme radio buttons, loops through them to find which one is selected, and stored that value (defaulting to "blue")
  let selectedStyle = "blue";
  const styleRadios = document.querySelectorAll('input[name="itemStyle"]');
  for (let radio of styleRadios) {
    if (radio.checked) {
      selectedStyle = radio.value; // Sets the selectedStyles variable to radio.value from the checked radio input
      break; // when the selected one is found, break the for loop
    }
  }

  // This creates a complete item object with all of the form data, using either the existing item's ID (if editing) or generating a new timestamp
  const item = {
    id: isEditing ? editingItemId : Date.now().toString(),
    title: title,
    description: description,
    imageUrl: imageUrl,
    style: selectedStyle,
  };

  if (isEditing) {
    // This determines whether we're editing an existing item or adding a new one. If editing, it finds and replaces the existing item in the ??
    const itemIndex = visionBoardItems.findIndex((i) => i.id === editingItemId);
    if (itemIndex !== -1) {
      // If is found then replace the current item to the new one (item)
      visionBoardItems[itemIndex] = item;
    }
  } else {
    // If is not found then it means is a new one and in that case we want to push the created item to the visionBoardItems (the array that ??)
    visionBoardItems.push(item);
  }

  // This completes the save process by storing the data (simulation), refreshing the display to show the changes, and closing the modal dialog box
  saveItemsToStorage();
  displayItems();
  closeModal();
}
