# agenda-de-contatos_api
Api restfull de uma aplicação web que gerencia uma agenda de contatos.

# Observação:
Por segurança, não há rota de criação de administrador. O administrador deve ser criado após a criação do usuário comum, pelo comando sql:
 - UPDATE users SET "isAdmin" = 'true' WHERE id = '<Id do usuário a se administrador>'; 

# Endpoints

| Método  | Endpoint             | Responsabilidade                   |
| ------- | -------------------- | ---------------------------------- |
| POST    | /users               | Cadastra um novo usuário           |
| GET     | /users               | Lista todos os usuários            |
| GET     | /users/:userId       | Obtem os dados do usuário          |
| POST    | /login               | Realiza login do usuário           |
| PATCH   | /users/:userId       | Atualiza dados do usuário          |
| DELETE  | /users/:userId       | Desativa um usuário                |
| POST    | /users/:userId       | Reativa um usuário                 |
| POST    | /contacts            | Cadastra um novo contato           |
| GET     | /contacts            | Lista todos os contatos do usuário |
| DELETE  | /contacts/:contactId | Deleta um contato do usuário       |


## Rota POST/users

Rota que **não** precisa de autenticação. Necessita de campos necessários, como é mostrado abaixo:

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
    "full_name": "Usuário",
	"username": "user",
	"emails": ["user@mail.com", "user2@mail.com"],
	"phones": ["12999001175", "13989001105"],
	"password": "1234"
}
```

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">201 CREATED</b> |

```json
{
    "id": "05b6bedb-f47b-4e2e-8e69-6bfc2249a7cf",
	"username": "user",
	"full_name": "Usuário",
	"registerDate": "29/07/2023",
	"isAdmin": false,
	"isActive": true
}
```

Caso não seja enviado o corpo da requisição, retornará o seguinte **erro**:

    | Resposta do servidor:                                    |
    | -------------------------------------------------------- |
    | Body: Formato Json                                       |
    | Status code: <b style="color:orange">400 BAD REQUEST</b> |

    ```json
    {
        {
	"message": {
		"full_name": [
			"Required"
		],
		"username": [
			"Required"
		],
		"emails": [
			"Required"
		],
		"phones": [
			"Required"
		],
		"password": [
			"Required"
		        ]
	        }
        }
    }
    ```

## Rota GET/users

Rota **autenticada** somente ao **administrador**. **Não** há corpo de requisição.


    | Resposta do servidor:                                    |
    | -------------------------------------------------------- |
    | Body: Formato Json                                       |
    | Status code: <b style="color:green">200 OK</b>           |

    ```json
    [
	{
		"id": "05b6bedb-f47b-4e2e-8e69-6bfc2249a7cf",
		"full_name": "Usuário",
		"username": "user",
		"isAdmin": false,
		"isActive": true,
		"registerDate": "29/07/2023",
		"deletedAt": null,
		"emails": [
			{
				"email": "user@mail.com"
			},
			{
				"email": "user2@mail.com"
			}
		],
		"phones": [
			{
				"phone": "12999001175"
			},
			{
				"phone": "13989001105"
			}
		]
	},
	{
		"id": "934fd849-bff7-453a-9079-3e4a434153f3",
		"full_name": "José Martins",
		"username": "ze",
		"isAdmin": false,
		"isActive": true,
		"registerDate": "2023-07-26",
		"deletedAt": null,
		"emails": [
			{
				"email": "jose@mail.com"
			},
			{
				"email": "jose2@mail.com"
			}
		],
		"phones": [
			{
				"phone": "42999542578"
			},
			{
				"phone": "4999244995"
			}
		]
	}
]
    ```


## Rota GET/users/:userId

Rota **autenticada** pelo usuário comum. **Não** precisa de corpo de requisição.

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">200 OK</b>      |

```json
{
    "id": "05b6bedb-f47b-4e2e-8e69-6bfc2249a7cf",
	"full_name": "Usuário",
	"username": "user",
	"isAdmin": false,
	"isActive": true,
	"registerDate": "2023-07-29",
	"deletedAt": null,
	"emails": [
		{
			"email": "user@mail.com"
		},
		{
			"email": "user2@mail.com"
		}
	],
	"phones": [
		{
			"phone": "12999001175"
		},
		{
			"phone": "13989001105"
		}
	]
}
```

## Rota POST/login

Rota **sem** autenticação. O corpo de requisição deve ser conforme abaixo:

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
	"username": "user",
	"password": "1234"
}
```

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">200 OK</b>      |

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FjdGl2ZSI6dHJ1ZSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY5MDc2NDM2MSwiZXhwIjoxNjkwODUwNzYxLCJzdWIiOiIwNWI2YmVkYi1mNDdiLTRlMmUtOGU2OS02YmZjMjI0OWE3Y2YifQ.S7VD9jmH3JNbVV6JBkXOvjyhlEnPigQ2z2sKbA39HzE",
	"user": {
		"id": "05b6bedb-f47b-4e2e-8e69-6bfc2249a7cf",
		"full_name": "Usuário",
		"username": "user",
		"isAdmin": false,
		"isActive": true,
		"registerDate": "2023-07-29"
	}
}
```

## Rota PATCH/users/:userId

Rota **autenticada** com o token do usuário que será modificado, ou com o token do administrador. Recebe corpo de requisição conforme abaixo, podendo reduzir os parâmetros a serem atualizados à conta do usuário.

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
	"full_name": "Usuário atualizado",
	"username": "userUp",
	"emails": ["userupdated@mail.com"],
	"phones": ["44999994488"],
	"password": "1111"
}
```

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">200 OK</b>      |

