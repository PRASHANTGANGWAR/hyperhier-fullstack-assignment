import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuHierarchyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  parentId: string;

  @IsString()
  @IsNotEmpty()
  superParentId: string;
}
