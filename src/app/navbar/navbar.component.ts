import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  selectedFilter: string = ''; // New property for selected filter
  filters: string[] = [ 'All','Title', 'Author', 'Category','Subject']; // Updated array for filters
  searchQuery: string = '';
  isDropdownOpen: boolean = false;
  isSidebarOpen: boolean = false;
  fullName: string = '';
  @Output() searchPerformed = new EventEmitter<{ filter: string, query: string }>();
  searchResults: any[] = []; 
  @Output() searchResultsChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private router: Router, public authService: AuthenticateService, private http: HttpClient) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.fullName = this.authService.getFullName();
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleSidenav(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  updatePlaceholder(): void {
    this.searchQuery = this.selectedFilter ? `Search by ${this.selectedFilter}` : 'Search';
  }

  search() {
    if (this.searchQuery.trim() !== '') {
      // Perform search API call
      this.http.get<any[]>('/api/books', { params: { filter: this.selectedFilter, query: this.searchQuery } }).subscribe(
        (response) => {
          this.searchResultsChanged.emit(response);
        },
        (error) => {
          console.error('Error fetching search results:', error);
          // Provide feedback to the user about the error
          // For example, you can display an error message on the UI
        }
      );
    }
  }
}
