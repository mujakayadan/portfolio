import { describe, expect, it } from 'vitest';

import { buildContactMailtoUrl } from '../utils/buildContactMailto';

describe('buildContactMailtoUrl', () => {
  it('builds a mailto link with encoded subject and body', () => {
    const url = buildContactMailtoUrl('owner@example.com', {
      visitorName: 'Jane Doe',
      visitorEmail: 'jane@example.com',
      message: 'Hello there!',
    });

    expect(url).toMatch(/^mailto:owner@example.com\?/);
    expect(url).toContain('subject=Portfolio%20contact%20from%20Jane%20Doe');
    expect(url).toContain('jane%40example.com');
    expect(url).toContain('Hello%20there!');
  });
});
