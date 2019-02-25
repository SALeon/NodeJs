export const DEFAULT = {
    port: 8082,
    key: 'mysupersecretkey',
    tokenLive: '100',
    authFacebook: {
        clientID: '340661236562646',
        clientSecret: 'ea4df71ede7819baea3de62509468e03',
        callbackURL: 'http://localhost:8082/auth/facebook/callback'
    },
    authGoogle: {
        clientID: '1050082809444-0g2g21cnkheo7753tr2f5h96e294c1q5.apps.googleusercontent.com',
        clientSecret: 'pNTCgFkN8bIYx2LB90vKmsQ5',
        callbackURL: 'http://localhost:8082/auth/google/callback'
    },
    authTwitter: {
        clientID: 'E4MtXUg1DYDNPoMgjl3myKrXp',
        clientSecret: 'fqdVcYWeFTV3MWhLnECrbWFgO5YHts63L4dMJaROsUUrBZaQd2',
        callbackURL: 'http://localhost:8082/auth/twitter/callback'
    },
};
