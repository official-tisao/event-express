# event-express
# Category Service API

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Endpoints](#endpoints)
  - [Get All Categories](#get-all-categories)
  - [Get Category By ID](#get-category-by-id)
  - [Create New Category](#create-new-category)
  - [Update Category](#update-category)
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

4. Start the development server:
   ```bash
   yarn test
   ```

---

## Endpoints

### Get All Categories

### Get All Categories

Retrieves a list of all categories.

- **URL:** `/categories`
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
        "parentId": null
      },
      {
        "id": 2,
        "name": "Category 2",
        "parentId": 1
      }
    ]
    ```

### Get Category By ID

Retrieves a specific category by its ID.

- **URL:** `/categories/:id`
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
      "parentId": null
    }
    ```
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "Category not found" }`

### Create New Category

Creates a new category.

- **URL:** `/categories`
- **Method:** `POST`
- **Data Params:** 
  ```json
  {
    "name": "New Category",
    "parentId": 1  // Optional
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** 
    ```json
    {
      "id": 3,
      "name": "New Category",
      "parentId": 1
    }
    ```

### Update Category

Updates an existing category.

- **URL:** `/categories/:id`
- **Method:** `PUT`
- **URL Params:**
  - `id=[integer]` (required)
- **Data Params:**
  ```json
  {
    "name": "Updated Category Name",
    "parentId": 2  // Optional
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": 1,
      "name": "Updated Category Name",
      "parentId": 2
    }
    ```
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "Category not found" }`

### Delete Category

Deletes a specific category.

- **URL:** `/categories/:id`
- **Method:** `DELETE`
- **URL Params:**
  - `id=[integer]` (required)
- **Success Response:**
  - **Code:** 204
  - **Content:** No Content
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "Category not found" }`

