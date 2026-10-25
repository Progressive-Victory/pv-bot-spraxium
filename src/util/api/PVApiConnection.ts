import { ZodType } from "zod";
import {
  PVApiConnectionOptions,
  InternalRequest,
  RequestData,
  RequestMethod,
  RouteLike,
} from "./types";

export class PVApiConnection {
  jwt: string | null = null;

  host: string;

  constructor(options: PVApiConnectionOptions) {
    this.host = options.host;
  }

  async auth(token: string) {
    await fetch(`${this.host}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        discordToken: "Bot " + token,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw Error("Unable to authenticate to the API.");
        const { accessToken } = await res.json() as { accessToken: string};
        this.jwt = accessToken;
      })
      .catch(console.error);
  }

  async request<R = void>(
    options: InternalRequest,
    schema?: ZodType,
  ): Promise<R | void> {
    if (!this.jwt) throw Error("run auth function");
    const url = new URL(this.host + options.fullRoute);
    options.query?.forEach((val: string, key: string) => {
      url.searchParams.append(key, val);
    });
    const res = await fetch(url, {
      method: options.method,
      body: options.body,
      headers: {
        ...options.headers,
        Authorization: "Bot " + this.jwt,
      },
    });
    if (res.status === 401 && options.attempt && options.attempt < 2) {
      this.jwt = null;
      options.attempt++;
      return this.request<R>(options, schema);
    }

    if (!res.ok)
      throw Error(
        `API threw exception: ${res.status} ${res.statusText}${res.body ? "\n" + (await res.text()) : ""}`,
      );

    return this.parseResponse<R>(res, schema);
  }

  /**
   * Runs a get request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async get<R>(
    fullRoute: RouteLike,
    schema: ZodType,
    options: RequestData = {},
  ): Promise<R> {
    return (await this.request<R>(
      {
        ...options,
        fullRoute,
        method: RequestMethod.Get,
      },
      schema,
    )) as R;
  }

  /**
   * Runs a delete request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async delete(fullRoute: RouteLike, options: RequestData = {}) {
    return this.request({
      ...options,
      fullRoute,
      method: RequestMethod.Delete,
    });
  }

  /**
   * Runs a post request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async post<R = void>(
    fullRoute: RouteLike,
    options: RequestData = {},
    schema?: ZodType,
  ) {
    return (await this.request<R>(
      { ...options, fullRoute, method: RequestMethod.Post },
      schema,
    )) as R;
  }

  /**
   * Runs a put request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async put(fullRoute: RouteLike, options: RequestData = {}) {
    return this.request({ ...options, fullRoute, method: RequestMethod.Put });
  }

  /**
   * Runs a patch request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async patch(fullRoute: RouteLike, options: RequestData = {}) {
    return this.request({ ...options, fullRoute, method: RequestMethod.Patch });
  }

  private async parseResponse<R = void>(res: Response, schema?: ZodType) {
    if (!res.body) return;
    const data = (await res.json()) as unknown;
  
    if (!schema) return data as R;
    return schema.parse(data) as R;
  }
}
