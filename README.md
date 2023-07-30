# agenda-de-contatos_api
Api restfull de uma aplicação web que gerencia uma agenda de contatos.

# Observação:
Por segurança, não há rota de criação de administrador. O administrador deve ser criado após a criação do usuário comum, pelo comando sql:
 - UPDATE users SET "isAdmin" = 'true' WHERE id = '<Id do usuário a se administrador>'; 

# Endpoints

| Método | Endpoint       | Responsabilidade                  |
| ------ | -------------- | --------------------------------- |
| POST   | /users         | Cadastra um novo usuário          |
| GET    | /users         | Lista todos os usuários           |
| GET    | /users/:userId | Obtem os dados do usuário         |

| PATCH  | /movies/:id | Atualiza o filme passado por id   |
| DELETE | /movies/:id | Deleta o filme passado por id     |


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
| Status code: <b style="color:green">200 OK</b> |

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



Criar contato com a conta User
{
	"full_name": "User contact",
	"phones": ["46999999999","47999999999"],
	"emails": ["usercontact@mail.com", "usercontact1@mail.com"]
}
Resposta
{
	"id": "e36ce658-8184-4aad-a63b-28045114c1aa",
	"full_name": "User contact",
	"registerDate": "29/07/2023"
}

Tomar todos os contatos


