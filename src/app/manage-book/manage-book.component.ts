
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.css'
})
export class ManageBookComponent implements OnInit {
  bookId?: number;
  bookDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
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

  updateBook() {
    if (this.bookId !== undefined) {
      this.bookService.updateBook(this.bookId, this.bookDetails).subscribe(
        () => {
          console.log('Book updated successfully');
          this.router.navigate(['/book-details', this.bookId]);
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }
}
