

echo What should the version be?
read VERSION

docker build -t chandrakantpal/lireddit:$VERSION .
docker push chandrakantpal/lireddit:$VERSION

ssh root@143.244.138.80 "docker pull chandrakantpal/lireddit:$VERSION && docker tag chandrakantpal/lireddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"