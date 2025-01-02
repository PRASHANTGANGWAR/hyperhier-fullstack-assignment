import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateMenuDto,
  CreateMenuResponseDto,
  UpdateMenuDto,
} from './dto/index';
import { responseHandler } from '../utils/response';
import { PrismaService } from '../prisma/prisma.service';
import { BaseResponseDto } from 'src/utils/base-response.dto';
import { REESPONSE_MESSAGES } from '../utils/constant-messages';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(
    createMenuDto: CreateMenuDto,
  ): Promise<BaseResponseDto<CreateMenuResponseDto>> {
    try {
      const data = await this.prisma.menu.create({
        data: createMenuDto,
      });
      return await responseHandler(
        HttpStatus.CREATED,
        REESPONSE_MESSAGES.MENU_CREATED,
        data,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<BaseResponseDto<CreateMenuResponseDto[]>> {
    try {
      const data = await this.prisma.menu.findMany();
      if (!data.length) {
        throw new NotFoundException(REESPONSE_MESSAGES.MENU_DATA_NOT_FOUND);
      }
      return responseHandler(
        HttpStatus.FOUND,
        REESPONSE_MESSAGES.GET_MENU_DATA,
        data,
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<BaseResponseDto<CreateMenuResponseDto>> {
    try {
      const data = await this.prisma.menu.findUnique({
        where: {
          id,
        },
      });
      if (!data) {
        throw new NotFoundException(REESPONSE_MESSAGES.MENU_DATA_NOT_FOUND);
      }

      return responseHandler(
        HttpStatus.FOUND,
        REESPONSE_MESSAGES.GET_MENU_DATA,
        data,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateMenuDto: UpdateMenuDto,
  ): Promise<BaseResponseDto<CreateMenuResponseDto>> {
    try {
      const data = await this.prisma.menu.findUnique({
        where: {
          id,
        },
      });
      if (!data) {
        throw new NotFoundException(REESPONSE_MESSAGES.MENU_DATA_NOT_FOUND);
      }
      const updatedData = await this.prisma.menu.update({
        where: {
          id,
        },
        data: updateMenuDto,
      });

      return responseHandler(
        HttpStatus.OK,
        REESPONSE_MESSAGES.MENU_UPDATED,
        updatedData,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<BaseResponseDto<CreateMenuResponseDto>> {
    try {
      const data = await this.prisma.menu.findUnique({
        where: {
          id,
        },
      });
      if (!data) {
        throw new NotFoundException(REESPONSE_MESSAGES.MENU_DATA_NOT_FOUND);
      }

      const deletedData = await this.prisma.menu.delete({
        where: {
          id,
        },
      });
      return responseHandler(
        HttpStatus.OK,
        REESPONSE_MESSAGES.MENU_DELETED,
        deletedData,
      );
    } catch (error) {
      throw error;
    }
  }
}
