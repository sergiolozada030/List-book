import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from '../../models/book.model';

describe('Cart Component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    service = fixture.debugElement.injector.get(BookService);
    component = fixture.componentInstance;
    spyOn(service, 'getBooksFromCart').and.callFake(() => listBook);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  /* Test a un metodo con return */
  it('El precio total retorna un valor', () => {
    const totalPrice = component.getTotalPrice(listBook);
    expect(totalPrice).not.toBe(0);
    expect(totalPrice).not.toBeNull();
    // expect(totalPrice).toBeLessThanOrEqual(50);
  });

  /* Test a un metodo sin return, uso de spyOn */
  it('El precio total se aumenta', () => {
    const action = 'plus';
    const book = listBook[0];
    const spyBookService = spyOn(service, 'updateAmountBook').and.callFake(
      () => null
    );

    const spyGetTotalPrice = spyOn(component, 'getTotalPrice').and.callFake(
      () => null
    );

    expect(book.amount).toBe(2);
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(3);

    expect(spyBookService).toHaveBeenCalled();
    expect(spyGetTotalPrice).toHaveBeenCalled();
  });

  /* Test a un metodo sin return, uso de spyOn */
  it('El precio total se disminuye', () => {
    const action = 'minus';
    const book = listBook[1];
    const spyBookService = spyOn(service, 'updateAmountBook').and.callFake(
      () => null
    );

    const spyGetTotalPrice = spyOn(component, 'getTotalPrice').and.callFake(
      () => null
    );

    expect(book.amount).toBe(2);
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(1);

    expect(spyBookService).toHaveBeenCalled();
    expect(spyGetTotalPrice).toHaveBeenCalled();
  });

  /* Test a un metodo que llama un metodo privado */
  it('Elimina los libros del carrito', () => {
    component.listCartBook = listBook;

    const spy_clearListCartBook = spyOn(
      component as any,
      '_clearListCartBook'
    ).and.callThrough();

    const spyRemoveBooksFromCart = spyOn(
      service,
      'removeBooksFromCart'
    ).and.callFake(() => null);

    component.onClearBooks();
    expect(spy_clearListCartBook).toHaveBeenCalled();
    expect(component.listCartBook.length).toBe(0);
    expect(spyRemoveBooksFromCart);
  });
});
