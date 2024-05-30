import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookId?: number;
  bookDetails: any;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private sanitizer: DomSanitizer,
    private authService: AuthenticateService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      if (this.bookId) {
        this.fetchBookDetails(this.bookId);
      } else {
        console.error('Invalid book ID');
      }
    });
    this.isAdmin = this.authService.getUserRole() === 'admin';
  }

  fetchBookDetails(bookId: number) {
    this.bookService.getBookDetails(bookId).subscribe(
      (response) => {
        this.bookDetails = response;
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  deleteBook() {
    if (this.bookId !== undefined) {
      this.bookService.deleteBook(this.bookId).subscribe(
        () => {
          console.log('Book deleted successfully');
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }

  editBook() {
    if (this.bookId !== undefined) {
      this.router.navigate(['/edit-book', this.bookId]);
    }
  }
}
