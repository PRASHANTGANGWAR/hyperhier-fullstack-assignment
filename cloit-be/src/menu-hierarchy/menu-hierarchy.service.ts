import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateMenuHierarchyDto,
  UpdateMenuHierarchyDto,
  CreateMenuHierarchyResponseDto,
} from './dto/index';
import { responseHandler } from 'src/utils/response';
import { PrismaService } from '../prisma/prisma.service';
import { BaseResponseDto } from 'src/utils/base-response.dto';
import { REESPONSE_MESSAGES } from '../utils/constant-messages';

@Injectable()
export class MenuHierarchyService {
  constructor(private prisma: PrismaService) {}

  async create(
    createMenuHierarchyDto: CreateMenuHierarchyDto,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto>> {
    try {
      const checkMenuData = await this.prisma.menu.findFirst({
        where: {
          id: createMenuHierarchyDto.superParentId,
        },
      });

      if (!checkMenuData) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: REESPONSE_MESSAGES.MENU_DATA_NOT_FOUND,
        });
      }
      const checkParentData = await this.prisma.menuHierarchy.findFirst({
        where: {
          id: createMenuHierarchyDto.parentId,
        },
      });

      let depth = 1;
      if (checkParentData && checkParentData?.depth) {
        depth = checkParentData.depth + 1;
      } else {
        const checkParentData = await this.prisma.menuHierarchy.findFirst({
          where: {
            parentId: createMenuHierarchyDto.parentId,
          },
        });
        if (checkParentData && checkParentData.depth) {
          depth = checkParentData.depth + 1;
        }
      }
      const data = await this.prisma.menuHierarchy.create({
        data: {
          ...createMenuHierarchyDto,
          depth,
        },
      });

      return responseHandler(
        HttpStatus.CREATED,
        REESPONSE_MESSAGES.MENU_HIERARCHY_CREATED,
        data,
      );
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw error;
    }
  }

  async find(
    menuId: string,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto[]>> {
    try {
      const data = await this.prisma.menuHierarchy.findMany({
        where: {
          superParentId: menuId,
        },
      });

      if (!data || !data.length) {
        throw new NotFoundException(
          REESPONSE_MESSAGES.MENU_HIERARCHY_NOT_FOUND,
        );
      }

      return responseHandler(
        HttpStatus.FOUND,
        REESPONSE_MESSAGES.GET_MENU_HIERARCHY_DATA,
        data,
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    id: string,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto>> {
    try {
      const data = await this.prisma.menuHierarchy.findUnique({
        where: {
          id,
        },
      });

      if (!data) {
        throw new NotFoundException(
          REESPONSE_MESSAGES.MENU_HIERARCHY_NOT_FOUND,
        );
      }

      return responseHandler(
        HttpStatus.FOUND,
        REESPONSE_MESSAGES.GET_MENU_HIERARCHY_DATA,
        data,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateMenuHierarchyDto: UpdateMenuHierarchyDto,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto>> {
    try {
      const existingMenuHierarchy = await this.prisma.menuHierarchy.findUnique({
        where: { id },
      });

      if (!existingMenuHierarchy) {
        throw new NotFoundException(
          REESPONSE_MESSAGES.MENU_HIERARCHY_NOT_FOUND,
        );
      }

      const updatedMenuHierarchy = await this.prisma.menuHierarchy.update({
        where: { id },
        data: updateMenuHierarchyDto,
      });

      return responseHandler(
        HttpStatus.OK,
        REESPONSE_MESSAGES.MENU_HIERARCHY_UPDATED,
        updatedMenuHierarchy,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(
    id: string,
  ): Promise<BaseResponseDto<CreateMenuHierarchyResponseDto[]>> {
    try {
      const existingMenuHierarchy = await this.prisma.menuHierarchy.findMany({
        where: { parentId : id },
      });

      if (!existingMenuHierarchy.length) {
        throw new NotFoundException(
          REESPONSE_MESSAGES.MENU_HIERARCHY_NOT_FOUND,
        );
      }
      const idArr: string[] = [];
      for(let i=0; i< existingMenuHierarchy.length;i++){
        idArr.push(existingMenuHierarchy[i].parentId)
      }

      await this.prisma.menuHierarchy.delete({
        where: { id },
      });

      const deletedRecords = await this.prisma.menuHierarchy.deleteMany({
        where: {
          parentId: {
            in: idArr, 
          },
        },
      });
      

      return responseHandler(
        HttpStatus.OK,
        REESPONSE_MESSAGES.MENU_HIERARCHY_DELETED,
        deletedRecords,
      );
    } catch (error) {
      throw error;
    }
  }
}
