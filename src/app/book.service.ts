import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Book {
  genres: string;
  book: string;
  author: string;
  price: string;
  rating: string;
  imagelink: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/api/books/genre';

  constructor(private http: HttpClient) { }

  getBooksByGenre(genre: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/${genre}`);
  }
}
