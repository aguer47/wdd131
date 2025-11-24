const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

//  Create array using the function OR empty array
let chaptersArray = getChapterList() || [];

//  For each saved chapter, display it on the screen
chaptersArray.forEach(chapter => {
    displayList(chapter);
});


button.addEventListener('click', () => {
    if (input.value.trim() !== '') {   
        displayList(input.value);        
        chaptersArray.push(input.value);
        setChapterList();                
        input.value = '';                
        input.focus();                   
    }
});


function displayList(item) {
    let li = document.createElement('li');
    let deletebutton = document.createElement('button');

    li.textContent = item;
    deletebutton.textContent = '❌';
    deletebutton.classList.add('delete');  

    li.append(deletebutton);
    list.append(li);

    
    deletebutton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}


function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}


function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}


function deleteChapter(chapter) {
    // remove the ❌ at the end
    chapter = chapter.slice(0, chapter.length - 1);

    chaptersArray = chaptersArray.filter(item => item !== chapter);

    setChapterList();
}
