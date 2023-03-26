### Hexlet tests and linter status:
[![Actions Status](https://github.com/Serjio89/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Serjio89/frontend-project-46/actions)
[![Lint and Test](https://github.com/Serjio89/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Serjio89/frontend-project-46/actions/workflows/nodejs.yml)
<a href="https://codeclimate.com/github/Serjio89/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/759b63a91d1345387436/maintainability" /></a>
<a href="https://codeclimate.com/github/Serjio89/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/759b63a91d1345387436/test_coverage" /></a>

# Описание

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

Возможности утилиты:

- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

## Установка

* Скопируйте репозиторий с помощью команды:

```
git clone https://github.com/Serjio89/frontend-project-46.git
```

* Затем введите в командной строке:
```
cd frontend-project-46
make install
```

### Вывод окна помощи
```
gendiff -h
```
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           output usage information
```

## Примеры использования

### :one: Сравнение плоских файлов (JSON)
```
gendiff file1.json file2.json
```
<a href="https://asciinema.org/a/567639" target="_blank"><img src="https://asciinema.org/a/567639.svg" /></a>


### :two: Сравнение плоских файлов (yaml)
```
gendiff file1.yml file2.yml
```
<a href="https://asciinema.org/a/567640" target="_blank"><img src="https://asciinema.org/a/567640.svg" /></a>

### :three: Рекурсивное сравнение с выводом в STYLISH формате
```
gendiff file1.json file2.json
``` 
<a href="https://asciinema.org/a/569468" target="_blank"><img src="https://asciinema.org/a/569468.svg" /></a>

### :four: Рекурсивное сравнение с выводом в PLAIN формате
```
gendiff --format plain file1.json file2.json
```
<a href="https://asciinema.org/a/569819" target="_blank"><img src="https://asciinema.org/a/569819.svg" /></a>

### :five: Рекурсивное сравнение с выводом в JSON формате
```
gendiff --format json file1.json file2.json
```
<a href="https://asciinema.org/a/570083" target="_blank"><img src="https://asciinema.org/a/570083.svg" /></a>