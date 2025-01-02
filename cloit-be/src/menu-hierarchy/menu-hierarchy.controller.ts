import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { BaseResponseDto } from 'src/utils/base-response.dto';
import { MenuHierarchyService } from './menu-hierarchy.service';
import { CreateMenuHierarchyDto, UpdateMenuHierarchyDto } from './dto/index';
import { CreateMenuHierarchyResponseDto } from './dto/create-menu-hierarchy-response.dto';

@Controller('menu-hierarchy')
export class MenuHierarchyController {
  constructor(private readonly menuHierarchyService: MenuHierarchyService) {}

  @Post()
  async create(
    @Body() createMenuHierarchyDto: CreateMenuHierarchyDto,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto>> {
    return await this.menuHierarchyService.create(createMenuHierarchyDto);
  }

  @Get('menu-id/:menuId')
  findAll(
    @Param('menuId') menuId: string,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto[]>> {
    return this.menuHierarchyService.find(menuId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto>> {
    return this.menuHierarchyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuHierarchyDto: UpdateMenuHierarchyDto,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto>> {
    return this.menuHierarchyService.update(id, updateMenuHierarchyDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto>> {
    return this.menuHierarchyService.remove(id);
  }
}
