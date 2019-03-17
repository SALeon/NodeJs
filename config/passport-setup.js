import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import TwitterStrategy from 'passport-twitter';
import userController from '../controllers/userController';
import { DEFAULT } from './defaultSetting';


export const passportSetup = (passport) => {
    passport.use(
        new LocalStrategy.Strategy({
                usernameField: 'email',
                passwordField: 'password',
                session: false,
            },
            async (email, password, done) => {
                try {
                    const user = await userController.extractUser({
                        email,
                        password
                    });
                    done(null, user);
                } catch (err) {
                    done(null, false, {
                        message: err.message
                    })
                }
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

const handleAuth = async (tokenName, profile, done, accessToken) => {
    const {
        id,
        displayName,
        emails
    } = profile;
    try {
        const user = await userController.extractUser({
            email: emails[0].value
        });
        done(null, user);
    } catch (err) {
        if (err.status === 404) {
            const user = {
                id,
                name: displayName,
                email: emails[0].value,
                password: 'some password',
                facebookToken: '',
                googleToken: '',
                twitterToken: '',
            }
            const newUser = userController.setUser({
                ...user,
                [tokenName]: accessToken,
            });
            done(null, newUser);
        } else {
            console.error(err);
            done(null, false)
        }
    }
};
