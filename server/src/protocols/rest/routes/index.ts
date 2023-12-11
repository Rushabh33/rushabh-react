import { Router } from 'express'
import { SessionsStore, UsersStore, ProductsStore } from '../../../stores'
import authenticateRequest from '../middlewares/authentication'
import isAuthenticated from '../middlewares/permissions'
import { asyncHandler } from './helpers'
import * as usecases from '../../../usecases'
import { BadInputError } from '../../../domains'

export interface Stores {
    sessions: SessionsStore
    users: UsersStore
    products: ProductsStore
}

export function Register(router: Router, stores: Stores) {
    router.get(
        '/products',
        authenticateRequest(stores),
        isAuthenticated(),
        asyncHandler(async (req, res) => {
            const products = await usecases.products.ListProducts(stores)()
            return res.json(products).end()
        })
    )
    router.get(
        '/users/:id',
        authenticateRequest(stores),
        isAuthenticated(),
        asyncHandler(async (req, res) => {
            const userID = parseInt(req.params.id, 10)
            if (isNaN(userID)) {
                throw new BadInputError('id must be parsable to an int.')
            }

            const user = await usecases.users.GetUser(stores, req.context.session!)(userID)
            return res.json({ id: user.id, email: user.email }).end()
        })
    )
    router.post(
        '/authenticate',
        asyncHandler(async (req, res) => {
            const { email, password } = req.body
            console.log('req.body: ', req.body);
            if (!email) {
                throw new BadInputError('email is missing from request body.')
            }
            if (!password) {
                throw new BadInputError('password is missing from request body.')
            }

            const session = await usecases.auth.AuthenticateUser(stores)(email, password)
            return res
                .json({
                    accessToken: session.accessToken,
                    refreshToken: session.refreshToken,
                    expiresAt: session.expiresAt,
                })
                .end()
        })
    )
    router.post(
        '/refresh',
        asyncHandler(async (req, res) => {
            const { accessToken, refreshToken } = req.body
            if (!accessToken) {
                throw new BadInputError('accessToken is missing from request body.')
            }
            if (!refreshToken) {
                throw new BadInputError('refreshToken is missing from request body.')
            }

            const session = await usecases.auth.RefreshSession(stores)(accessToken, refreshToken)
            return res
                .json({
                    accessToken: session.accessToken,
                    refreshToken: session.refreshToken,
                    expiresAt: session.expiresAt,
                })
                .end()
        })
    )
}

export default {
    Register,
}
