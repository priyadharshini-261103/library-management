// src/app/book-list/book-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.http.get<any[]>('https://library-backend-xsed.onrender.com/books').subscribe(
      data => {
        this.books = data;
      },
      error => {
        console.error('Error fetching books:', error);
      }
    );
  }

  viewBookDetails(bookId: string): void {
    this.router.navigate(['/book-details', bookId]);
  }
}
