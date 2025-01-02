import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMenuHierarchyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
