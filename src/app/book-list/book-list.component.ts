import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  genre: string = '';

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.genre = params.get('genre') || '';
      this.getBooks(this.genre);
    });
  }

  getBooks(genre: string) {
    this.bookService.getBooksByGenre(genre).subscribe(data => {
      this.books = data;
    });
  }
  
}
