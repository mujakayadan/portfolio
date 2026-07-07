export interface PortfolioChatHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface PortfolioChatRequest {
  message: string;
  conversation_id?: string | null;
  history?: PortfolioChatHistoryMessage[];
}

export interface PortfolioChatResponse {
  response: string;
  conversation_id: string;
}

export class PortfolioChatApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'PortfolioChatApiError';
    this.status = status;
  }
}

const REQUEST_TIMEOUT_MS = 60000;

export const sendPortfolioChatMessage = async (
  payload: PortfolioChatRequest
): Promise<PortfolioChatResponse> => {
  const apiUrl = import.meta.env.VITE_YARBA_API_URL?.replace(/\/$/, '');
  const subdomain = import.meta.env.VITE_YARBA_PORTFOLIO_SUBDOMAIN?.trim().toLowerCase();

  if (!apiUrl || !subdomain) {
    throw new PortfolioChatApiError(
      'Chat API is not configured. Set VITE_YARBA_API_URL and VITE_YARBA_PORTFOLIO_SUBDOMAIN.',
      0
    );
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiUrl}/api/v1/public/portfolio/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        subdomain,
        message: payload.message,
        conversation_id: payload.conversation_id ?? null,
        history: payload.history ?? [],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new PortfolioChatApiError(
        detail || `Chat request failed (${response.status})`,
        response.status
      );
    }

    return (await response.json()) as PortfolioChatResponse;
  } catch (error) {
    if (error instanceof PortfolioChatApiError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new PortfolioChatApiError('Chat request timed out.', 408);
    }
    throw new PortfolioChatApiError(
      error instanceof Error ? error.message : 'Unable to send chat message.',
      0
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
};
