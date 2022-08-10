import { ReduceTextPipe } from './reduce-text.pipe';

describe('Reduce Pipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  it('Pipe funciona correctamente', () => {
    const text = 'Este es un texto de mas de 15 caracteres';
    const textNew = pipe.transform(text, 15);
    expect(textNew.length).toBe(15);
  });
});
