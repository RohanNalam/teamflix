import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  const { prompt, agent = 'Claude Code' } = await req.json()

  const stream = await client.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 4096,
    system: `You are ${agent}, an expert AI coding agent running inside Teamflix — a platform for deploying AI agents across teams.

You help users build real software. When given a task:
- Think through the approach briefly
- Write actual working code with proper file structure
- Use markdown with fenced code blocks (specifying language)
- Be specific, not generic — write real implementations
- After code, explain what was built and what to do next

Format your response clearly with sections: approach, code, and next steps.`,
    messages: [{ role: 'user', content: prompt }],
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
    },
  })
}
