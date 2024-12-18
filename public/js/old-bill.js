document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-items').forEach(button => {
      button.addEventListener('click', function () {
        const billId = this.dataset.billId;
        const billItemsRow = document.getElementById(`bill-items-${billId}`);
        
        if (billItemsRow.style.display === 'none') {
          // Show the items
          billItemsRow.style.display = '';
          this.textContent = 'Close'; // Change button text
          this.classList.remove('btn-info');
          this.classList.add('btn-danger');
        } else {
          // Hide the items
          billItemsRow.style.display = 'none';
          this.textContent = 'Open'; // Change button text
          this.classList.remove('btn-danger');
          this.classList.add('btn-info');
        }
      });
    });
  });

