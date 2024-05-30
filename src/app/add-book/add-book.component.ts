import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  book = {
    id: '',
    title: '',
    author: '',
    description: '',
    cover_image: '',
    category: '',
    pdf_url: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  addBook() {
    this.http.post('http://localhost:3000/api/books', this.book).subscribe(
      response => {
        console.log('Book added successfully', response);
        this.router.navigate(['/admin']);
      },
      error => {
        console.error('Error adding book', error);
      }
    );
  }
}