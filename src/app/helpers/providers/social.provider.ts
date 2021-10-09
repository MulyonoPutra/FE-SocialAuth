import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthServiceConfig } from "angularx-social-login";
import { environment } from "src/environments/environment";

export const SocialProvider = [
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.googleClientId),
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(environment.facebookClientId),
        },
      ],
    } as SocialAuthServiceConfig,
  },
];
