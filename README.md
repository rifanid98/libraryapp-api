# libraryapp-api

## I. Authorization
Untuk mengakses api yang disediakan, harus memiliki akses dengan login terlebih dahulu

**URL API**
> http://localhost:3000/auth/login [POST] <br>
> http://localhost:3000/auth/register [POST] <br>

### 1. Login API
> http://localhost:3000/auth/login [POST]

### Parameter

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
    "statusExecution": "success",
    "statusCode": 200,
    "message": "Ok!",
    "data": [
        {
            "user_id": 10,
            "user_name": "name",
            "user_role": 1,
            "created_at": "2020-06-12T06:27:14.000Z",
            "updated_at": "2020-06-12T06:27:14.000Z",
            "tokenLogin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwidXNlcl9uYW1lIjoibmFtZSIsInVzZXJfcm9sZSI6MSwiY3JlYXRlZF9hdCI6IjIwMjAtMDYtMTJUMDY6Mjc6MTQuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIwLTA2LTEyVDA2OjI3OjE0LjAwMFoiLCJpYXQiOjE1OTIwNTUxNDksImV4cCI6MTU5MjA1NTc0OX0.34dhvU8xZL5i4PfJFL7BKluw-bhJesuxL9tlFotbTb4",
            "tokenRefresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwidXNlcl9uYW1lIjoibmFtZSIsInVzZXJfcm9sZSI6MSwiY3JlYXRlZF9hdCI6IjIwMjAtMDYtMTJUMDY6Mjc6MTQuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIwLTA2LTEyVDA2OjI3OjE0LjAwMFoiLCJpYXQiOjE1OTIwNTUxNDksImV4cCI6MTU5MjY1OTk0OX0.VaP70xaKljKh3lYDZHcssH1fsxCRbqidUtG3pTZOT7Q"
        }
    ]
}
```

### 2. Register API
> http://localhost:3000/auth/register


### Parameter

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
    "statusExecution": "success",
    "statusCode": 201,
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

Note: 
Mendapatkan seluruh buku

### Result
Hasil ketika sukses:
```
{
    "statusExecution": "success",
    "statusCode": 200,
    "message": "Ok!",
    "data": [
        {
            "book_id": 20,
            "book_title": "superman superman",
            "book_description": "the new superhero",
            "book_image": "2020-06-12T15:30:00.393ZIslamic_University_of_Madinah_Logo.png",
            "book_author": "Rifandi",
            "book_status": "0",
            "book_genre_id": 3,
            "book_added": "2020-06-11T06:53:20.000Z",
            "book_updated": "2020-06-12T15:30:00.000Z",
            "book_genre_name": "romance"
        }       
    ]
}
```

### 2. POST Books
> http://localhost:3000/libraryapp-api/books [POST]

Note: 
Menambahkan buku

### Parameter

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

### Result
Hasil ketika sukses:
```
{
    "statusExecution": "success",
    "statusCode": 201,
    "message": "Created!",
    "data": {
        "book_title": "The Power Vim",
        "book_description": "Kekuatan Rahasia dari teks editor VIM",
        "book_author": "anonymous",
        "book_status": "0",
        "book_genre_id": "3",
        "book_image": "http://localhost:3000/libraryapp-api/images/2020-06-13T14:09:47.126Zvim.png"
    }
}
```

### 3. PATCH Books
> http://localhost:3000/libraryapp-api/books/:id [PATCH]

Note: 
- Mengupdate buku
- :id merupakan ID Buku

Contoh : http://localhost:3000/libraryapp-api/books/20

### Parameter

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

### Result
Hasil ketika sukses:
```
{
    "statusExecution": "success",
    "statusCode": 200,
    "message": "Updated!",
    "data": {
        "book_title": "The Power Vim",
        "book_description": "Kekuatan Rahasia dari teks editor VIM WOW",
        "book_author": "anonymous",
        "book_status": "0",
        "book_genre_id": "3",
        "book_image": "http://localhost:3000/libraryapp-api/images/2020-06-13T14:09:47.126Zvim.png"
    }
}
```

### 4. DELETE Books
> http://localhost:3000/libraryapp-api/books/:id [DELETE]

Note: 
- Menghapus buku
- :id merupakan ID Buku

Contoh : http://localhost:3000/libraryapp-api/books/20

### Result
Hasil ketika sukses:
```
{
    "statusExecution": "success",
    "statusCode": 200,
    "message": "Deleted!",
    "data": {
        "book_id": "20"
    }
}
```

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

### Result
Hasil ketika sukses:
```
{
    "statusExecution": "success",
    "statusCode": 200,
    "message": "Ok!",
    "data": [
        {
            "book_genre_id": 3,
            "book_genre_name": "romance"
        }  
    ]
}
```

### 2. POST Book Genre
> http://localhost:3000/libraryapp-api/book_genres [POST]

Note: 
Menambahkan seluruh genre

### Parameter

| Name             | Type     | Required | 
| ---------------- | -------- | -------- | 
| book_genre_name  | string   | true     |

### Result
Hasil ketika sukses:
```
{
    "statusExecution": "success",
    "statusCode": 200,
    "message": "Ok!",
    "data": [
        {
            "book_genre_id": 3,
            "book_genre_name": "romance"
        }  
    ]
}
```

### 3. PATCH Book Genre
> http://localhost:3000/libraryapp-api/book_genres/:id [PATCH]

Note: 
- Mengupdate buku
- :id merupakan ID Buku

Contoh : http://localhost:3000/libraryapp-api/book_genres/3

### Parameter

| Name             | Type     | Required | 
| ---------------- | -------- | -------- | 
| book_genre_name  | string   | true     |

### Body
Mendukung application/json, urlencoded dan form-data format

### Result
Hasil ketika sukses:
```
{
    "statusExecution": "success",
    "statusCode": 200,
    "message": "Ok!",
    "data": {
        "book_genre_name": "romantis"
    }
}
```

### 4. DELETE Book Genre
> http://localhost:3000/libraryapp-api/book_genres/:id [DELETE]

Note: 
- Menghapus buku
- :id merupakan ID Buku

Contoh : http://localhost:3000/libraryapp-api/book_genres/3

### Result
Hasil ketika sukses:
```
{
    "statusExecution": "success",
    "statusCode": 200,
    "message": "Deleted!",
    "data": {
        "book_genre_id": "3"
    }
}
```
