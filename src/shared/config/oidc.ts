const oidcConfig = {
    authority: 'https://localhost:9443/oauth2/oidcdiscovery',
    client_id: '6H5Imi72MgvTsXMZ0bj_86K6uega',
    redirect_uri: 'http://localhost:5173/callback',
    post_logout_redirect_uri: 'http://localhost:5173/',
    response_type: 'code',
    scope: 'openid profile email groups',

    loadUserInfo: true,

    storeUser: false,

    automaticSilentRenew: true,

    silent_redirect_uri: 'http://localhost:5173/silent-renew.html',

    metadata: {
        issuer: 'https://localhost:9443/oauth2/oidcdiscovery',
        authorization_endpoint: 'https://localhost:9443/oauth2/authorize',
        token_endpoint: 'https://localhost:9443/oauth2/token',
        userinfo_endpoint: 'https://localhost:9443/oauth2/userinfo',
        jwks_uri: 'https://localhost:9443/oauth2/certs',
        instrospection_endpoint: 'https://localhost:9443/oauth2/introspect',
        revocation_endpoint: 'https://localhost:9443/oauth2/revoke'

    },

    fetchRequestCredentials: 'include'
    
}


export default oidcConfig