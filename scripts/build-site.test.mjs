import assert from 'node:assert/strict';
import test from 'node:test';

import { buildSiteData } from './build-site.mjs';

const sample = `# Ultimate Tech Jobs

## Famous Job Sites

- [Zulu Jobs](https://zulu.example) - A directory for Zulu roles
- [alpha jobs](https://alpha.example)
- [Beta Jobs](https://beta.example) - Engineering roles
- This paragraph is not a link.

## Empty Section

This section intentionally has no resource links.

## Remote Sites

- [Work Anywhere](https://remote.example) - Remote-first roles
`;

test('parses resource links with and without descriptions', () => {
  const { sections } = buildSiteData(sample);
  assert.deepEqual(sections[0].items, [
    { name: 'alpha jobs', url: 'https://alpha.example', note: '' },
    { name: 'Beta Jobs', url: 'https://beta.example', note: 'Engineering roles' },
    { name: 'Zulu Jobs', url: 'https://zulu.example', note: 'A directory for Zulu roles' },
  ]);
});

test('omits sections without links and ignores non-link entries', () => {
  const { sections } = buildSiteData(sample);
  assert.deepEqual(sections.map((section) => section.title), ['Famous Job Sites', 'Remote Sites']);
  assert.equal(sections[0].items.length, 3);
});

test('sorts names without case-sensitive ordering', () => {
  const { sections } = buildSiteData(sample);
  assert.deepEqual(sections[0].items.map((item) => item.name), ['alpha jobs', 'Beta Jobs', 'Zulu Jobs']);
});
