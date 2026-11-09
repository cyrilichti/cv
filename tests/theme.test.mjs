import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme } from '../src/hooks/theme.ts';

test('uses the device preference when no manual choice is saved', () => {
  assert.equal(resolveTheme(null, false), 'light');
  assert.equal(resolveTheme(null, true), 'dark');
});

test('manual choice takes precedence over the device preference', () => {
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme('dark', false), 'dark');
});

test('ignores an unsupported stored value', () => {
  assert.equal(resolveTheme('unknown', true), 'dark');
});
