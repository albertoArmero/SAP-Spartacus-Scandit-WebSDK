import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScanditSdkModule } from "scandit-sdk-angular";

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ConfigModule, GlobalMessageConfig, GlobalMessageType, provideConfig } from '@spartacus/core';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule, defaultCmsContentConfig } from '@spartacus/storefront';
import { AddToCartService } from './add-to-cart.service';
import { HttpClientModule } from "@angular/common/http";

const licenseKey: string = "AaNAQg1/L16VN0WA7iMVWTsju2QaBoqi03yum8MZqAreH6Bl4yDus45939FIM/o3E3JJEvZuH3PKZTC60FeF3WN1hITiCtBnq1fRXxp7a65dZX52ZVzkEvl/m/s3fBAhcFCYloF8AWm/Mj//4RyRGhtHazlMB7wROprYz9bmTa8TT14kSo72PP3OZ1gBHo+RQbz02XS7/2UDguQBCFhMXxixJoMqbggHON8blMBatnBJZmZDQvroMn0Ow+LWfch/T2qQt1G3qKl5m85sVg2MA/vsDKGKZTO2M6vQCv//EubB5SXfLAoY7kIRnvGZWcim1GvRdol3yOsak+m3Em3wJtLgH/NTUmKsqRGF5rtr0/a1bbkMrH2cyoXbOQ4AcBvxjTk0PNDFNCNf9m3WWrKyjYoFb2p/rZsC0w1QT6M1vqPXF8662cJ4hMIV3FSByW1Hh/AchCrwKqQA+zsF5+9HqWIjP/5YLOLSzMbYUTyJGOGZiAl5dQDGxxBkUrPwfxo/WMcUsFHFciZXgsb9utSvLI4Uz4znOwsezfRl4DC5xT+zsK2Q8koKjwSEuNIuQgckTV6F2wNXm+cQ1ygqPf8oOdF+/o25hF7I8ULTUhsmYIhxAS9iIKZ1yTvqCx+i+CtQkBw/TlCSp+K7TbosrL1fyIekq0hu+5f187THw6wiMxee5o2EeJTxoVf6vJP6NSNDXaW0Z9ZFBPEEJ8Rhfu6bw1H/SjNfotcC8lv6VdsyjjCPo2Eh7fFKcmdO41KzMKNSzNgjzjGzoOhV0KuJiSA3LL0ItS7AMTuFCeZMJv4KA9kX8O65y/aYd2objipxRAUH4u1guOm9nA==";

const engineLocation: string = "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/";

function yourGlobalMessageConfigFactory(): GlobalMessageConfig {
  return {
    globalMessages: {
      [GlobalMessageType.MSG_TYPE_ERROR]: {
        timeout: 3000,
      },
    },
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [

    ScanditSdkModule.forRoot(licenseKey, { engineLocation }),
    MatIconModule,
    MatButtonModule,
    HttpClientModule, 
    ConfigModule.withConfigFactory(yourGlobalMessageConfigFactory), 

    BrowserModule,
    
    B2cStorefrontModule.withConfig({

    backend: {
      occ: {
        baseUrl: 'https://scandit-commerce2011cx.demo.hybris.com/',
        prefix: '/occ/v2/',
        legacy: false
      }
    },
    authentication: {
      client_id: 'mobile_android',
      client_secret: 'secret'
    },
    context: {
      baseSite: ['electronics-spa']
    },
    i18n: {
      backend: {
        loadPath: 'assets/i18n-assets/en/{{ns}}.json'
      },
      chunks: translationChunksConfig
    }
    })
  ],
  providers: [AddToCartService],
  bootstrap: [AppComponent]
})
export class AppModule {}