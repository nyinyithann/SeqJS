import Seq from '../src/main';

describe('range', () => {
  test('begin must be a finite number or throw TypeError', () => {
    expect(() => Seq.range('1', 0, 0)).toThrow(TypeError);
    expect(() => Seq.range('abc', 0, 0)).toThrow(TypeError);
    expect(() => Seq.range(1, 0, 0)).not.toThrow(TypeError);
  });

  test('if end has something, it must be a finite number. Otherwise; throw TypeError', () => {
    expect(() => Seq.range(1, '0', 0)).toThrow(TypeError);
    expect(() => Seq.range(1, Infinity, 0)).toThrow(TypeError);
    expect(() => Seq.range(1, 1, 0)).not.toThrow(TypeError);
  });

  test('if step has something, it must be a finite number. Otherwise; throw TypeError', () => {
    expect(() => Seq.range(1, 10, '1')).toThrow(TypeError);
    expect(() => Seq.range(1, 10, '-1')).toThrow(TypeError);
    expect(() => Seq.range(1, 10, 2)).not.toThrow(TypeError);
  });

  test('if end is undefined, it is set to begin; and begin is set to 0', () => {
    expect(Seq.range(5).toArray()).toEqual([0, 1, 2, 3, 4]);
  });

  test('step is set to -1 if begin is negative; end and step are not defined', () => {
    expect(Seq.range(-5).toArray()).toEqual([0, -1, -2, -3, -4]);
  });

  test('should return empty sequence if begin is 0 and other params are not defined.', () => {
    expect(Seq.range(0).isEmpty()).toBe(true);
  });

  test('if undefined, step should be set to 1 if end is greater than begin', () => {
    expect(Seq.range(0, 5).toArray()).toEqual([0, 1, 2, 3, 4]);
  });

  test('if undefined, step should be set to -1 if begin is greater than end', () => {
    expect(Seq.range(5, 0).toArray()).toEqual([5, 4, 3, 2, 1]);
    expect(Seq.range(0, -5).toArray()).toEqual([0, -1, -2, -3, -4]);
  });

  test('if step is 0, the result sequence will contains only the value of begin param', () => {
    expect(Seq.range(1, 5, 0).toArray()).toEqual([1, 1, 1, 1]);
  });

  test('5 steps at a time', () => {
    expect(Seq.range(0, 25, 5).toArray()).toEqual([0, 5, 10, 15, 20]);
  });

  test('negative steps', () => {
    expect(Seq.range(5, -5, -2).toArray()).toEqual([5, 3, 1, -1, -3]);
  });

  test('from 10 down to -5 by step +1', () => {
    expect(Seq.range(10, -5, 1).toArray()).toEqual([]);
  });

  test('a new seq returned from range method should be multi-iterable', () => {
    const seq = Seq.range(0, 1000);
    /* eslint-disable */
    for (const _ of seq) {}
    for (const _ of seq) {}
    for (const _ of seq) {}
    expect(seq.toArray()).toEqual(seq.toArray());
  });

  test('from 10 down to -5 by step -1', () => {
    expect(Seq.range(10, -5, -1).toArray()).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4]);
  });

  test('any valid input should produce correct output', () => {
    expect(Seq.range(10, -5, -5).toArray()).toEqual([10, 5, 0]);
    expect(Seq.range(-5, -5, -5).toArray()).toEqual([]);
    expect(Seq.range(-1, -2, -5).toArray()).toEqual([-1]);
    expect(Seq.range(-5, -2, -5).toArray()).toEqual([]);
    expect(Seq.range(0).toArray()).toEqual([]);
  });
});
