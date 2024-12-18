document.getElementById('itemName').addEventListener('input',function(){
    const query = this.value.trim();
    if(query.length > 1){
        fetchSuggestions(query);
    }
    else{
        document.getElementById('suggestionsList').style.display = 'none';
    }
})

function fetchSuggestions(query){

    fetch(`/get-medicine?query=${encodeURIComponent(query)}`)
    .then(response=>response.json())
    .then(data=> {
        displaySuggestions(data)
    })
    .catch(error=> console.error("Error fetching suggestions:",error));
}

function displaySuggestions(suggestions) {
    const suggestionList = document.getElementById('suggestionsList');
    suggestionList.innerHTML='';
    if (suggestions.length === 0) {
        suggestionsList.style.display = 'none';
        return;
    }

    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('li');
        suggestionItem.classList.add('list-group-item');
        suggestionItem.textContent = suggestion.name;
        suggestionItem.addEventListener('click', function() {
            document.getElementById('itemName').value = suggestion.name;
            document.getElementById('itemType').value = suggestion.type_of_prod;
            document.getElementById('itemPrice').value = suggestion.price;
            document.getElementById('itemQty').value = suggestion.qty;
            document.getElementById('itemItemsPerQty').value = suggestion.items_per_qty;
            document.getElementById('itemExpDate').value = suggestion.exp_date.substring(0, 7); // Assuming the date is in ISO format
            suggestionList.style.display = 'none';
        });

        suggestionList.appendChild(suggestionItem);
    });

    suggestionList.style.display = 'block';

}

document.addEventListener('click', function(event) {
    if (!event.target.closest('#itemName')) {
        document.getElementById('suggestionsList').style.display = 'none';
    }
});


function resetForm() {
    document.getElementById('addItemForm').reset();
    document.getElementById('suggestionsList').style.display = 'none';
}

$('#addItemModal').on('hidden.bs.modal', function () {
    resetForm();
});