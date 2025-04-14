-- Courses Table
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    preferences JSONB NOT NULL, -- Store preferences as JSON
    content JSONB NOT NULL, -- Main course content in JSON format
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modules Table
CREATE TABLE modules (
    module_id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(course_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content JSONB NOT NULL, -- Module content in JSON format
    module_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Snippets Table
CREATE TABLE snippets (
    snippet_id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES modules(module_id) ON DELETE CASCADE,
    overview TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lessons Table
CREATE TABLE lessons (
    lesson_id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES modules(module_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content JSONB NOT NULL, -- Lesson content in JSON format
    display_order INTEGER, -- Combined order of lessons and activities within a module
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities Table
CREATE TABLE activities (
    activity_id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES modules(module_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- e.g., 'quiz', 'true_false', 'fill_in_blanks', 'reorder'
    content JSONB NOT NULL, -- Activity content in JSON format
    display_order INTEGER, -- Combined order of lessons and activities within a module
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Progress Table (without Users table dependency)
CREATE TABLE user_progress (
    progress_id SERIAL PRIMARY KEY,
    user_external_id VARCHAR(100) NOT NULL, -- External user identifier
    entity_type VARCHAR(20) NOT NULL, -- 'course', 'module', 'lesson', 'activity'
    entity_id INTEGER NOT NULL, -- References the corresponding entity ID
    is_completed BOOLEAN DEFAULT FALSE,
    is_liked BOOLEAN DEFAULT FALSE,
    is_saved BOOLEAN DEFAULT FALSE,
    last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_external_id, entity_type, entity_id)
);

-- Create index to help with lookup of user progress
CREATE INDEX idx_user_progress ON user_progress(user_external_id, entity_type, entity_id);