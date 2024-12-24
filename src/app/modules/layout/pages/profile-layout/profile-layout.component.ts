import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/modules/profile-settings/services/profile.service';
import { locale as arabic } from '../../i18n/ar';
import { locale as english } from '../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { CookieService } from 'ngx-cookie';
import { ApiResponse, CartProduct, User } from 'src/app/core/models';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {

  selectedLink = 'info';
  profileData: User;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private coreTranslationService: CoreTranslationService,
    private cookieService: CookieService,
    private cartService:CartService,
    private authenticationService:AuthenticationService,
    private routingService: RoutingService
  ) {
    this.coreTranslationService.translate(english, arabic);
  }
  ngOnInit(): void {
    this.selectedLink = this.router.url.replace('/profile/', '');
    this.getProfileInfo();
  }

  getProfileInfo(): void {
    this.profileService.getUserByToken().subscribe((res: ApiResponse) => {
      this.profileData = res.data;
    })
  }

  openProfileLink(link: string): void {
    this.selectedLink = link;
    // this.router.navigate(['/profile/' + link]);
    this.router.navigateByUrl(this.routingService.navigate('profile/' + link))
  }

  onLogout(): void {
    this.authenticationService.logout();
  }

}
