import {renderTree, renderBranches} from './tree'


it('Test renderTree without db query', () => {
  expect(renderTree()).toBeUndefined();
})

it('Test renderBranches without db query', () => {
  expect(renderBranches()).toBeUndefined();
})