
const input = document.querySelector('#favchap');

const button = document.querySelector('button');

const list = document.querySelector('#list');

// Add event listener to button
button.addEventListener('click', function () {

    
    if (input.value.trim() !== '') {

        
        const li = document.createElement('li');

        
        const deleteButton = document.createElement('button');

        
        li.textContent = input.value;

        // Add delete button text
        deleteButton.textContent = '❌';

        
        li.append(deleteButton);

        
        list.append(li);

        
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        
        input.value = '';

    }

    
    input.focus();
});
