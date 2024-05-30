import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] // Change styleUrl to styleUrls
})
export class SearchComponent {
  title: string = '';
  author: string = '';
  category: string = '';
  subject: string = '';
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient) {}

  searchBooks() {
    const queryParams = {
      title: this.title,
      author: this.author,
      category: this.category,
      subject: this.subject,
      searchQuery: this.searchQuery
    };

    this.http.get<any[]>('/api/books', { params: queryParams }).subscribe(
      (response) => {
        this.searchResults = response;
      },
      (error) => {
        console.error('Error fetching search results:', error);
        // Handle error (e.g., display error message to user)
      }
    );
  }
}
