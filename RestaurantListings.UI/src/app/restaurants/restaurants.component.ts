import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../auth.config';

@Component({
  selector: 'app-restaurants',
  template: `<router-outlet></router-outlet>`
})
export class RestaurantsComponent implements OnInit {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit(): void {}
}
