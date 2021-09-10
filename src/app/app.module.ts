import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScanditSdkModule } from "scandit-sdk-angular";

import { ConfigModule } from '@spartacus/core';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule, defaultCmsContentConfig } from '@spartacus/storefront';

const licenseKey: string = "AUNALjW+FQHEHVRCBQmu9TcSJy06M2r5H2viwOdxDK/gd94WeA3Vf3BiEUf0YDvWdV8ROlZW7A3wLwgWxX9XHMJmRreMaJvdDBzjVfte/vSIUjJFY1daLwpzXz+WSHx6y3wcDDR7Zat2Qvul/1VW9a4Qyu5gRuVERE1c+bx3jyGYaSv0CnTJ9lRDJs0WWoQBXEs7VQxwg+uDckLoLErw83BpDWYiaeZQLW0a0yhquupxV/3bHElImYd6l5jnLBIdzSzTL6R0QaY9fIEZLjLsIFl8vmy7e4S4LU0SOJRZ85z7e+FO+Cil9bZxOAI9TZ1jCHLaimlte9XTJa96wFCt385UKKH/XWS/mVlB7CtoPB1VQ+VBDHEioYVgBM3vHuQeIVA7aANzjy1pTgQ+zVDZcHR581r4ZYFMBXBT6fZY1cyoSH2ZJ02dOppb/kx+dKOt6l8shQJZeVjpEBB39HdisVNp7xpmcQsTZm3CbgJLGFQyZj/WZ28zo2N6g3oPVXpVjwY/Shcix49kFJVsfSe9jecGaPVlGfTRX0rSh5GYzMQA9PBJpOmExY983+sIUzlpifN44OZc+lD0dbFWH1FfKIDi7sQUnC4Lulbj/RHPyg8E5qOwwQ07mr4qwy2vXsIVV2iB2S0iRNDb3U0Q9sOc4Gx2bkv4qA7VFs8mvJI8OPnS8DrwImwW0ic8Dl3+ml8H2Hm49C8N9xqcb1wE7eu25qM2iA9LDFdjyOslKvegvF4iTu17NX3PqCmhphKlFOAyJhuBOYI7b6ZnU4OExb7qRBIjoeUo367TZSWCTN3pvwqZUuwF7HtQWVSEInEHlmAvZpnNVQoFTD8aSHovN12kBeh5ZpEYfbGqHqZcq0RuFo5nIVIN0iVW1tJfmyS8XSK0WtnOCzbYtZu1hp7OUrMYJXTt6yTDdEJDPI804Awt3KvGpLkO50X0G/AWsvCwakUsOyz9dFOsL3FdDWDI5qjO8kwxiWoTzLsCQ5gd6qmZdBfpmOIfY8luieES0rgvlDP7TK2LcBkKEED3TKM/Q426bqrp5NWOBeZPj8CdraIjb7Hx+mAzclEpWkW9RU8LjtMatPCKFNIgPtE5RBPyO2MQYYjXn4i8/uvvB0vkffIKw3ZV0FAfuXl2sKbMjLFBGkljhkGOibb3OWEjnWKyQ/NV81iBZc6BUCqQIKdi7RZc/wXSnKlyRT2M9fDTNhGhF34u";

const engineLocation: string = "https://cdn.jsdelivr.net/npm/scandit-sdk@5.5.0/build/";


@NgModule({
  declarations: [AppComponent],
  imports: [

    ScanditSdkModule.forRoot(licenseKey, { engineLocation }),

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
      resources: translations,
      chunks: translationChunksConfig,
      fallbackLang: 'en'
    }

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}