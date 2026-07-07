import { afterEach, describe, expect, it, vi } from 'vitest';

import { PortfolioChatApiError, sendPortfolioChatMessage } from '../services/portfolioChatApi';

describe('sendPortfolioChatMessage', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('throws when chat env vars are missing', async () => {
    vi.stubEnv('VITE_YARBA_API_URL', '');
    vi.stubEnv('VITE_YARBA_PORTFOLIO_SUBDOMAIN', '');

    await expect(sendPortfolioChatMessage({ message: 'Hello' })).rejects.toMatchObject({
      name: 'PortfolioChatApiError',
      status: 0,
    });
  });

  it('posts to the YARBA public portfolio chat endpoint', async () => {
    vi.stubEnv('VITE_YARBA_API_URL', 'https://api.example.com');
    vi.stubEnv('VITE_YARBA_PORTFOLIO_SUBDOMAIN', 'muja');

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          response: 'I work with Python and FastAPI.',
          conversation_id: 'conv-123',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );

    const result = await sendPortfolioChatMessage({
      message: 'What is your stack?',
      history: [{ role: 'user', content: 'Hi' }],
    });

    expect(result.conversation_id).toBe('conv-123');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/api/v1/public/portfolio/chat',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          subdomain: 'muja',
          message: 'What is your stack?',
          conversation_id: null,
          history: [{ role: 'user', content: 'Hi' }],
        }),
      })
    );
  });

  it('maps non-OK responses to PortfolioChatApiError', async () => {
    vi.stubEnv('VITE_YARBA_API_URL', 'https://api.example.com');
    vi.stubEnv('VITE_YARBA_PORTFOLIO_SUBDOMAIN', 'muja');

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('Chatbot is not enabled', { status: 403 })
    );

    await expect(sendPortfolioChatMessage({ message: 'Hello' })).rejects.toEqual(
      expect.any(PortfolioChatApiError)
    );
  });
});
