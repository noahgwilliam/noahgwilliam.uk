// Simple rate limiter for contact form
// NOTE: This uses in-memory storage, so it resets when serverless functions restart.
// For production with multiple instances, consider Upstash Redis (@upstash/ratelimit)

type RateLimitStore = Map<string, { count: number; resetTime: number }>

const store: RateLimitStore = new Map()

interface RateLimitConfig {
	maxRequests: number // Max requests allowed
	windowMs: number // Time window in milliseconds
}

export async function rateLimit(
	identifier: string,
	config: RateLimitConfig = { maxRequests: 3, windowMs: 60000 } // 3 requests per minute
): Promise<{ success: boolean; remaining: number }> {
	const now = Date.now()
	const record = store.get(identifier)

	// Clean up expired entries
	if (record && now > record.resetTime) {
		store.delete(identifier)
	}

	const current = store.get(identifier)

	if (!current) {
		// First request
		store.set(identifier, {
			count: 1,
			resetTime: now + config.windowMs,
		})
		return { success: true, remaining: config.maxRequests - 1 }
	}

	if (current.count >= config.maxRequests) {
		// Rate limit exceeded
		return { success: false, remaining: 0 }
	}

	// Increment counter
	current.count++
	store.set(identifier, current)

	return { success: true, remaining: config.maxRequests - current.count }
}

// Cleanup old entries every 5 minutes
setInterval(() => {
	const now = Date.now()
	for (const [key, value] of store.entries()) {
		if (now > value.resetTime) {
			store.delete(key)
		}
	}
}, 5 * 60 * 1000)
