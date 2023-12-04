const bookContainer = document.querySelector('.book-cards')

let myLibrary = [];

function addLocalStorage() {
    myLibrary = JSON.parse(localStorage.getItem('library')) || []
    saveAndRenderBooks();
};

function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute('class', className);
    return element;
};

function createReadElement(bookItem, book){
    let read = document.createElement('div');
    read.setAttribute('class', 'book-read');
    read.appendChild(createBookElement('h1', 'Read?', 'book-read-title'));
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.addEventListener('click', (e) => {
        if(e.target.checked){
            bookItem.setAttribute('class', 'card book read-checked')
            book.read = true;
            saveAndRenderBooks();
        } else {
            bookItem.classList.remove('read-checked');
            book.read = false;
            saveAndRenderBooks();
        }
    });

    if(book.read){
        input.checked = true;
        bookItem.setAttribute('class', 'card book read-checked');
    }
    read.appendChild(input);
    return read;
};

function createEditIcon(book){
    const editIcon = document.createElement('img');
    editIcon.src = 'images/pencil.svg'
    editIcon.setAttribute('class', 'edit-icon')

    editIcon.addEventListener('click', (e) => {
        console.log(book)
    });
    return editIcon;
};

function deleteBook(index){
    myLibrary.splice(index, 1);
    saveAndRenderBooks();
};

function createBookItem(book, index) {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('id', index);
    bookItem.setAttribute('key', index);
    bookItem.setAttribute('class', 'card book');

    bookItem.appendChild(createBookElement('h1', `Title: ${book.title}`, 'book-title'));
    bookItem.appendChild(createBookElement('h1', `Author: ${book.author}`, 'book-author'));
    bookItem.appendChild(createBookElement('h1', `Pages: ${book.pages}`, 'book-pages'));

    bookItem.appendChild(createReadElement(bookItem, book));
    bookItem.appendChild(createBookElement('button', 'X', 'delete'));
    bookItem.appendChild(createEditIcon());

    bookItem.querySelector('.delete').addEventListener('click', () => {
        deleteBook(index);
    });

    bookContainer.appendChild(bookItem);
}
    
function renderBooks() {
    bookContainer.textContent = ''; 
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    });
}

function saveAndRenderBooks(){
    localStorage.setItem('library', JSON.stringify(myLibrary));
    renderBooks();
}

addLocalStorage();