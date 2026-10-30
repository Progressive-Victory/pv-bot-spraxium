import { InternalRequest, RequestData, RequestMethod, RouteLike } from './types'
import { Injectable, type SpraxiumOnBoot } from '@spraxium/common'
import { ZodType } from 'zod'

@Injectable()
export class PvApiService implements SpraxiumOnBoot {
    jwt: string | null = null
    host: string

    constructor(host: string) {
        this.host = host
    }

    async auth(token: string) {
        const res = await fetch(`${this.host}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                discordToken: 'Bot ' + token,
            }),
        })
        if (!res.ok) console.error(Error("Can't fucking connect to API dawg"))
        const { accessToken } = (await res.json()) as { accessToken: string }
        this.jwt = accessToken
    }

    async request<R = void>(
        options: InternalRequest,
        schema?: ZodType
    ): Promise<R | void> {
        const doFetch = async (options: InternalRequest) => {
            if (!this.jwt) await this.auth(process.env.PV_DISCORD_TOKEN!)
            const url = new URL(this.host + options.fullRoute)
            options.query?.forEach((val: string, key: string) => {
                url.searchParams.append(key, val)
            })
            return await fetch(url, {
                method: options.method,
                body: options.body,
                headers: {
                    ...options.headers,
                    Authorization: 'Bot ' + this.jwt,
                },
            })
        }

        let res = await doFetch(options)

        if (res.status === 401) {
            this.jwt = null
            res = await doFetch(options)
        }

        if (!res.ok) {
            console.error(
                Error(
                    `API threw exception: ${res.status} ${res.statusText}${res.body ? '\n' + (await res.text()) : ''}`
                )
            )
            return
        }

        return this.parseResponse<R>(res, schema)
    }

    public async get<R>(
        fullRoute: RouteLike,
        schema: ZodType,
        options: RequestData = {}
    ): Promise<R> {
        return (await this.request<R>(
            {
                ...options,
                fullRoute,
                method: RequestMethod.Get,
            },
            schema
        )) as R
    }

    public async delete(fullRoute: RouteLike, options: RequestData = {}) {
        return this.request({
            ...options,
            fullRoute,
            method: RequestMethod.Delete,
        })
    }

    public async post<R = void>(
        fullRoute: RouteLike,
        options: RequestData = {},
        schema?: ZodType
    ) {
        return (await this.request<R>(
            { ...options, fullRoute, method: RequestMethod.Post },
            schema
        )) as R
    }

    public async put(fullRoute: RouteLike, options: RequestData = {}) {
        return this.request({
            ...options,
            fullRoute,
            method: RequestMethod.Put,
        })
    }

    public async patch(fullRoute: RouteLike, options: RequestData = {}) {
        return this.request({
            ...options,
            fullRoute,
            method: RequestMethod.Patch,
        })
    }

    private async parseResponse<R = void>(res: Response, schema?: ZodType) {
        if (!res.body) return
        const data = (await res.json()) as unknown

        if (!schema) return data as R
        return schema.parse(data) as R
    }

    // lifecycles
    async onBoot(): Promise<void> {
        if (!process.env.PV_DISCORD_TOKEN)
            throw new Error(
                "ERROR: Missing environment variable 'PV_DISCORD_TOKEN'"
            )
        await this.auth(process.env.PV_DISCORD_TOKEN)
    }
}
