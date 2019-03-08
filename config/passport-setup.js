import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import TwitterStrategy from 'passport-twitter';
import UserController, { EVENTS } from '../controllers/userController';
import { DEFAULT } from './defaultSetting';


export const passportSetup = (passport) => {
    passport.use(
        new LocalStrategy.Strategy({
                usernameField: 'email',
                passwordField: 'password',
                session: false,
            },
            (email, password, done) => {
                const userController = new UserController();
                userController.extractUser({
                    email,
                    password
                });
                userController.on(EVENTS.extractUser, user => {
                    done(null, user);
                });

                userController.on('error', err => {
                    done(null, false, {
                        message: 'user not found'
                    });
                });
            }
        ));

    passport.use(
        new FacebookStrategy.Strategy({
                clientID: DEFAULT.authFacebook.clientID,
                clientSecret: DEFAULT.authFacebook.clientSecret,
                callbackURL: DEFAULT.authFacebook.callbackURL,
                profileFields: ['id', 'displayName', 'email']
            },
            (accessToken, refreshToken, profile, done) => {
                handleAuth('facebookToken', profile, done, accessToken);
            }
        )
    );

    passport.use(
        new GoogleStrategy({
                clientID: DEFAULT.authGoogle.clientID,
                clientSecret: DEFAULT.authGoogle.clientSecret,
                callbackURL: DEFAULT.authGoogle.callbackURL
            },
            (accessToken, refreshToken, profile, done) => {
                handleAuth('googleToken', profile, done, accessToken);
            }
        )
    );

    passport.use(
        new TwitterStrategy.Strategy({
                    consumerKey: DEFAULT.authTwitter.clientID,
                    consumerSecret: DEFAULT.authTwitter.clientSecret,
                    callbackURL: DEFAULT.authTwitter.callbackURL,
                    includeEmail: true,
                },
            (accessToken, tokenSecret, profile, done) => {
                handleAuth('twitterToken', profile, done, accessToken);
            }
        )
    );
}

const handleAuth = (tokenName, profile, done, accessToken) => {
    const userController = new UserController();
    const {
        id,
        displayName,
        emails
    } = profile;
    userController.on(EVENTS.extractUser, user => {
        done(null, user);
    });
    userController.on('error', err => {
        if (err.status === 404) {
            userController.setUser({
                id,
                [tokenName]: accessToken,
                name: displayName,
                email: emails[0].value,
                password: 'some password'
            });
        } else {
            console.error(err);
            done(null, false)
        }
    });
    userController.on(EVENTS.setUser, user => {
        done(null, user);
    });
    userController.extractUser({
        id
    });
};
