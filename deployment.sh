select appname in gateway auth item
do
	docker buildx build --push --platform=linux/arm64/v8,linux/amd64 --build-arg appname=$appname --tag skuberacrv3c0f46ad7c2.azurecr.io/podtest/$appname-service:latest .
done
