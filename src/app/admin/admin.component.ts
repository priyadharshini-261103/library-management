import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
// If BooksResponse is defined in a file named books-response.interface.ts


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Corrected property name
})
export class AdminComponent implements OnInit {
  categorizedBooks: { [category: string]: any[] } = {};

  constructor(private bookService: BookService,private router: Router) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.categorizedBooks = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  addBook(): void {
    // Navigate to the page where you can add a new book
    this.router.navigate(['/add-book']);
  }
  getCategories(): string[] {
    return Object.keys(this.categorizedBooks);
  }
  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book-details/', bookId]);
  }

  scrollLeft(category: string) {
    const element = document.getElementById('book-list-' + category);
    if (element) {
      element.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }
  
  scrollRight(category: string) {
    const element = document.getElementById('book-list-' + category);
    if (element) {
      element.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
  
  
}
