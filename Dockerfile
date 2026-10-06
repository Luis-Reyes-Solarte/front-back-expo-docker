# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.13.16-alpine3.23

# Este EXPOSE es meramente demostrativos
EXPOSE 8000

# Install pip requirements
COPY requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
COPY . /app

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
