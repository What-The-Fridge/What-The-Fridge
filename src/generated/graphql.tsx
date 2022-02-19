import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
};

export type DetailedFridgeItem = {
  __typename?: 'DetailedFridgeItem';
  createdAt: Scalars['String'];
  expiryDate?: Maybe<Scalars['String']>;
  fridgeId: Scalars['Float'];
  fridgeItemInfoId: Scalars['Float'];
  id: Scalars['Float'];
  imgUrl?: Maybe<Scalars['String']>;
  measurement: Scalars['String'];
  measurementTypeId: Scalars['Float'];
  measurementUnit: Scalars['String'];
  name: Scalars['String'];
  purchasedDate?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  upc?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
};

export type DetailedGroceryItem = {
  __typename?: 'DetailedGroceryItem';
  createdAt: Scalars['String'];
  groceryListId: Scalars['Float'];
  id: Scalars['Float'];
  imgUrl?: Maybe<Scalars['String']>;
  measurementTypeId: Scalars['Float'];
  measurementUnit: Scalars['String'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  upc?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
};

export type DetailedGroceryItemResponse = {
  __typename?: 'DetailedGroceryItemResponse';
  detailedGroceryItem?: Maybe<DetailedGroceryItem>;
  errors?: Maybe<Array<FieldError>>;
};

export type DetailedGroceryItemsResponse = {
  __typename?: 'DetailedGroceryItemsResponse';
  errors?: Maybe<Array<FieldError>>;
  groceryItems?: Maybe<Array<DetailedGroceryItem>>;
};

export type FuResponse = {
  __typename?: 'FUResponse';
  errors?: Maybe<Array<FieldError>>;
  fu?: Maybe<FridgeUserTable>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Fridge = {
  __typename?: 'Fridge';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  ownerId: Scalars['Float'];
};

export type FridgeItemDetailedInfo = {
  __typename?: 'FridgeItemDetailedInfo';
  brandName?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  ingredients?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type FridgeItemInfoNutritionix = {
  __typename?: 'FridgeItemInfoNutritionix';
  errors?: Maybe<Array<FieldError>>;
  fridgeItemInfo?: Maybe<FridgeItemDetailedInfo>;
};

export type FridgeItemInput = {
  expiryDate?: Maybe<Scalars['DateTime']>;
  fridgeId: Scalars['Float'];
  imgUrl?: Maybe<Scalars['String']>;
  measurementTypeId: Scalars['Float'];
  name: Scalars['String'];
  purchasedDate?: Maybe<Scalars['DateTime']>;
  quantity: Scalars['Float'];
  upc?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
};

export type FridgeItemResponse = {
  __typename?: 'FridgeItemResponse';
  detailedFridgeItem?: Maybe<DetailedFridgeItem>;
  errors?: Maybe<Array<FieldError>>;
};

export type FridgeItemsResponse = {
  __typename?: 'FridgeItemsResponse';
  errors?: Maybe<Array<FieldError>>;
  fridgeItems?: Maybe<Array<DetailedFridgeItem>>;
};

export type FridgeResponse = {
  __typename?: 'FridgeResponse';
  errors?: Maybe<Array<FieldError>>;
  fridge?: Maybe<Fridge>;
};

export type FridgeUserTable = {
  __typename?: 'FridgeUserTable';
  fridgeId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type FridgesResponse = {
  __typename?: 'FridgesResponse';
  errors?: Maybe<Array<FieldError>>;
  fridges?: Maybe<Array<Fridge>>;
};

export type GroceryItem = {
  __typename?: 'GroceryItem';
  createdAt: Scalars['String'];
  groceryListId: Scalars['Float'];
  id: Scalars['Float'];
  imgUrl?: Maybe<Scalars['String']>;
  measurementTypeId: Scalars['Float'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  upc?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
};

export type GroceryItemInput = {
  groceryListId: Scalars['Float'];
  imgUrl?: Maybe<Scalars['String']>;
  measurementTypeId: Scalars['Float'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  upc?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
};

export type GroceryItemResponse = {
  __typename?: 'GroceryItemResponse';
  errors?: Maybe<Array<FieldError>>;
  groceryItem?: Maybe<GroceryItem>;
};

export type GroceryList = {
  __typename?: 'GroceryList';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  ownerId: Scalars['Float'];
};

export type GroceryListResponse = {
  __typename?: 'GroceryListResponse';
  errors?: Maybe<Array<FieldError>>;
  groceryList?: Maybe<GroceryList>;
};

export type GroceryListsResponse = {
  __typename?: 'GroceryListsResponse';
  errors?: Maybe<Array<FieldError>>;
  groceryLists?: Maybe<Array<GroceryList>>;
};

export type MeasurementType = {
  __typename?: 'MeasurementType';
  id: Scalars['Float'];
  measurement: Scalars['String'];
  measurementUnit: Scalars['String'];
};

export type MeasurementTypesResponse = {
  __typename?: 'MeasurementTypesResponse';
  errors?: Maybe<Array<FieldError>>;
  measurementTypes?: Maybe<Array<MeasurementType>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  clearFridgeItems: BooleanResponse;
  createFU: FuResponse;
  createFridge: FridgeResponse;
  createFridgeItem: FridgeItemResponse;
  createGroceryItem: GroceryItemResponse;
  createGroceryList: GroceryListResponse;
  createUser: UserResponse;
  deleteFU: BooleanResponse;
  deleteFridge: BooleanResponse;
  deleteFridgeItem: BooleanResponse;
  deleteGroceryItem: BooleanResponse;
  deleteGroceryList: BooleanResponse;
  deleteUser: BooleanResponse;
  moveGroceryItemToFridge: BooleanResponse;
  transferFridgeOwner: BooleanResponse;
  updateFridgeItem: BooleanResponse;
  updateGroceryItem: BooleanResponse;
};


export type MutationClearFridgeItemsArgs = {
  fridgeId: Scalars['Float'];
};


export type MutationCreateFuArgs = {
  fridgeId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationCreateFridgeArgs = {
  name: Scalars['String'];
  ownerId: Scalars['Float'];
};


export type MutationCreateFridgeItemArgs = {
  input: FridgeItemInput;
};


export type MutationCreateGroceryItemArgs = {
  input: GroceryItemInput;
};


export type MutationCreateGroceryListArgs = {
  name: Scalars['String'];
  ownerId: Scalars['Float'];
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteFuArgs = {
  fridgeId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationDeleteFridgeArgs = {
  fridgeId: Scalars['Float'];
};


export type MutationDeleteFridgeItemArgs = {
  itemId: Scalars['Float'];
};


export type MutationDeleteGroceryItemArgs = {
  groceryItemId: Scalars['Float'];
};


export type MutationDeleteGroceryListArgs = {
  groceryListId: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Float'];
};


export type MutationMoveGroceryItemToFridgeArgs = {
  groceryItemId: Scalars['Float'];
  input: FridgeItemInput;
};


export type MutationTransferFridgeOwnerArgs = {
  fridgeId: Scalars['Float'];
  newOwnerId: Scalars['Float'];
};


export type MutationUpdateFridgeItemArgs = {
  fridgeItemId: Scalars['Float'];
  input: FridgeItemInput;
};


export type MutationUpdateGroceryItemArgs = {
  groceryItemId: Scalars['Float'];
  input: GroceryItemInput;
};

export type Query = {
  __typename?: 'Query';
  getAllMeasurementTypes: MeasurementTypesResponse;
  getFridgeFridgeItems: FridgeItemsResponse;
  getFridgeItemById: FridgeItemResponse;
  getFridgeUsers: UsersResponse;
  getGroceryItemById: DetailedGroceryItemResponse;
  getGroceryListGroceryItems: DetailedGroceryItemsResponse;
  getItemInfoNutritionix: FridgeItemInfoNutritionix;
  getUserFridges: FridgesResponse;
  getUserGroceryLists: GroceryListsResponse;
  getUserInfo: UserResponse;
};


export type QueryGetFridgeFridgeItemsArgs = {
  fridgeId: Scalars['Float'];
};


export type QueryGetFridgeItemByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetFridgeUsersArgs = {
  fridgeId: Scalars['Float'];
};


export type QueryGetGroceryItemByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetGroceryListGroceryItemsArgs = {
  groceryListId: Scalars['Float'];
};


export type QueryGetItemInfoNutritionixArgs = {
  upc: Scalars['String'];
};


export type QueryGetUserFridgesArgs = {
  userId: Scalars['Float'];
};


export type QueryGetUserGroceryListsArgs = {
  userId: Scalars['Float'];
};


export type QueryGetUserInfoArgs = {
  firebaseUserUID: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firebaseUserUID: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  imgUrl?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  tier: Scalars['Float'];
};

export type UserInput = {
  email: Scalars['String'];
  firebaseUserUID: Scalars['String'];
  firstName: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  errors?: Maybe<Array<FieldError>>;
  users?: Maybe<Array<User>>;
};

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, firebaseUserUID: string, firstName: string, tier: number, lastName: string, email: string, createdAt: string, imgUrl?: string | null | undefined } | null | undefined } };

export type CreateFridgeMutationVariables = Exact<{
  ownerId: Scalars['Float'];
  name: Scalars['String'];
}>;


export type CreateFridgeMutation = { __typename?: 'Mutation', createFridge: { __typename?: 'FridgeResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, fridge?: { __typename?: 'Fridge', id: number, ownerId: number, name: string, createdAt: string } | null | undefined } };

export type CreateFridgeItemMutationVariables = Exact<{
  input: FridgeItemInput;
}>;


export type CreateFridgeItemMutation = { __typename?: 'Mutation', createFridgeItem: { __typename?: 'FridgeItemResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, detailedFridgeItem?: { __typename?: 'DetailedFridgeItem', id: number, fridgeItemInfoId: number, fridgeId: number, quantity: number, purchasedDate?: string | null | undefined, expiryDate?: string | null | undefined, name: string, createdAt: string, upc?: string | null | undefined, userId: number, imgUrl?: string | null | undefined, measurementTypeId: number, measurement: string, measurementUnit: string } | null | undefined } };

export type CreateGroceryItemMutationVariables = Exact<{
  input: GroceryItemInput;
}>;


export type CreateGroceryItemMutation = { __typename?: 'Mutation', createGroceryItem: { __typename?: 'GroceryItemResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, groceryItem?: { __typename?: 'GroceryItem', id: number, groceryListId: number, quantity: number, name: string, imgUrl?: string | null | undefined, upc?: string | null | undefined, userId: number, measurementTypeId: number, createdAt: string } | null | undefined } };

export type CreateGroceryListMutationVariables = Exact<{
  ownerId: Scalars['Float'];
  name: Scalars['String'];
}>;


export type CreateGroceryListMutation = { __typename?: 'Mutation', createGroceryList: { __typename?: 'GroceryListResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, groceryList?: { __typename?: 'GroceryList', id: number, name: string, createdAt: string, ownerId: number } | null | undefined } };

export type DeleteFridgeMutationVariables = Exact<{
  fridgeId: Scalars['Float'];
}>;


export type DeleteFridgeMutation = { __typename?: 'Mutation', deleteFridge: { __typename?: 'BooleanResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type DeleteFridgeItemMutationVariables = Exact<{
  itemId: Scalars['Float'];
}>;


export type DeleteFridgeItemMutation = { __typename?: 'Mutation', deleteFridgeItem: { __typename?: 'BooleanResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type DeleteGroceryItemMutationVariables = Exact<{
  groceryItemId: Scalars['Float'];
}>;


export type DeleteGroceryItemMutation = { __typename?: 'Mutation', deleteGroceryItem: { __typename?: 'BooleanResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type DeleteGroceryListMutationVariables = Exact<{
  groceryListId: Scalars['Float'];
}>;


export type DeleteGroceryListMutation = { __typename?: 'Mutation', deleteGroceryList: { __typename?: 'BooleanResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type MoveGroceryItemToFridgeMutationVariables = Exact<{
  groceryItemId: Scalars['Float'];
  input: FridgeItemInput;
}>;


export type MoveGroceryItemToFridgeMutation = { __typename?: 'Mutation', moveGroceryItemToFridge: { __typename?: 'BooleanResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type UpdateFridgeItemMutationVariables = Exact<{
  fridgeItemId: Scalars['Float'];
  input: FridgeItemInput;
}>;


export type UpdateFridgeItemMutation = { __typename?: 'Mutation', updateFridgeItem: { __typename?: 'BooleanResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type UpdateGroceryItemMutationVariables = Exact<{
  groceryItemId: Scalars['Float'];
  input: GroceryItemInput;
}>;


export type UpdateGroceryItemMutation = { __typename?: 'Mutation', updateGroceryItem: { __typename?: 'BooleanResponse', success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type GetAllMeasurementTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMeasurementTypesQuery = { __typename?: 'Query', getAllMeasurementTypes: { __typename?: 'MeasurementTypesResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, measurementTypes?: Array<{ __typename?: 'MeasurementType', id: number, measurement: string, measurementUnit: string }> | null | undefined } };

export type GetFridgeFridgeItemsQueryVariables = Exact<{
  fridgeId: Scalars['Float'];
}>;


export type GetFridgeFridgeItemsQuery = { __typename?: 'Query', getFridgeFridgeItems: { __typename?: 'FridgeItemsResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, fridgeItems?: Array<{ __typename?: 'DetailedFridgeItem', id: number, fridgeItemInfoId: number, fridgeId: number, quantity: number, purchasedDate?: string | null | undefined, expiryDate?: string | null | undefined, createdAt: string, name: string, upc?: string | null | undefined, imgUrl?: string | null | undefined, userId: number, measurementTypeId: number, measurement: string, measurementUnit: string }> | null | undefined } };

export type GetFridgeItemByIdQueryVariables = Exact<{
  getFridgeItemByIdId: Scalars['Float'];
}>;


export type GetFridgeItemByIdQuery = { __typename?: 'Query', getFridgeItemById: { __typename?: 'FridgeItemResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, detailedFridgeItem?: { __typename?: 'DetailedFridgeItem', id: number, fridgeItemInfoId: number, fridgeId: number, quantity: number, purchasedDate?: string | null | undefined, expiryDate?: string | null | undefined, createdAt: string, name: string, upc?: string | null | undefined, imgUrl?: string | null | undefined, userId: number, measurementTypeId: number, measurementUnit: string, measurement: string } | null | undefined } };

export type GetGroceryItemByIdQueryVariables = Exact<{
  getGroceryItemByIdId: Scalars['Float'];
}>;


export type GetGroceryItemByIdQuery = { __typename?: 'Query', getGroceryItemById: { __typename?: 'DetailedGroceryItemResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, detailedGroceryItem?: { __typename?: 'DetailedGroceryItem', id: number, groceryListId: number, quantity: number, upc?: string | null | undefined, name: string, imgUrl?: string | null | undefined, measurementTypeId: number, createdAt: string, userId: number, measurementUnit: string } | null | undefined } };

export type GetGroceryListGroceryItemsQueryVariables = Exact<{
  groceryListId: Scalars['Float'];
}>;


export type GetGroceryListGroceryItemsQuery = { __typename?: 'Query', getGroceryListGroceryItems: { __typename?: 'DetailedGroceryItemsResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, groceryItems?: Array<{ __typename?: 'DetailedGroceryItem', id: number, groceryListId: number, quantity: number, userId: number, name: string, upc?: string | null | undefined, imgUrl?: string | null | undefined, createdAt: string, measurementTypeId: number, measurementUnit: string }> | null | undefined } };

export type GetUserFridgesQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetUserFridgesQuery = { __typename?: 'Query', getUserFridges: { __typename?: 'FridgesResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, fridges?: Array<{ __typename?: 'Fridge', id: number, name: string, ownerId: number, createdAt: string }> | null | undefined } };

export type GetUserGroceryListsQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetUserGroceryListsQuery = { __typename?: 'Query', getUserGroceryLists: { __typename?: 'GroceryListsResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, groceryLists?: Array<{ __typename?: 'GroceryList', createdAt: string, ownerId: number, name: string, id: number }> | null | undefined } };

export type GetUserInfoQueryVariables = Exact<{
  firebaseUserUid: Scalars['String'];
}>;


export type GetUserInfoQuery = { __typename?: 'Query', getUserInfo: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, firebaseUserUID: string, firstName: string, lastName: string, tier: number, email: string, imgUrl?: string | null | undefined, createdAt: string } | null | undefined } };


export const CreateUserDocument = gql`
    mutation CreateUser($input: UserInput!) {
  createUser(input: $input) {
    errors {
      field
      message
    }
    user {
      id
      firebaseUserUID
      firstName
      tier
      lastName
      email
      createdAt
      imgUrl
    }
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const CreateFridgeDocument = gql`
    mutation CreateFridge($ownerId: Float!, $name: String!) {
  createFridge(ownerId: $ownerId, name: $name) {
    errors {
      field
      message
    }
    fridge {
      id
      ownerId
      name
      createdAt
    }
  }
}
    `;

export function useCreateFridgeMutation() {
  return Urql.useMutation<CreateFridgeMutation, CreateFridgeMutationVariables>(CreateFridgeDocument);
};
export const CreateFridgeItemDocument = gql`
    mutation CreateFridgeItem($input: FridgeItemInput!) {
  createFridgeItem(input: $input) {
    errors {
      field
      message
    }
    detailedFridgeItem {
      id
      fridgeItemInfoId
      fridgeId
      quantity
      purchasedDate
      expiryDate
      name
      createdAt
      upc
      userId
      imgUrl
      measurementTypeId
      measurement
      measurementUnit
    }
  }
}
    `;

export function useCreateFridgeItemMutation() {
  return Urql.useMutation<CreateFridgeItemMutation, CreateFridgeItemMutationVariables>(CreateFridgeItemDocument);
};
export const CreateGroceryItemDocument = gql`
    mutation CreateGroceryItem($input: GroceryItemInput!) {
  createGroceryItem(input: $input) {
    errors {
      field
      message
    }
    groceryItem {
      id
      groceryListId
      quantity
      name
      imgUrl
      upc
      userId
      measurementTypeId
      createdAt
    }
  }
}
    `;

export function useCreateGroceryItemMutation() {
  return Urql.useMutation<CreateGroceryItemMutation, CreateGroceryItemMutationVariables>(CreateGroceryItemDocument);
};
export const CreateGroceryListDocument = gql`
    mutation CreateGroceryList($ownerId: Float!, $name: String!) {
  createGroceryList(ownerId: $ownerId, name: $name) {
    errors {
      field
      message
    }
    groceryList {
      id
      name
      createdAt
      ownerId
    }
  }
}
    `;

export function useCreateGroceryListMutation() {
  return Urql.useMutation<CreateGroceryListMutation, CreateGroceryListMutationVariables>(CreateGroceryListDocument);
};
export const DeleteFridgeDocument = gql`
    mutation DeleteFridge($fridgeId: Float!) {
  deleteFridge(fridgeId: $fridgeId) {
    errors {
      field
      message
    }
    success
  }
}
    `;

export function useDeleteFridgeMutation() {
  return Urql.useMutation<DeleteFridgeMutation, DeleteFridgeMutationVariables>(DeleteFridgeDocument);
};
export const DeleteFridgeItemDocument = gql`
    mutation DeleteFridgeItem($itemId: Float!) {
  deleteFridgeItem(itemId: $itemId) {
    errors {
      field
      message
    }
    success
  }
}
    `;

export function useDeleteFridgeItemMutation() {
  return Urql.useMutation<DeleteFridgeItemMutation, DeleteFridgeItemMutationVariables>(DeleteFridgeItemDocument);
};
export const DeleteGroceryItemDocument = gql`
    mutation DeleteGroceryItem($groceryItemId: Float!) {
  deleteGroceryItem(groceryItemId: $groceryItemId) {
    errors {
      field
      message
    }
    success
  }
}
    `;

export function useDeleteGroceryItemMutation() {
  return Urql.useMutation<DeleteGroceryItemMutation, DeleteGroceryItemMutationVariables>(DeleteGroceryItemDocument);
};
export const DeleteGroceryListDocument = gql`
    mutation DeleteGroceryList($groceryListId: Float!) {
  deleteGroceryList(groceryListId: $groceryListId) {
    errors {
      field
      message
    }
    success
  }
}
    `;

export function useDeleteGroceryListMutation() {
  return Urql.useMutation<DeleteGroceryListMutation, DeleteGroceryListMutationVariables>(DeleteGroceryListDocument);
};
export const MoveGroceryItemToFridgeDocument = gql`
    mutation MoveGroceryItemToFridge($groceryItemId: Float!, $input: FridgeItemInput!) {
  moveGroceryItemToFridge(groceryItemId: $groceryItemId, input: $input) {
    errors {
      field
      message
    }
    success
  }
}
    `;

export function useMoveGroceryItemToFridgeMutation() {
  return Urql.useMutation<MoveGroceryItemToFridgeMutation, MoveGroceryItemToFridgeMutationVariables>(MoveGroceryItemToFridgeDocument);
};
export const UpdateFridgeItemDocument = gql`
    mutation UpdateFridgeItem($fridgeItemId: Float!, $input: FridgeItemInput!) {
  updateFridgeItem(fridgeItemId: $fridgeItemId, input: $input) {
    errors {
      field
      message
    }
    success
  }
}
    `;

export function useUpdateFridgeItemMutation() {
  return Urql.useMutation<UpdateFridgeItemMutation, UpdateFridgeItemMutationVariables>(UpdateFridgeItemDocument);
};
export const UpdateGroceryItemDocument = gql`
    mutation UpdateGroceryItem($groceryItemId: Float!, $input: GroceryItemInput!) {
  updateGroceryItem(groceryItemId: $groceryItemId, input: $input) {
    errors {
      field
      message
    }
    success
  }
}
    `;

export function useUpdateGroceryItemMutation() {
  return Urql.useMutation<UpdateGroceryItemMutation, UpdateGroceryItemMutationVariables>(UpdateGroceryItemDocument);
};
export const GetAllMeasurementTypesDocument = gql`
    query GetAllMeasurementTypes {
  getAllMeasurementTypes {
    errors {
      message
      field
    }
    measurementTypes {
      id
      measurement
      measurementUnit
    }
  }
}
    `;

export function useGetAllMeasurementTypesQuery(options: Omit<Urql.UseQueryArgs<GetAllMeasurementTypesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllMeasurementTypesQuery>({ query: GetAllMeasurementTypesDocument, ...options });
};
export const GetFridgeFridgeItemsDocument = gql`
    query GetFridgeFridgeItems($fridgeId: Float!) {
  getFridgeFridgeItems(fridgeId: $fridgeId) {
    errors {
      field
      message
    }
    fridgeItems {
      id
      fridgeItemInfoId
      fridgeId
      quantity
      purchasedDate
      expiryDate
      createdAt
      name
      upc
      imgUrl
      userId
      measurementTypeId
      measurement
      measurementUnit
    }
  }
}
    `;

export function useGetFridgeFridgeItemsQuery(options: Omit<Urql.UseQueryArgs<GetFridgeFridgeItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFridgeFridgeItemsQuery>({ query: GetFridgeFridgeItemsDocument, ...options });
};
export const GetFridgeItemByIdDocument = gql`
    query GetFridgeItemById($getFridgeItemByIdId: Float!) {
  getFridgeItemById(id: $getFridgeItemByIdId) {
    errors {
      field
      message
    }
    detailedFridgeItem {
      id
      fridgeItemInfoId
      fridgeId
      quantity
      purchasedDate
      expiryDate
      createdAt
      name
      upc
      imgUrl
      userId
      measurementTypeId
      measurementUnit
      measurement
    }
  }
}
    `;

export function useGetFridgeItemByIdQuery(options: Omit<Urql.UseQueryArgs<GetFridgeItemByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFridgeItemByIdQuery>({ query: GetFridgeItemByIdDocument, ...options });
};
export const GetGroceryItemByIdDocument = gql`
    query GetGroceryItemById($getGroceryItemByIdId: Float!) {
  getGroceryItemById(id: $getGroceryItemByIdId) {
    errors {
      field
      message
    }
    detailedGroceryItem {
      id
      groceryListId
      quantity
      upc
      name
      imgUrl
      measurementTypeId
      createdAt
      userId
      measurementUnit
    }
  }
}
    `;

export function useGetGroceryItemByIdQuery(options: Omit<Urql.UseQueryArgs<GetGroceryItemByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGroceryItemByIdQuery>({ query: GetGroceryItemByIdDocument, ...options });
};
export const GetGroceryListGroceryItemsDocument = gql`
    query GetGroceryListGroceryItems($groceryListId: Float!) {
  getGroceryListGroceryItems(groceryListId: $groceryListId) {
    errors {
      field
      message
    }
    groceryItems {
      id
      groceryListId
      quantity
      userId
      name
      upc
      imgUrl
      createdAt
      measurementTypeId
      measurementUnit
    }
  }
}
    `;

export function useGetGroceryListGroceryItemsQuery(options: Omit<Urql.UseQueryArgs<GetGroceryListGroceryItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGroceryListGroceryItemsQuery>({ query: GetGroceryListGroceryItemsDocument, ...options });
};
export const GetUserFridgesDocument = gql`
    query GetUserFridges($userId: Float!) {
  getUserFridges(userId: $userId) {
    errors {
      field
      message
    }
    fridges {
      id
      name
      ownerId
      createdAt
    }
  }
}
    `;

export function useGetUserFridgesQuery(options: Omit<Urql.UseQueryArgs<GetUserFridgesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserFridgesQuery>({ query: GetUserFridgesDocument, ...options });
};
export const GetUserGroceryListsDocument = gql`
    query GetUserGroceryLists($userId: Float!) {
  getUserGroceryLists(userId: $userId) {
    errors {
      message
      field
    }
    groceryLists {
      createdAt
      ownerId
      name
      id
    }
  }
}
    `;

export function useGetUserGroceryListsQuery(options: Omit<Urql.UseQueryArgs<GetUserGroceryListsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserGroceryListsQuery>({ query: GetUserGroceryListsDocument, ...options });
};
export const GetUserInfoDocument = gql`
    query GetUserInfo($firebaseUserUid: String!) {
  getUserInfo(firebaseUserUID: $firebaseUserUid) {
    errors {
      field
      message
    }
    user {
      id
      firebaseUserUID
      firstName
      lastName
      tier
      email
      imgUrl
      createdAt
    }
  }
}
    `;

export function useGetUserInfoQuery(options: Omit<Urql.UseQueryArgs<GetUserInfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserInfoQuery>({ query: GetUserInfoDocument, ...options });
};