# libraryapp-api

## I. Authorization
Untuk mengakses api yang disediakan, harus memiliki akses dengan login terlebih dahulu

**URL API**
> http://localhost:3000/auth/login [POST] <br>
> http://localhost:3000/auth/register [POST] <br>

### 1. Login API
> http://localhost:3000/auth/login [POST]

### Field

| Name          | Type          | Required |
| ------------- | ------------- | -------- |
| user_name     | string        | true     | 
| user_password | string        | true     |

### Body
Mendukung application/json, urlencoded dan form-data format

### Result
Hasil ketika sukses:
```
{
    "status_execution": "success",
    "status_code": 200,
    "message": "Ok!",
    "data": [
        {
            "user_id": 10,
            "user_name": "name",
            "user_role": 1,
            "created_at": "2020-06-12T06:27:14.000Z",
            "updated_at": "2020-06-12T06:27:14.000Z",
            "token_login": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwidXNlcl9uYW1lIjoibmFtZSIsInVzZXJfcm9sZSI6MSwiY3JlYXRlZF9hdCI6IjIwMjAtMDYtMTJUMDY6Mjc6MTQuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIwLTA2LTEyVDA2OjI3OjE0LjAwMFoiLCJpYXQiOjE1OTIwNTUxNDksImV4cCI6MTU5MjA1NTc0OX0.34dhvU8xZL5i4PfJFL7BKluw-bhJesuxL9tlFotbTb4",
            "token_refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwidXNlcl9uYW1lIjoibmFtZSIsInVzZXJfcm9sZSI6MSwiY3JlYXRlZF9hdCI6IjIwMjAtMDYtMTJUMDY6Mjc6MTQuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIwLTA2LTEyVDA2OjI3OjE0LjAwMFoiLCJpYXQiOjE1OTIwNTUxNDksImV4cCI6MTU5MjY1OTk0OX0.VaP70xaKljKh3lYDZHcssH1fsxCRbqidUtG3pTZOT7Q"
        }
    ]
}
```

### 2. Register API
> http://localhost:3000/auth/register


### Field

| Name          | Type          | Required | 
| ------------- | ------------- | -------- | 
| user_name     | string        | true     | 
| user_password | string        | true     |
| user_role     | number        | true     |

### Body
Mendukung application/json, urlencoded dan form-data format

### Result
Hasil ketika sukses:
```
{
    "status_execution": "success",
    "status_code": 201,
    "message": "Created!",
    "data": {
        "user_name": "name",
        "user_role": "1"
    }
}
```

## II. Books
Mengakses buku, detail buku dan pencarian

**URL API**
> http://localhost:3000/libraryapp-api/books [GET]<br>
> http://localhost:3000/libraryapp-api/books [POST]<br>
> http://localhost:3000/libraryapp-api/books/:id [PATCH]<br>
> http://localhost:3000/libraryapp-api/books/:id [DELETE]

### 1. GET Books
> http://localhost:3000/libraryapp-api/books [GET]


### Parameter
> - Search

| Name       | Type                 | Required | 
| ---------- | -------------------- | -------- | 
| desctipion | string               | optional | 
| title      | string               | optional |
| genre      | number [Foreign Key] | optional |
| author     | string               | optional |
| status     | number [0/1]         | optional |

Note: 
- Genre  : Id of genres
- Status : [0/1] [Not Booked/Booked]

Search Example:
- http://localhost:3000/libraryapp-api/books?description=some description&author=John Doe&title=The Love&genre=romance&status=1

> - Sort

| Name   | Type            | Required | 
| ------ | --------------- | -------- | 
| sort   | string [field]  | optional |

Note:
- Sort : [field] sort by [description/title/genre/author/status] 

Sort Example:
- http://localhost:3000/libraryapp-api/books?sort=author

> - Pagination

| Name   | Type   | Required                       | 
| ------ | ------ | ------------------------------ | 
| page   | string | optional                       |
| limit  | string | required if use the page param |

Note:
- Page  : The number of page you want to request
- Limit : Total data per page (required if page param is used)

Pagination Example:
- http://ocalhost:3000/libraryapp-api/books?page=1&limit=4

### 2. POST Books
> http://localhost:3000/libraryapp-api/books [POST]

Note: 
Menambahkan buku

### Field

| Name             | Type                | Required | 
| ---------------- | ------------------- | -------- | 
| book_title       | string              | true     |
| book_description | string              | true     |
| book_image       | file [jpg/jpeg]     | true     |
| book_author      | string              | true     |
| book_status      | number              | true     |
| book_genre_id    | number [foreign key]| true     |

### Body
Mendukung application/json, urlencoded dan form-data format

### 3. PATCH Books
> http://localhost:3000/libraryapp-api/books/:id [PATCH]

Note: 
- Mengupdate buku
- :id merupakan ID Buku

Contoh : http://localhost:3000/libraryapp-api/books/20

### Field

| Name             | Type                | Required | 
| ---------------- | ------------------- | -------- | 
| book_title       | string              | true     |
| book_description | string              | true     |
| book_image       | file [jpg/jpeg]     | true     |
| book_author      | string              | true     |
| book_status      | number              | true     |
| book_genre_id    | number [foreign key]| true     |

### Body
Mendukung application/json, urlencoded dan form-data format

### 4. DELETE Books
> http://localhost:3000/libraryapp-api/books/:id [DELETE]

Note: 
- Menghapus buku
- :id merupakan ID Buku

Contoh : http://localhost:3000/libraryapp-api/books/20

## III. Book Genres
Mengakses genre buku

**URL API**
> http://localhost:3000/libraryapp-api/book_genres [GET]<br>
> http://localhost:3000/libraryapp-api/book_genres [POST]<br>
> http://localhost:3000/libraryapp-api/book_genres/:id [PATCH]<br>
> http://localhost:3000/libraryapp-api/book_genres/:id [DELETE]

### 1. GET Book Genres
> http://localhost:3000/libraryapp-api/book_genres [GET]

Note: 
Mendapatkan seluruh genre

### 2. POST Book Genre
> http://localhost:3000/libraryapp-api/book_genres [POST]

Note: 
Menambahkan seluruh genre

### Field

| Name             | Type     | Required | 
| ---------------- | -------- | -------- | 
| book_genre_name  | string   | true     |

### 3. PATCH Book Genre
> http://localhost:3000/libraryapp-api/book_genres/:id [PATCH]

Note: 
- Mengupdate buku
- :id merupakan ID Buku

Contoh : http://localhost:3000/libraryapp-api/book_genres/3

### Field

| Name             | Type     | Required | 
| ---------------- | -------- | -------- | 
| book_genre_name  | string   | true     |

### Body
Mendukung application/json, urlencoded dan form-data format

### 4. DELETE Book Genre
> http://localhost:3000/libraryapp-api/book_genres/:id [DELETE]

Note: 
- Menghapus buku
- :id merupakan ID Buku

Contoh : http://localhost:3000/libraryapp-api/book_genres/3
