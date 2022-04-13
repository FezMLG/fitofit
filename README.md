# Fitofit Backend

## Training

### Add training

`/api/training (POST)`

Request:

```json
{
  "userId": "forTestingPurposes",
  "date": "2021-12-02",
  "parts": [
    {
      "discipline": "bike",
      "distance": 123,
      "duration": 123
    }
  ]
}
```

Response:

```json
{
  "userId": "forTestingPurposes",
  "date": "2021-12-02",
  "parts": [
    {
      "discipline": "bike",
      "distance": 123,
      "duration": 123,
      "id": "925b2cfb-74a1-4a22-9520-c135b4b05e6d"
    }
  ],
  "id": "0820ab43-543d-4834-a347-b67a317bfaf7",
  "notes": ""
}
```

### Update training

`/api/training (PUT)`

Request:

```json
{
  "userId": "forTestingPurposes",
  "date": "2021-12-02",
  "parts": [
    {
      "discipline": "bike",
      "distance": 123,
      "duration": 123,
      "id": "925b2cfb-74a1-4a22-9520-c135b4b05e6d"
    }
  ],
  "id": "0820ab43-543d-4834-a347-b67a317bfaf7",
  "notes": ""
}
```

Response:

```json
{
  "statusCode": 200,
  "message": "Updated"
}
```

### Get one training

`/api/training/:id (GET)`

Response:

```json
{
  "userId": "forTestingPurposes",
  "date": "2021-12-02",
  "parts": [
    {
      "discipline": "bike",
      "distance": 123,
      "duration": 123,
      "id": "925b2cfb-74a1-4a22-9520-c135b4b05e6d"
    }
  ],
  "id": "0820ab43-543d-4834-a347-b67a317bfaf7",
  "notes": ""
}
```

### Get many trainings

`/api/training/ (GET)`

Response:

```json
[
  {
    "userId": "forTestingPurposes",
    "date": "2021-12-02",
    "parts": [
      {
        "discipline": "bike",
        "distance": 123,
        "duration": 123,
        "id": "925b2cfb-74a1-4a22-9520-c135b4b05e6d"
      }
    ],
    "id": "0820ab43-543d-4834-a347-b67a317bfaf7",
    "notes": ""
  }
  //and more
]
```

### Delete one training

`/api/training/:id (DELETE)`

Response:

```json
{
  "statusCode": 200,
  "message": "Deleted (x) trainings and (x) parts."
}
```

## Response on error

```json
{
  "statusCode": 404, //or any other
  "message": "(Error message)"
}
```
