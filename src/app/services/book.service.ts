import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books';
  private baseUrl = 'http://localhost:3000/api/book-details'; 
  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }


  addBook(bookData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bookData).pipe(
      catchError(this.handleError)
    );
  }

  getBookDetails(bookId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${bookId}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateBook(id: number, bookData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit/${id}`, bookData).pipe(
      catchError(this.handleError)
    );
  }

  searchBooks(filter: string, query: string): Observable<any> {
    let params = new HttpParams();
    if (filter) params = params.set('filter', filter);
    if (query) params = params.set('query', query);

    return this.http.get<any>(`${this.apiUrl}/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred in BookService:', error);
    return throwError('Something bad happened; please try again later.');
  }
}

