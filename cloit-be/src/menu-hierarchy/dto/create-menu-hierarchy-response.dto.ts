export class CreateMenuHierarchyResponseDto {
  id: string;
  name: string;
  parentId: string;
  superParentId: string;
  depth: number;
  createdAt: Date;
  updatedAt: Date;
}
