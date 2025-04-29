# Athena - frontend

Official frontend repository for Athena.

## User flow

### Landing/Login

- Snippets

### Homepage

- Load user courses (Enrolled)
- List the courses (order by updated_at)
- Search option (Future)

### Generate Course (Python Azure Function API call)

- User selects the course topic
- User selects the following:
  - Level: BEGINNER, INTERMEDIATE, ADVANCED
  - Duration: SHORT, MEDIUM, LONG
  - Focus: IN-DEPTH, BROAD
- Toast: Course generated successfully
- On completion, user is redirected to the course page

### Course Page

- List the modules (order by display_order)
- List the lessons & activities (order by display_order)

## API Contracts

### AUTH API

- Handled by BetterAuth

### COURSE API

#### GET /api/v1/courses

```json
[
  {
    "course_id": "BIGINT",
    "title": "string",
    "description": "string",
    "preferences": {
        "level": "BEGINNER",
        "duration": "SHORT",
        "focus": "IN-DEPTH"
    },
    "metadata": {
        "count": {
        "modules": 3,
        "lessons": 10,
        "activities": 5
        }
    }
  }
]
```

#### GET /api/v1/courses?user_id={user_id}

```json
[
  {
    "course_id": "BIGINT",
    "title": "string",
    "description": "string",
    "preferences": {
    "level": "BEGINNER",
    "duration": "SHORT",
    "focus": "IN-DEPTH"
    },
    "metadata": {
    "count": {
        "modules": 3,
        "lessons": 10,
        "activities": 5
    }
    },
    "isSaved": false
  }
]
```

#### GET /api/v1/courses?course_id={course_id}

- Returns course details with modules, lessons and activities

```json
{
    "course_id": "BIGINT",
    "title": "string",
    "description": "string",
    "preferences": {
        "level": "BEGINNER",
        "duration": "SHORT",
        "focus": "IN-DEPTH"
    },
    "metadata": {
        "count": {
            "modules": 3,
            "lessons": 10,
            "activities": 5
        }
    },
    "modules": [
        {
            "module_id": "BIGINT",
            "title": "string",
            "description": "string",
            "content": [
                {
                    "lesson_id": "BIGINT",
                    "title": "string",
                    "description": "string",
                    "content": {
                        "type": "MARKDOWN",
                        "content": "<markdown>"
                    }
                },
                {
                    "activity_id": "BIGINT",
                    "title": "string",
                    "type": "<quiz>",
                    "content": {
                        "type": "MARKDOWN",
                        "content": "<markdown>"
                    }
                },
                {
                    "lesson_id": "BIGINT",
                    "title": "string",
                    "description": "string",
                    "content": {
                        "type": "MARKDOWN",
                        "content": "<markdown>"
                    }
                },
                ...
            ]
        }
    ]
}
```

### GENERATE COURSE API

#### POST /api/v1/course/generate

- Generate a course id
- Request Body:

```json
{
    "topic": "string",
    "level": "BEGINNER",
    "duration": "SHORT",
    "focus": "BROAD"
}
```

### USER API

#### GET /api/v1/{user_id}/courses

```json
[
    {
        "course_id": "BIGINT",
        "title": "string",
        "description": "string",
        "preferences": {
            "level": "BEGINNER",
            "duration": "SHORT",
            "focus": "BROAD"
        }
    }
]
```

---

### AZURE FUNCTION API

#### POST /api/v1/course/generate

- Request Body:

```json
{
    "course_id": "BIGINT",
    "topic": "string",
    "level": "BEGINNER",
    "duration": "SHORT",
    "focus": "BROAD"
}
```
