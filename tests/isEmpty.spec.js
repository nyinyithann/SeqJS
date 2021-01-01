import Seq from '../src/main';

describe('isEmpty()', () => {
  test('empty seq should be empty', () => {
    expect(Seq.empty().isEmpty()).toBe(true);
  });

  test('empty seq\'s length is 0', () => {
    expect(Seq.empty().length).toBe(0);
  });

  test('apply/call invocation on null context should throw error', () => {
    const { isEmpty } = Seq.prototype;
    expect(() => isEmpty.apply(null)).toThrow(TypeError);
  });
});
