# event-express
# Category Service API

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Endpoints](#endpoints)
  - [Get All Categories](#get-all-categories)
  - [Get Category By ID](#get-category-by-id)
  - [Get Category Subtree By ID](#get-category-children-by-id)
  - [Create New Category](#create-new-category)
  - [Update Category](#update-category)
  - [Move Subtree](#move-children)
  - [Delete Category](#delete-category)
- [Error Responses](#error-responses)

## Introduction

This API provides CRUD operations for managing categories in the application. It supports the following operations:

- Fetching all categories
- Fetching a category by its ID
- Creating a new category
- Updating an existing category
- Deleting a category

---

## Installation

To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/official-tisao/event-express.git
   cd event-express
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install -g yarn
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn run dev
   ```

4. Run the unit tests:
   ```bash
   yarn run test
   ```
5. Run and the unit tests coverage:
   ```bash
   yarn run test:coverage
   ```

---

## Endpoints

### Get All Categories

### Get All Categories

Retrieves a list of all categories.

- **URL:** `/`
- **Method:** `GET`
- **URL Params:** None
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    [
      {
        "id": 1,
        "name": "Category 1",
        "parentID": null
      },
      {
        "id": 2,
        "name": "Category 2",
        "parentID": 1
      }
    ]
    ```

### Get Category By ID

Retrieves a specific category by its ID.

- **URL:** `/category/:id`
- **Method:** `GET`
- **URL Params:** 
  - `id=[integer]` (required)
- **Data Params:** None
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    {
      "id": 1,
      "name": "Category 1",
      "parentID": null
    }
    ```
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "Category not found" }`

### Get Category Subtree By ID

Retrieves a category and all its subcategories recursively.

- **URL:** `/category/:id/children`
- **Method:** `GET`
- **URL Params:**
  - `id=[integer]` (required)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": 1,
      "name": "Root Category",
      "parentID": null,
      "children": [
        {
          "id": 2,
          "name": "Subcategory 1",
          "parentID": 1,
          "children":[]
        },
        {
          "id": 3,
          "name": "Subcategory 2",
          "parentID": 1,
          "children": [
            {
              "id": 4,
              "name": "Sub-subcategory",
              "parentID": 3,
              "children": []
            }
          ]
        }
      ]
    }
    ```
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "Category not found" }`


### Create New Category

Creates a new category.

- **URL:** `/category`
- **Method:** `POST`
- **Data Params:** 
  ```json
  {
    "name": "New Category",
    "parentID": 1  // Optional
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** 
    ```json
    {
      "id": 3,
      "name": "New Category",
      "parentID": 1
    }
    ```
  ```
- **Category Exists Response:**
  - **Code:** 400
  - **Content:** 
    ```json
    {
    "error": "Category already exists"
    }
    ```
- **Parent Category Not Found Response:**
  - **Code:** 404
  - **Content:** 
    ```json
    {
    "error": "Parent Category not found"
    }
    ```
- **Bad Category Name Response:**
  - **Code:** 400
  - **Content:** 
    ```json
    {
    "error": "Name cannot be null/empty"
    }
    ```

### Update Category

Updates an existing category.

- **URL:** `/category/:id/update`
- **Method:** `PUT`
- **URL Params:**
  - `id=[integer]` (required)
- **Data Params:**
  ```json
  {
    "name": "Updated Category Name",
    "parentID": 2  // Optional
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": 1,
      "name": "Updated Category Name",
      "parentID": 2
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
  - **Content:** `{ "error": "Category or new parentID not found" }`

### Move Subtree

Moves a specific category to a new parent.

- **URL:** `/category/:id/move/:newParentId`
- **Method:** `PUT`
- **URL Params:**
  - `id=[integer]` (required)
  - `newParentId=[integer]` (required)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": 1,
      "name": "Updated Category Name",
      "parentID": 2
    }
    ```
- **Error Response:**
  - **Code:** 400 NOT FOUND
  - **Content:** `{ "error": "Category or parentID not found" }`

### Delete Category

Deletes a specific category.

- **URL:** `/category/:id`
- **Method:** `DELETE`
- **URL Params:**
  - `id=[integer]` (required)
- **Success Response:**
  - **Code:** 204
  - **Content:** 
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "Category not found" }`

