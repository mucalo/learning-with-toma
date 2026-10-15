import { EmphasisPipe } from './emphasis.pipe';

describe('EmphasisPipe', () => {
  const pipe = new EmphasisPipe();

  it('should split text into plain and bold parts', () => {
    expect(pipe.transform('I **really** can’t **draw**.')).toEqual([
      { text: 'I ', bold: false },
      { text: 'really', bold: true },
      { text: ' can’t ', bold: false },
      { text: 'draw', bold: true },
      { text: '.', bold: false }
    ]);
  });

  it('should handle text that starts bold or has no markers', () => {
    expect(pipe.transform('**All** of it')).toEqual([
      { text: 'All', bold: true },
      { text: ' of it', bold: false }
    ]);
    expect(pipe.transform('Plain text')).toEqual([{ text: 'Plain text', bold: false }]);
  });
});
