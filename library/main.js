const bookContainer = document.querySelector('.book-cards')

const myLibrary = [
    {
        title: 'Book1',
        author: 'me',
        pages: 235,
        read: true,

    },
    {
        title: 'Book34',
        author: 'Wanda',
        pages: 340,
        read: false,

    }
];

function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute('class', className);
    return element;
}

function createBookItem(book,index) {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('id', index)
    bookItem.setAttribute('key', index)
    bookItem.setAttribute('class', 'card book')
    bookItem.appendChild(createBookElement('h1', `Title: ${book.title}`, 'book-title'));
    bookItem.appendChild(createBookElement('h1', `Author: ${book.author}`, 'book-author'));
    bookItem.appendChild(createBookElement('h1', `Pages: ${book.pages}`, 'book-pages'));
    bookContainer.appendChild(bookItem);
}

function renderBooks() {
    myLibrary.map((book, index)=>{
        createBookItem(book, index)
    })
};

renderBooks();