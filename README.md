# ContactHub_FullStack

Aplicação web full stack para gerenciamento de usuários e contatos.

# API E-Commerce (Projeto Hackakenzie nov/23)

baseurl: http://localhost:3000

# Rotas

# USERS

### POST /users
Rota responsavel por cadastrar um novo usuário.


Corpo de requisição:

```JSON
{
	"name": "James Webb",
	"email": "james_webb@mail.com",
	"password": "12345678",
	"phone_number": "45999990000",
	"profile_img": "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQqCgFnFmlyzoYIHvuLiRRUK1YwYxhyhdFUFao1Xg1-Y1YZn0ekCTt62Q1uPYJMFUWt"
}
```

<details>
<summary>Segurança</summary>
    <ul>
<li>Não é necessário autorização.</li>
<li>✔ Hash de senha</li>
    </ul>
</details>

<br />

<details>
<summary>Retornos</summary>
<br>
201 - Created:

```JSON
{
	"id": "c43557ee-de60-4070-8430-fe3eaa29be33",
	"name": "James Webb",
	"email": "james_webb@mail.com",
	"phone_number": "45999990000",
	"profile_img": "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQqCgFnFmlyzoYIHvuLiRRUK1YwYxhyhdFUFao1Xg1-Y1YZn0ekCTt62Q1uPYJMFUWt",
	"created_at": "2024-02-04T15:06:01.859Z"
}
```
</details>

<hr />

### GET /users
Rota responsavel por retornar todos os usuários.


Corpo de requisição:
<br>
```JSON
Sem corpo de requisição.
```

<details>
    <summary>Segurança</summary>
    <ul>
        <li>Não é necessário autorização.</li>
    </ul>
</details>

<br />

<details>
<summary>Retornos</summary>
<br>
200 - OK:

```JSON
[
	{
		"id": "c43557ee-de60-4070-8430-fe3eaa29be33",
		"name": "James Webb",
		"email": "james_webb@mail.com",
		"phone_number": "45999990000",
		"profile_img": "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQqCgFnFmlyzoYIHvuLiRRUK1YwYxhyhdFUFao1Xg1-Y1YZn0ekCTt62Q1uPYJMFUWt",
		"created_at": "2024-02-04T15:06:01.859Z"
	},
	{
		"id": "3eed020a-4813-4d5c-b5be-71c513066507",
		"name": "Hubble",
		"email": "hubble@mail.com",
		"phone_number": "45999990001",
		"profile_img": "https://img.olhardigital.com.br/wp-content/uploads/2021/07/Telescopio-Espacial-Hubble-fotografado-a-partir-da-Discovery-em-1997.png",
		"created_at": "2024-02-04T15:09:59.609Z"
	}
]
```
</details>

<hr />

### GET /users/<:id>
Rota responsavel por retornar usuário por id.


Corpo de requisição:
<br>
```JSON
Sem corpo de requisição.
```
Exemplo de rota:

```JSON
http://localhost:3000/3eed020a-4813-4d5c-b5be-71c513066507
```

<details>
    <summary>Segurança</summary>
    <ul>
        <li>Não é necessário autorização.</li>
    </ul>
</details>

<br />

<details>
<summary>Retornos</summary>
<br>
200 - OK:

```JSON
{
	"id": "3eed020a-4813-4d5c-b5be-71c513066507",
	"name": "Hubble",
	"email": "hubble@mail.com",
	"phone_number": "45999990001",
	"profile_img": "https://img.olhardigital.com.br/wp-content/uploads/2021/07/Telescopio-Espacial-Hubble-fotografado-a-partir-da-Discovery-em-1997.png",
	"created_at": "2024-02-04T15:09:59.609Z"
}
```
</details>

<hr />

### PATCH /users/<:id>
Rota responsavel por editar usuário por id.


Corpo de requisição:

```JSON
{
	"email": "james_webb_02@mail.com",
	"phone_number": "45999990001",
}
```

<details>
<summary>Segurança</summary>
    <ul>
<li>Necessário Bearer Token (JWT).</li>
    </ul>
</details>

<br />

<details>
<summary>Retornos</summary>
<br>
201 - Created:

```JSON
{
	"id": "c43557ee-de60-4070-8430-fe3eaa29be33",
	"name": "James Webb",
	"email": "james_webb_02@mail.com",
	"phone_number": "45999990001",
	"profile_img": "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQqCgFnFmlyzoYIHvuLiRRUK1YwYxhyhdFUFao1Xg1-Y1YZn0ekCTt62Q1uPYJMFUWt",
	"created_at": "2024-02-04T15:06:01.859Z"
}
```
</details>

<hr />

### DELETE /users/<:id>
Rota responsavel por deletar usuário por id.


Corpo de requisição:

```JSON
Sem corpo de requisição.
```

Exemplo de rota:

```JSON
http://localhost:3000/3eed020a-4813-4d5c-b5be-71c513066507
```

<details>
<summary>Segurança</summary>
    <ul>
        <li>Necessário Bearer Token (JWT).</li>
    </ul>
</details>

<br />

<details>
<summary>Retornos</summary>
<br>
204 - No content:

```JSON
Sem corpo de retorno.
```
</details>

<hr />