import Tree from './tree_template';

const test = new Tree('Test Tree', 'Test of tree description', 'red');

it('Test class instaziation', () => {
  expect(test).toBeDefined();
});

it('Test content class', () => {
  expect(test.content.className).toBe('tree');
});

it('Test color assigment', () => {
  expect(test.content.style.background).toBe('red');
});

it('Test title assigment', () => {
  const title = test.content.querySelector('h3');
  expect(title.textContent).toBe('Test Tree');
});

it('Test decription assigment', () => {
  const description = test.content.querySelector('p');
  expect(description.textContent).toBe('Test of tree description');
});