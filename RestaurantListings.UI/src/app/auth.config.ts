import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: window.location.origin,
  redirectUri: window.location.origin + '/',
  postLogoutRedirectUri: window.location.origin + '/',
  clientId: 'RestaurantListings',
  responseType: 'code',
  scope: 'openid profile RestaurantListingsAPI',
  timeoutFactor: 0.01,
};
