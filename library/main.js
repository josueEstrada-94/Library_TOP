// The container that stores the book cards.
const bookContainer = document.querySelector('.book-cards');

// The button 'New' to create a new book card.
const addBook = document.querySelector('.add-new-book');

// The modal that serves as interface to create/edit a book card.
const modal = document.querySelector('#modal');

// The 'X' button to close the modal.
const span = document.querySelector('.close');

// Form to fill with the info about the book.


// Listener to close the modal.
span.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal if the user clicks outside the modal.
window.addEventListener('click', (e) => {
    if(e.target == modal){
        modal.style.display = 'none'
    }
});

// Click to the 'New' button to display the modal.
addBook.addEventListener('click', () => {
    modal.style.display = 'block';
    document.querySelector('.form-title').textContent = 'Add Book';
    document.querySelector('.form-add-button').textContent = 'Add';
    
});

// Object constructor for the books info.
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.floor(Math.random()*100000000);

};

// Add the new book object into the array that stores the books.
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    saveAndRenderBooks()
}

const addBookForm = document.querySelector('.add-book-form');


// Take the info form the input fields and creates the book object.
// Also makes the edition of existing book cards.
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit button is working')

    const data = new FormData(e.target);
    let newBook = {};
    
    for(let [name, value] of data){
        if(name === 'book-read'){
            newBook['book-read'] = true;
        } else {
            newBook[name] = value || '';
        }
    }

    if(!newBook['book-read']) {
        newBook['book-read'] = false;
    }

    if(document.querySelector('.form-title').textContent === 'Edit Book'){
        console.log('Editing button is working');
        let id = parseInt(e.target.id);
        let editBook = myLibrary.find((book) => book.id === id);

        editBook.title = newBook['book-title'];
        editBook.author = newBook['book-author'];
        editBook.pages = newBook['book-pages'];
        editBook.read = newBook['book-read'];
        saveAndRenderBooks();
    } else {
        console.log('SAdding button is wornking');
        addBookToLibrary(
            newBook['book-title'],
            newBook['book-author'],
            newBook['book-pages'],
            newBook['book-read']
        );
    };

    addBookForm.reset();
    modal.style.display = 'none';
});

let myLibrary = [];

// Save the book objects into the main array that stores the books.
function addLocalStorage() {
    myLibrary = JSON.parse(localStorage.getItem('library')) || []
    saveAndRenderBooks();
};

/* Creates a single element inside the book cards.
el = type of HTML element
content = text that will contains the element.
className = the HTML class that will have this element. */
function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute('class', className);
    return element;
};

// Generates the Read checkbox and the actions related to it.
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

// Display the function to change the values of a stored book info.
function fillOutEditForm(book) {

    console.log('Book in createEditIcon:', book);
    // Verificar si book es undefined o nulo antes de acceder a sus propiedades
    if (book) {
        modal.style.display = 'block';
        document.querySelector('.form-title').textContent = 'Edit Book';
        document.querySelector('.form-add-button').textContent = 'Edit';

        // Asegurarse de que book tenga un id antes de asignarlo al formulario
        if (book.id) {
            document.querySelector('.add-book-form').setAttribute('id', book.id);
        } else {
            console.error('Book id is undefined or null');
        }

        document.querySelector('#book-title').value = book.title || '';
        document.querySelector('#book-author').value = book.author || '';
        document.querySelector('#book-pages').value = book.pages || '';
        document.querySelector('#book-read').checked = book.read;
    } else {
        console.error('Book is undefined or null');
    }
}


// Creates the 'edit' icon that is placed on the top-right corner of the book card
function createEditIcon(book) {
    console.log('Book in createEditIcon:', book);

    const editIcon = document.createElement('img');
    editIcon.src = 'images/pencil.svg';
    editIcon.setAttribute('class', 'edit-icon');

    // Añade un event listener que llama a fillOutEditForm solo si book no es undefined o nulo
    editIcon.addEventListener('click', (e) => {
        if (book) {
            fillOutEditForm(book);
        } else {
            console.error('Book is undefined or null');
        }
    });
    return editIcon;
}

// The function used to delete a book card.
function deleteBook(index){
    myLibrary.splice(index, 1);
    saveAndRenderBooks();
};

// Creates the book card itself with the elements that will be showed on it.
// And places it on the main book cards container.
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
    bookItem.appendChild(createEditIcon(book));

    bookItem.querySelector('.delete').addEventListener('click', () => {
        deleteBook(index);
    });

    bookContainer.appendChild(bookItem);
};

// Shows on the screen the books.
function renderBooks() {
    bookContainer.textContent = ''; 
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    });
};

// Shows on the screen the books that are stored in the myLibrary array, that it's converted into a JSON.
function saveAndRenderBooks(){
    localStorage.setItem('library', JSON.stringify(myLibrary));
    renderBooks();
}

addLocalStorage();