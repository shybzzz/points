import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Type } from '@angular/core';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(<Type<any>>AppModule);
