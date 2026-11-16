// DOM Elements
const itemForm = document.getElementById('itemForm');
const itemIdInput = document.getElementById('itemId');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const itemsTableBody = document.getElementById('itemsTableBody');
const noItemsMessage = document.getElementById('noItemsMessage');

// Fetch and display all items on page load
document.addEventListener('DOMContentLoaded', fetchItems);

// READ: Fetch all items from the server
async function fetchItems() {
  try {
    const response = await fetch('/api/items');
    const items = await response.json();
    renderTable(items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

// Render items into the table
function renderTable(items) {
  itemsTableBody.innerHTML = '';

  if (!items || items.length === 0) {
    noItemsMessage.style.display = 'block';
    return;
  }

  noItemsMessage.style.display = 'none';

  items.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.id}</td>
      <td>${escapeHtml(item.name)}</td>
      <td>${item.price}</td>
      <td>
        <button class="btn-edit" onclick="startEdit(${item.id}, '${escapeAttribute(item.name)}', ${item.price})">Edit</button>
        <button class="btn-delete" onclick="deleteItem(${item.id})">Delete</button>
      </td>
    `;

    itemsTableBody.appendChild(row);
  });
}

// CREATE or UPDATE: Handle form submission
itemForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = itemIdInput.value;
  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);

  if (!name || isNaN(price)) {
    alert('Please enter a valid name and price.');
    return;
  }

  if (id) {
    // UPDATE: PUT /api/items/:id
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      });

      if (response.ok) {
        resetForm();
        fetchItems();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update item.');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  } else {
    // CREATE: POST /api/items
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      });

      if (response.ok) {
        resetForm();
        fetchItems();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to add item.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }
});

// Populate form for editing
function startEdit(id, name, price) {
  itemIdInput.value = id;
  nameInput.value = name;
  priceInput.value = price;
  submitBtn.textContent = 'Update';
  cancelBtn.style.display = 'inline-block';
  nameInput.focus();
}

// Cancel edit mode
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  itemIdInput.value = '';
  itemForm.reset();
  submitBtn.textContent = 'Submit';
  cancelBtn.style.display = 'none';
}

// DELETE: Remove item
async function deleteItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) {
    return;
  }

  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // If currently editing the deleted item, reset the form
      if (itemIdInput.value === String(id)) {
        resetForm();
      }
      fetchItems();
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Failed to delete item.');
    }
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

// Helper functions to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeAttribute(text) {
  return String(text).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
