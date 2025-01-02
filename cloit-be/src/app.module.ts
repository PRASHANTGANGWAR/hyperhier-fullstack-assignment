import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { MenuHierarchyModule } from './menu-hierarchy/menu-hierarchy.module';

@Module({
  imports: [PrismaModule, MenuModule, MenuHierarchyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
