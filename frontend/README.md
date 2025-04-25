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
    - Depth: SHALLOW, DEEP
- Toast: Course generated successfully
- On completion, user is redirected to the course page

### Course Page
- List the modules (order by display_order)
- List the lessons & activities (order by display_order)


---

# API Contracts

## AUTH API
- Handled by BetterAuth

## COURSE API

### GET /api/v1/courses

```json
[
    {
    "course_id": "UUID",
    "title": "string",
    "description": "string",
    "preferences": {
        "level": "BEGINNER",
        "duration": "SHORT",
        "depth": "SHALLOW"
    }
}
]
```

### GET /api/v1/courses?course_id={course_id}
- Returns course details with modules and lessons
```json
{
    "course_id": "UUID",
    "title": "string",
    "description": "string",
    "preferences": {
        "level": "BEGINNER",
        "duration": "SHORT",
        "depth": "SHALLOW"
    },
    "modules": [
        {
            "module_id": "UUID",
            "title": "string",
            "description": "string",
            "lessons": [
                {
                    "lesson_id": "UUID",
                    "title": "string",
                    "description": "string",
                    "content": "<markdown>"
                }
            ],
            "activities": [
                {
                    "activity_id": "UUID",
                    "title": "string",
                    "description": "<markdown>",
                    "type": "<quiz>",
                    "json_data": {
                        // JSON data for the activity
                    }
                }
            ]
        }
    ]
}
```

### GET /api/v1/courses/is_available?course_id={course_id}
- For long polling - return true if present else false


## GENERATE COURSE API

### POST /api/v1/course/generate
- Generate a course id
- Request Body:
```json
{
    "topic": "string",
    "level": "BEGINNER",
    "duration": "SHORT",
    "depth": "SHALLOW"
}
```

## USER API

### GET /api/v1/user/courses?user_id={user_id}

```json
[
    {
    "course_id": "UUID",
    "title": "string",
    "description": "string",
    "preferences": {
        "level": "BEGINNER",
        "duration": "SHORT",
        "depth": "SHALLOW"
    }
}
]
```
---

## Azure Function API
### POST /api/v1/course/generate
- Request Body:
```json
{
    "course_id": "UUID",
    "topic": "string",
    "level": "BEGINNER",
    "duration": "SHORT",
    "depth": "SHALLOW"
}
```
