import { Module } from '@nestjs/common';

import { MenuHierarchyService } from './menu-hierarchy.service';
import { MenuHierarchyController } from './menu-hierarchy.controller';

@Module({
  controllers: [MenuHierarchyController],
  providers: [MenuHierarchyService],
})
export class MenuHierarchyModule {}
