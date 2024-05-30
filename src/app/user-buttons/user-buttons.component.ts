import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-user-buttons',
  templateUrl: './user-buttons.component.html',
  styleUrls: ['./user-buttons.component.css']
})
export class UserButtonsComponent {
  constructor(
    private authService: AuthenticateService,
    private bookService: BookService,
    private router: Router
  ) {}

  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }

  // deleteBook(bookId: number) {
  //   this.bookService.DeleteBook(bookId).subscribe(
  //     response => {
  //       console.log('Book deleted successfully');
  //       this.router.navigate(['/books']);
  //     },
  //     (error: any) => {
  //       console.error('Error deleting book:', error);
  //     }
  //   );
  // }
  // editBook(bookId: number) {
  //   this.bookService.updateBook(bookId).subscribe(
  //     response => {
  //       console.log('Book deleted successfully');
  //       this.router.navigate(['/books']);
  //     },
  //     (error: any) => {
  //       console.error('Error deleting book:', error);
  //     }
  //   );
  // }
}
