import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.prod';
import { Book } from '../models/book.model';
import { BookService } from './book.service';

describe('Book Services', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  const listBook: Book[] = [
    {
      id: '1',
      name: 'El libro de la selva',
      author: 'Anonimo',
      isbn: 'any',
      price: 10,
      amount: 2,
    },
    {
      id: '2',
      name: 'The avengers',
      author: 'Anonimo',
      isbn: 'any',
      price: 15,
      amount: 2,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    httpMock.verify();
  });

  // Aquí empieza las pruebas
  it('Servicio creado', () => {
    expect(service).toBeTruthy();
  });

  it('get book list and method get', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBook);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBook);
  });
});
