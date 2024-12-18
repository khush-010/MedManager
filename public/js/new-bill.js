function addItem() {
    const itemType = document.getElementById("itemType").innerText;
    const itemName = document.getElementById("itemName").value;
    const itemQty = document.getElementById("itemQty").value;
    const itemPrice = document.getElementById("itemPrice-bill").value;
    const availableStock = document.getElementById("availableStock").innerText;
    if(parseInt(itemQty) > parseInt(availableStock)){
        alert("Entered quantity is more than available stock");
        return;
    }
    if (itemName && itemQty && itemPrice) {
        const tableBody = document.getElementById("billTableBody");
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${itemType}</td>
            <td>${itemName}</td>
            <td>${itemQty}</td>
            <td>${itemPrice}</td>
            <td>${(itemPrice * itemQty).toFixed(2)}</td>
            <td><button class="delete-item"><i class="fa fa-trash " ></button></i></td>
        `;

        let currentTotal = parseFloat(document.querySelector("#total-bill span").innerText);
        currentTotal += parseFloat(itemPrice) * parseInt(itemQty);
        tableBody.appendChild(newRow);
        document.getElementById("itemName").value = "";
        document.getElementById("itemQty").value = "";
        document.getElementById("itemPrice-bill").value = "";
        document.querySelector("#total-bill span").innerText = currentTotal.toFixed(2);
    } else {
        alert("Please enter both item name and quantity.");
    }
}

document.getElementById('itemName').addEventListener('input', function() {
    const query = this.value.trim();
    if (query.length > 1) {
        fetchSuggestions(query);
    } else {
        document.getElementById('suggestionsList').style.display = 'none';
    }
});

function fetchSuggestions(query) {
    fetch(`/billing/get-medicine?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const uniqueMedicines={};
            data.forEach(medicine => {
                if (!uniqueMedicines[medicine.name] || medicine.price < uniqueMedicines[medicine.name].price) {
                    uniqueMedicines[medicine.name] = medicine;
                }
            });

            const uniqueMedicinesArray = Object.values(uniqueMedicines);
            displaySuggestions(uniqueMedicinesArray);
        })
        .catch(error => console.error("Error fetching suggestions:", error));
}

function displaySuggestions(suggestions) {
    const suggestionList = document.getElementById('suggestionsList');
    suggestionList.innerHTML = ''; // Clear previous suggestions

    if (suggestions.length === 0) {
        suggestionList.style.display = 'none'; 
        return;
    }

    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('li');
        suggestionItem.classList.add('list-group-item');
        suggestionItem.textContent = suggestion.name;
        suggestionItem.addEventListener('click', function() {
            document.querySelector('#itemType').innerText = suggestion.type_of_prod;
            document.getElementById('itemName').value = suggestion.name;
            document.getElementById('itemPrice-bill').value = suggestion.price/suggestion.items_per_qty;
            document.querySelector('#availableStock').innerText = suggestion.total_qty;
            suggestionList.style.display = 'none';
        });

        suggestionList.appendChild(suggestionItem); 
    });

    suggestionList.style.display = 'block';
}

document.addEventListener('click', function(event) {
    if (!event.target.closest('#itemName') && !event.target.closest('#suggestionsList')) {
        document.getElementById('suggestionsList').style.display = 'none';
    }
});

function resetForm() {
    document.getElementById('addItemForm-bill').reset();
    document.getElementById('suggestionsList').style.display = 'none';
}

$('#addItemModal').on('hidden.bs.modal', function () {
    resetForm();
});

$(document).on('click', '.delete-item', function() {
    let currentTotal = parseFloat(document.querySelector("#total-bill span").innerText);
    const itemPrice = parseFloat($(this).closest('tr').find('td:eq(2)').text());
    const itemQty = parseInt($(this).closest('tr').find('td:eq(1)').text());
    currentTotal-=itemPrice*itemQty ;
    document.querySelector("#total-bill span").innerText = currentTotal.toFixed(2);
    $(this).closest('tr').remove();
});

$(document).on('click', '#print-bill', function(){
    const items = [];
    $('#billTableBody tr').each(function() {
        const item = {
            type_of_prod: $(this).find('td:eq(0)').text(),
            name: $(this).find('td:eq(1)').text(),
            qty: $(this).find('td:eq(2)').text(),
            price: $(this).find('td:eq(3)').text(),
            total: $(this).find('td:eq(4)').text()
        };
        items.push(item);
    });
    if (items.length === 0) {
        alert('Please add items to the bill.');
        return;
    }

    const customerName = $('#customerName').val();
    let customerContact = $('#customerContact').val();
    customerContact = parseInt(customerContact);
    const totalAmount = items.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.qty), 0);
    if (!customerName || !customerContact) {
        alert('Please enter customer name and contact number.');
        return;
    }

   fetch('/billing/add-bill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerName, customerContact, totalAmount, items })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Bill added successfully.');
            location.reload();
        } else {
            alert('Failed to add bill.');
        }
    })
    .catch(error => console.error('Error adding bill:', error)); 
});

function validatePhone(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
  
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
    }
  }