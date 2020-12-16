import { Branch } from './templates';

const test = new Branch('high', 'testing note', 'Test', 'testing description', '02/10/2021');

it('Tests class instanziation', () => {
  expect(test).toBeDefined();
});

it('Tests content class', () => {
  expect(test.content.className).toBe('branch');
});

it('Test type of status', () => {
  expect(test.status.type).toBe('checkbox');
});

it('Test content of Title', () => {
  const result = test.content.querySelector('h3');
  expect(result.textContent).toBe('Test');
});

it('Test content of priority', () => {
  const status = test.content.querySelector('.b-priority');
  expect(status.textContent).toContain('high');
});

it('Test content of description', () => {
  const description = test.content.querySelector('p');
  expect(description.textContent).toContain('testing description');
});