/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'
import { Post } from '../blog/post'
import { Comment } from '../blog/comment'

export const protobufPackage = 'cosmonaut.blog.blog'

export interface QueryPostsRequest {
  pagination: PageRequest | undefined
}

export interface QueryPostsResponse {
  Post: Post[]
  pagination: PageResponse | undefined
}

export interface QueryCommentsRequest {
  id: number
  pagination: PageRequest | undefined
}

export interface QueryCommentsResponse {
  Post: Post | undefined
  Comment: Comment[]
  pagination: PageResponse | undefined
}

const baseQueryPostsRequest: object = {}

export const QueryPostsRequest = {
  encode(message: QueryPostsRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPostsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryPostsRequest } as QueryPostsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostsRequest {
    const message = { ...baseQueryPostsRequest } as QueryPostsRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostsRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryPostsRequest>): QueryPostsRequest {
    const message = { ...baseQueryPostsRequest } as QueryPostsRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryPostsResponse: object = {}

export const QueryPostsResponse = {
  encode(message: QueryPostsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.Post) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPostsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryPostsResponse } as QueryPostsResponse
    message.Post = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.Post.push(Post.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostsResponse {
    const message = { ...baseQueryPostsResponse } as QueryPostsResponse
    message.Post = []
    if (object.Post !== undefined && object.Post !== null) {
      for (const e of object.Post) {
        message.Post.push(Post.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostsResponse): unknown {
    const obj: any = {}
    if (message.Post) {
      obj.Post = message.Post.map((e) => (e ? Post.toJSON(e) : undefined))
    } else {
      obj.Post = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryPostsResponse>): QueryPostsResponse {
    const message = { ...baseQueryPostsResponse } as QueryPostsResponse
    message.Post = []
    if (object.Post !== undefined && object.Post !== null) {
      for (const e of object.Post) {
        message.Post.push(Post.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryCommentsRequest: object = { id: 0 }

export const QueryCommentsRequest = {
  encode(message: QueryCommentsRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryCommentsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryCommentsRequest } as QueryCommentsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long)
          break
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryCommentsRequest {
    const message = { ...baseQueryCommentsRequest } as QueryCommentsRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id)
    } else {
      message.id = 0
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryCommentsRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryCommentsRequest>): QueryCommentsRequest {
    const message = { ...baseQueryCommentsRequest } as QueryCommentsRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = 0
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryCommentsResponse: object = {}

export const QueryCommentsResponse = {
  encode(message: QueryCommentsResponse, writer: Writer = Writer.create()): Writer {
    if (message.Post !== undefined) {
      Post.encode(message.Post, writer.uint32(10).fork()).ldelim()
    }
    for (const v of message.Comment) {
      Comment.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryCommentsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryCommentsResponse } as QueryCommentsResponse
    message.Comment = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.Post = Post.decode(reader, reader.uint32())
          break
        case 2:
          message.Comment.push(Comment.decode(reader, reader.uint32()))
          break
        case 3:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryCommentsResponse {
    const message = { ...baseQueryCommentsResponse } as QueryCommentsResponse
    message.Comment = []
    if (object.Post !== undefined && object.Post !== null) {
      message.Post = Post.fromJSON(object.Post)
    } else {
      message.Post = undefined
    }
    if (object.Comment !== undefined && object.Comment !== null) {
      for (const e of object.Comment) {
        message.Comment.push(Comment.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryCommentsResponse): unknown {
    const obj: any = {}
    message.Post !== undefined && (obj.Post = message.Post ? Post.toJSON(message.Post) : undefined)
    if (message.Comment) {
      obj.Comment = message.Comment.map((e) => (e ? Comment.toJSON(e) : undefined))
    } else {
      obj.Comment = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryCommentsResponse>): QueryCommentsResponse {
    const message = { ...baseQueryCommentsResponse } as QueryCommentsResponse
    message.Comment = []
    if (object.Post !== undefined && object.Post !== null) {
      message.Post = Post.fromPartial(object.Post)
    } else {
      message.Post = undefined
    }
    if (object.Comment !== undefined && object.Comment !== null) {
      for (const e of object.Comment) {
        message.Comment.push(Comment.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of posts items. */
  Posts(request: QueryPostsRequest): Promise<QueryPostsResponse>
  /** Queries a list of comments items. */
  Comments(request: QueryCommentsRequest): Promise<QueryCommentsResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  Posts(request: QueryPostsRequest): Promise<QueryPostsResponse> {
    const data = QueryPostsRequest.encode(request).finish()
    const promise = this.rpc.request('cosmonaut.blog.blog.Query', 'Posts', data)
    return promise.then((data) => QueryPostsResponse.decode(new Reader(data)))
  }

  Comments(request: QueryCommentsRequest): Promise<QueryCommentsResponse> {
    const data = QueryCommentsRequest.encode(request).finish()
    const promise = this.rpc.request('cosmonaut.blog.blog.Query', 'Comments', data)
    return promise.then((data) => QueryCommentsResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
