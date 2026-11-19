const VIDEO_SOURCES = {
  'jev-explainer':
    'https://video.twimg.com/amplify_video/2100190298521337856/vid/avc1/1920x1080/ctr_hlp8meBo-glr.mp4?tag=29',
  'jev-browser-test':
    'https://video.twimg.com/amplify_video/2100881920343105536/vid/avc1/2880x2160/xZmdi6NJHSIbX23m.mp4?tag=29',
} as const

type RouteContext = {
  params: Promise<{ id: string }>
}

const PASSTHROUGH_HEADERS = [
  'accept-ranges',
  'content-length',
  'content-range',
  'content-type',
] as const

async function proxyVideo(
  request: Request,
  context: RouteContext,
  method: 'GET' | 'HEAD',
) {
  const { id } = await context.params
  const source = VIDEO_SOURCES[id as keyof typeof VIDEO_SOURCES]

  if (!source) {
    return new Response('Video not found', { status: 404 })
  }

  const upstreamHeaders = new Headers()
  const range = request.headers.get('range')

  if (range) {
    upstreamHeaders.set('range', range)
  }

  const upstream = await fetch(source, {
    method,
    headers: upstreamHeaders,
  })

  if (!upstream.ok && upstream.status !== 206) {
    return new Response('Video is temporarily unavailable', { status: 502 })
  }

  const responseHeaders = new Headers({
    'cache-control': 'public, max-age=604800, immutable',
  })

  for (const name of PASSTHROUGH_HEADERS) {
    const value = upstream.headers.get(name)
    if (value) responseHeaders.set(name, value)
  }

  return new Response(method === 'HEAD' ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  })
}

export function GET(request: Request, context: RouteContext) {
  return proxyVideo(request, context, 'GET')
}

export function HEAD(request: Request, context: RouteContext) {
  return proxyVideo(request, context, 'HEAD')
}
