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
pip install -U "autogen-agentchat" "autogen-ext[openai,azure]" "dotenv" "aiohttp"
```
