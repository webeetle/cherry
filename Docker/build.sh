if [ ${ENV} = "development" ]; then 
    yarn build:development
elif [ ${ENV} = "staging" ]; then
    yarn build:staging
elif [ ${ENV} = "production" ]; then
    yarn build:production
fi