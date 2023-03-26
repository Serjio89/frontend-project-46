install:
	npm ci
gendiff:
	gendiff -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
fix:
	npx eslint . --fix
test:
	npx jest
test-coverage:
	npx jest --coverage
