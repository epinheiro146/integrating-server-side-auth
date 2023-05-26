import * as passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as PassportJWT from 'passport-jwt';
import users from '../db/queries/users';
import { Application } from 'express';
import { compareHash } from '../utils/passwords';
import { Payload } from '../../types';
import { jwtCredentials } from '../config';

export function configurePassport(app: Application) {
    // passport.serializeUser((user, done) => done(null, user));
    // passport.deserializeUser((user: Express.User, done) => done(null, user));
    // ^ unnecessary if you add {{session: false}} to a few places: once here, and once in each GET, POST, PUT, or DELETE method you want to require auth in order to use. Use as an argument of passport.authenticate, which is itself an argument of your method.

    // Passport Local Strategy
    passport.use(new PassportLocal.Strategy({
        usernameField: 'email',
        session: false
    }, async (email, password, done) => {
        try {
            // check for the user's email
            const [userFound] = await users.find('email', email);
            if (userFound && compareHash(password, userFound.password!)) {
                delete userFound.password;
                done(null, userFound);
            } else {
                done(null, false, { message: 'Invalid Credentials' }); // Status 401 text of Unauthorized
            };
        } catch (error) {
            done(error);
        }
    }));

    // Passport JWT Strategy (truly stateless, no database lookup)
    passport.use(new PassportJWT.Strategy({
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtCredentials.secret
    }, (payload: Payload, done) => {
        try {
            done(null, payload);
        } catch (error) {
            done(error);
        }
    }));

    app.use(passport.initialize());
};