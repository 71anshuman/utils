deploy:
	rm -rf node_modules/.cache/gh-pages
	npm run build
	npm run deploy
	