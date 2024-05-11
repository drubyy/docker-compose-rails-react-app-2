export interface IResourceRes {
  id: number;
  attributes: IResource;
}

export interface IResource {
  resource_id: string;
  user_id: number;
}

export interface IOriginalResourceRes {
  id: string;
  attributes: IOriginalResourceAttribute;
  relationships: IOriginalResourceRelationship;
  type: string;
}

export interface IOriginalResourceAttribute {
  id: number;
  resource_id: string;
}

export interface IOriginalResourceRelationship {
  user: IOriginalResourceRelationshipUser;
  type: string;
}

export interface IOriginalResourceRelationshipUser {
  data: {
    id: string;
    type: string;
  }
}
