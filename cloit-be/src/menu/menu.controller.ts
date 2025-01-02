import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import {
  CreateMenuDto,
  CreateMenuResponseDto,
  UpdateMenuDto,
} from './dto/index';
import { MenuService } from './menu.service';
import { BaseResponseDto } from 'src/utils/base-response.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(
    @Body() createMenuDto: CreateMenuDto,
  ): Promise<BaseResponseDto<CreateMenuResponseDto>> {
    return await this.menuService.create(createMenuDto);
  }

  @Get()
  async findAll(): Promise<BaseResponseDto<CreateMenuResponseDto[]>> {
    return await this.menuService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<BaseResponseDto<CreateMenuResponseDto>> {
    return await this.menuService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<BaseResponseDto<CreateMenuResponseDto>> {
    return await this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ): Promise<BaseResponseDto<CreateMenuResponseDto>> {
    return this.menuService.remove(id);
  }
}
