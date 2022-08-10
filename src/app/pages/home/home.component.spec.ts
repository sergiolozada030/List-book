import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { HomeComponent } from './home.component';

describe('Home Component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: BookService;

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

  // Ejemplo de mock service
  const BookServiceMock = {
    getBooks: () => of(listBook),
  };

  // Ejemplo de mock pipe
  @Pipe({
    name: 'reduceText',
  })
  class ReduceTextPipeMock implements PipeTransform {
    transform(): string {
      return '';
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent, ReduceTextPipeMock],
      providers: [
        //BookService
        { provide: BookService, useValue: BookServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    service = fixture.debugElement.injector.get(BookService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente creado correctamente', () => {
    expect(component).toBeTruthy();
  });

  /* Ejemplo Test a un observable */
  it('getBooks Trae el array de libros', () => {
    /* const spyGetBooks = spyOn(service, 'getBooks').and.returnValue(
      of(listBook)
    ); */
    component.getBooks();
    //expect(spyGetBooks).toHaveBeenCalled();
    expect(component.listBook.length).toBe(2);
  });
});
