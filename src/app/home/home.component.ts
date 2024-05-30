import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @ViewChild(NavbarComponent, { static: false }) // Ensure static is set to false for proper initialization
  // navbar!: NavbarComponent | undefined; // Initialize as undefined to avoid error during compilation

  categorizedBooks: { [category: string]: any[] } = {};
  searchResults: any[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  // ngAfterViewInit(): void {
  //   if (this.navbar) {
  //     this.navbar.searchResultsChanged.subscribe((searchResults: any[]) => {
  //       this.searchResults = searchResults;
  //       this.updateDisplayedBooks(searchResults);
  //     });
  //   } else {
  //     console.error('NavbarComponent is not available');
  //   }
  // }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.categorizedBooks = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  getCategories(): string[] {
    return Object.keys(this.categorizedBooks);
  }

  updateDisplayedBooks(searchResults: any[]): void {
    if (searchResults.length === 0) {
      this.categorizedBooks = {};
    } else {
      const updatedCategorizedBooks: { [category: string]: any[] } = {};
      for (const result of searchResults) {
        if (!updatedCategorizedBooks[result.category]) {
          updatedCategorizedBooks[result.category] = [];
        }
        updatedCategorizedBooks[result.category].push(result);
      }
      this.categorizedBooks = updatedCategorizedBooks;
    }
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book-details/', bookId]);
  }

  scrollLeft(category: string): void {
    const element = document.getElementById('book-list-' + category);
    if (element) {
      element.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(category: string): void {
    const element = document.getElementById('book-list-' + category);
    if (element) {
      element.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  performSearch(event: { filter: string, query: string }): void {
    if (event.query.trim() !== '') {
      this.bookService.searchBooks(event.filter, event.query).subscribe(
        (searchResults) => {
          this.updateDisplayedBooks(searchResults);
        },
        (error) => {
          console.error('Error performing search:', error);
        }
      );
    }
  }
}
