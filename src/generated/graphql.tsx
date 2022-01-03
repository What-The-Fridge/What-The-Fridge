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
  measurementTypeId: Scalars['Float'];
  name: Scalars['String'];
  purchasedDate?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  upc?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
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
  id: Scalars['Float'];
  userId: Scalars['Float'];
};

export type FridgesResponse = {
  __typename?: 'FridgesResponse';
  errors?: Maybe<Array<FieldError>>;
  fridges?: Maybe<Array<Fridge>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFU: FuResponse;
  createFridge: FridgeResponse;
  createFridgeItem: FridgeItemResponse;
  createUser: UserResponse;
  deleteFU: BooleanResponse;
  deleteFridge: BooleanResponse;
  deleteFridgeItem: BooleanResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  transferFridgeOwner: BooleanResponse;
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


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationTransferFridgeOwnerArgs = {
  fridgeId: Scalars['Float'];
  newOwnerId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getFridgeFridgeItems: FridgeItemsResponse;
  getFridgeUsers: UsersResponse;
  getItemInfoNutritionix: FridgeItemInfoNutritionix;
  getUserFridges: FridgesResponse;
};


export type QueryGetFridgeFridgeItemsArgs = {
  fridgeId: Scalars['Float'];
};


export type QueryGetFridgeUsersArgs = {
  fridgeId: Scalars['Float'];
};


export type QueryGetItemInfoNutritionixArgs = {
  upc: Scalars['String'];
};


export type QueryGetUserFridgesArgs = {
  userId: Scalars['Float'];
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

export type CreateFridgeMutationVariables = Exact<{
  ownerId: Scalars['Float'];
  name: Scalars['String'];
}>;


export type CreateFridgeMutation = { __typename?: 'Mutation', createFridge: { __typename?: 'FridgeResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, fridge?: { __typename?: 'Fridge', id: number, ownerId: number, name: string, createdAt: string } | null | undefined } };

export type CreateFridgeItemMutationVariables = Exact<{
  input: FridgeItemInput;
}>;


export type CreateFridgeItemMutation = { __typename?: 'Mutation', createFridgeItem: { __typename?: 'FridgeItemResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, detailedFridgeItem?: { __typename?: 'DetailedFridgeItem', id: number, fridgeItemInfoId: number, fridgeId: number, quantity: number, purchasedDate?: string | null | undefined, expiryDate?: string | null | undefined, createdAt: string, name: string, imgUrl?: string | null | undefined, userId: number, upc?: string | null | undefined, measurementTypeId: number } | null | undefined } };


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
      createdAt
      name
      imgUrl
      userId
      upc
      measurementTypeId
    }
  }
}
    `;

export function useCreateFridgeItemMutation() {
  return Urql.useMutation<CreateFridgeItemMutation, CreateFridgeItemMutationVariables>(CreateFridgeItemDocument);
};