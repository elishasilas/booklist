// Book class: Represents a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI class: Handles UI Tasks
class UI{
    static displayBooks(){   

        // const books = Store.getBooks();

        // books.forEach(function(book){
        //     return UI.addBookToList(book);
        // });

        const books =  [
            {
            title: "Atomic", 
            author: "Chris tylor", 
            isbn: 			"000987"
            }
        ];

        let storedBooks = books;
        storedBooks.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");

        container.insertBefore(div, form);

        setTimeout(function(){
            return document.querySelector(".alert").remove();
        }, 1000);
    }

    static clearFields(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
}
// Store class: Handles storage
// class Store{
//     static getBooks(){
//         let books;
//         if(localStorage.getItem("books") === null){
//             books = [];
//         }else{
//             books = JSON.parse(localStorage.getItem("books"));
//         }
//         return books;
//     }
//     static addBook(book){
//         const books = Store.getBooks();
//         books.push(book);

//         localStorage.setItem("books", JSON.stringify(books));
//     }
//     static removeBook(isbn){
//         const books = Store.getBooks();

//         books.forEach((book, index) => {
//             if(book.isbn === isbn){
//                 books.splice(index, 1);
//                 localStorage.setItem("books", JSON.stringify(books));
//             }
//         });

//     }
// }
// Events: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add Books
document.addEventListener("submit", (event) => {
    event.preventDefault();

    const title =document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if(title === "" || author === "" || isbn === ""){
        UI.showAlert('Fill in the fields', "danger");
    }else{
        // Instancing a new object
        const book = new Book(title, author, isbn);

        // Add book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);
        
        // Show success messages
        UI.showAlert("Book added", "success");

        // Clear fields
        UI.clearFields();
    }
   
})
// Event: Remove Books
document.querySelector("#book-list").addEventListener("click", (e) => {  
   // Remove book from UI
   UI.deleteBook(e.target);

   // Remove book from store
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

   // Show success message
   UI.showAlert("Book removed", "success");
});

document.querySelector("#book-list").addEventListener("click", (e) => {
    console.log(e.target.parentElement.previousElementSibling.innerText);
})