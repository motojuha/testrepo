// DOM Elements
const addItemForm = document.getElementById('addItemForm');
const itemsList = document.getElementById('itemsList');

// Load items on page load
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
});

// Add item form submission
addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const price = parseFloat(document.getElementById('itemPrice').value);
    const description = document.getElementById('itemDescription').value;
    
    // Validate parsed values
    if (!name.trim()) {
        alert('Please enter an item name');
        return;
    }
    
    if (isNaN(quantity) || quantity < 0) {
        alert('Please enter a valid non-negative quantity');
        return;
    }
    
    if (isNaN(price) || price < 0) {
        alert('Please enter a valid non-negative price');
        return;
    }
    
    const formData = {
        name: name.trim(),
        quantity,
        price,
        description
    };
    
    try {
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            addItemForm.reset();
            loadItems();
        } else {
            alert('Failed to add item');
        }
    } catch (error) {
        console.error('Error adding item:', error);
        alert('Failed to add item');
    }
});

// Load all items
async function loadItems() {
    try {
        const response = await fetch('/api/items');
        const items = await response.json();
        
        displayItems(items);
    } catch (error) {
        console.error('Error loading items:', error);
        itemsList.innerHTML = '<div class="empty-state"><p>Failed to load items</p></div>';
    }
}

// Display items in the UI
function displayItems(items) {
    if (items.length === 0) {
        itemsList.innerHTML = '<div class="empty-state"><p>No items in inventory. Add your first item above!</p></div>';
        return;
    }
    
    itemsList.innerHTML = items.map(item => `
        <div class="item-card">
            <div class="item-header">
                <div class="item-name">${escapeHtml(item.name)}</div>
            </div>
            <div class="item-details">
                <div class="item-detail">
                    <span class="item-detail-label">Quantity:</span>
                    <span class="item-detail-value">${item.quantity}</span>
                </div>
                <div class="item-detail">
                    <span class="item-detail-label">Price:</span>
                    <span class="item-detail-value">$${item.price.toFixed(2)}</span>
                </div>
                <div class="item-detail">
                    <span class="item-detail-label">Total Value:</span>
                    <span class="item-detail-value">$${(item.quantity * item.price).toFixed(2)}</span>
                </div>
            </div>
            ${item.description ? `<div class="item-description">${escapeHtml(item.description)}</div>` : ''}
            <div class="item-actions">
                <button class="btn btn-danger" data-item-id="${item.id}">Delete</button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners using event delegation
    itemsList.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-item-id'));
            deleteItem(itemId);
        });
    });
}

// Delete item
async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/items/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadItems();
        } else {
            alert('Failed to delete item');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item');
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
