import { Static, t, TSchema } from 'elysia'

// export const Response = t.Object({
//     success: t.Optional(t.Boolean()),
//     message: t.String(),
//     data: t.Any(),
// })

// export const ResponseError = t.Object({
//     success: t.Optional(t.Boolean()),
//     message: t.String(),
//     error: t.String(),
// })

// export const ResponsePagination = t.Object({
//     success: t.Optional(t.Boolean()),
//     message: t.String(),
//     data: t.Any(),
//     pagination: t.Object({
//         total: t.Number(),
//         offset: t.Number(),
//         limit: t.Number(),
//     }),
// })

// export type TResponse = Static<typeof Response>
// export type TResponseError = Static<typeof ResponseError>
// export type TResponsePagination = Static<typeof ResponsePagination>

const response = <T extends TSchema>(data: T) => {
    return t.Object({
        success: t.Boolean(),
        message: t.String(),
        data: t.Optional(data),
    })
}

const responseNoData = () => {
    return t.Object({
        success: t.Boolean(),
        message: t.String(),
    })
}

const responseError = <T extends TSchema>(message: T) => {
    return t.Object({
        success: t.Boolean(),
        message: message,
    })
}

const responsePagination = <T extends TSchema>(data: T, pagination: T) => {
    return t.Object({
        success: t.Boolean(),
        message: t.String(),
        data: data,
        pagination: pagination,
    })
}

export const ResponseNoData = responseNoData()
export type TResponseNoData = Static<typeof ResponseNoData>

export { response, responseError, responsePagination }