```json
{
	"id": "05b6bedb-f47b-4e2e-8e69-6bfc2249a7cf",
	"full_name": "Usuário atualizado",
	"username": "userUp",
	"isAdmin": false,
	"isActive": true,
	"registerDate": "2023-07-29",
	"deletedAt": null,
	"emails": [
		{
			"email": "userupdated@mail.com"
		}
	],
	"phones": [
		{
			"phone": "44999994488"
		}
	]
}
```

## Rota DELETE/users/:userId

Rota **autenticada** com o token do usuário a ser desativado, ou com o token do administrador. **Não** recebe corpo de requisição.

| Resposta do servidor:                                  |
| ------------------------------------------------------ |
| Body: Sem body de resposta                             |
| Status code: <b style="color:green">204 NO CONTENT</b> |


## Rota POST/users/:userId

Rota **autenticada** com somente o token do administrador. **Não** recebe corpo de requisição.

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">200 OK</b>      |

```json
{
	"id": "05b6bedb-f47b-4e2e-8e69-6bfc2249a7cf",
	"full_name": "Usuário atualizado",
	"username": "userUp",
	"isAdmin": false,
	"isActive": true,
	"registerDate": "2023-07-29",
	"deletedAt": null,
	"emails": [
		{
			"email": "userupdated@mail.com"
		}
	],
	"phones": [
		{
			"phone": "44999994488"
		}
	]
}
```

## Rota POST/contacts

Rota **autenticada** com o token do usuário que irá cadastrar um contato para si. O corpo de requisição deve ser conforme abaixo:

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
	"full_name": "User contact",
	"phones": ["46999999999","47999999999"],
	"emails": ["usercontact@mail.com", "usercontact1@mail.com"]
}
```

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">201 CREATED</b> |

```json
{
	"id": "e36ce658-8184-4aad-a63b-28045114c1aa",
	"full_name": "User contact",
	"registerDate": "29/07/2023"
}
```

## Rota GET/contacts

Rota **autenticada** com o token do usuário, que listará os seus contatos. **Não** recebe corpo de requisição.

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">201 CREATED</b> |

```json
{
[
	{
		"id": "acf88147-38af-4031-91b9-1af5ffe1a17a",
		"full_name": "User contact",
		"registerDate": "2023-07-29",
		"phones": [
			{
				"id": 4,
				"phone": "46999999999"
			},
			{
				"id": 3,
				"phone": "47999999999"
			}
		],
		"emails": [
			{
				"id": 3,
				"email": "usercontact@mail.com"
			},
			{
				"id": 4,
				"email": "usercontact1@mail.com"
			}
		]
	}
]
}
```

## Rota DELETE/contacts/:contactId

Rota **autenticada** com o token do usuário que irá deletar seu contato. **Não** recebe corpo de requisição.

| Resposta do servidor:                                  |
| ------------------------------------------------------ |
| Body: Sem corpo de resposta                            |
| Status code: <b style="color:green">204 NO CONTENT</b> |

