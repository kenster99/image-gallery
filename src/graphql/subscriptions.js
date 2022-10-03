/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage($owner: String) {
    onCreateImage(owner: $owner) {
      id
      name
      owner
      file {
        bucket
        region
        key
      }
      keywords
      colors
      colorGroups
      collection {
        name
        owner
        id
        createdAt
        updatedAt
      }
      created
      updated
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage($owner: String) {
    onUpdateImage(owner: $owner) {
      id
      name
      owner
      file {
        bucket
        region
        key
      }
      keywords
      colors
      colorGroups
      collection {
        name
        owner
        id
        createdAt
        updatedAt
      }
      created
      updated
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage($owner: String) {
    onDeleteImage(owner: $owner) {
      id
      name
      owner
      file {
        bucket
        region
        key
      }
      keywords
      colors
      colorGroups
      collection {
        name
        owner
        id
        createdAt
        updatedAt
      }
      created
      updated
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection($owner: String) {
    onCreateCollection(owner: $owner) {
      name
      owner
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection($owner: String) {
    onUpdateCollection(owner: $owner) {
      name
      owner
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection($owner: String) {
    onDeleteCollection(owner: $owner) {
      name
      owner
      id
      createdAt
      updatedAt
    }
  }
`;
