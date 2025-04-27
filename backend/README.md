## Athena - backend

Official backend repository for Athena.

## Local installation
```bash
python -m venv .venv
```

## Activate venv

```bash
# Run the activate scripts 
# Windows
cd .venv/Scripts
activate

# Mac
source .venv/bin/activate
```

## Deactive venv
```bash
deactivate
```

## Install requirements
```bash
pip install -U "autogen-agentchat" "autogen-ext[openai,azure]" "autogen-ext[web-surfer]" "dotenv" "aiohttp" "pyautogen[tools]"
```

## DATA MODEL
### Preferences
- Level: BEGINNER, INTERMEDIATE, ADVANCED 
- Duration: SHORT, MEDIUM, LONG
- Focus: IN-DEPTH, BROAD

### COURSE
- topic
- Description
- Metadata

### MODULE (1 course n module)
- Title
- Description
- Metadata

### Lesson (1 module n Lesson)
- Title
- Description
- Content (Markdown)

### Activity (1 module n activity)
- Title
- Description
- Type (Quiz)
- JSON (Question, Answer, Options, Correct Answer)

### Snippets
- title
- overview
