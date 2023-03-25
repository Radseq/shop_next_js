import { createClient } from "redis"

const globalRedis = global as unknown as {
	redis: Promise<ReturnType<typeof createClient>>
}

export const redisCache = globalRedis.redis || createCache()

if (process.env.NODE_ENV !== "production") globalRedis.redis = redisCache

function createCache(): Promise<ReturnType<typeof createClient>> {
	if (!globalRedis.redis) {
		globalRedis.redis = new Promise((resolve, reject) => {
			const redisClient = createClient()
			redisClient.on("error", (err) => reject(err))
			redisClient.on("connect", () => console.log("Redis connecting"))
			redisClient.on("reconnecting", () =>
				console.log("Redis reconnecting")
			)
			redisClient.on("ready", () => resolve(redisClient))
			redisClient.connect()
		})
	}
	return globalRedis.redis
}
